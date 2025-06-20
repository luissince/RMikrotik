package com.okta.mongodb.GeneradoScripts.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.model.subscription.Card;
import com.okta.mongodb.GeneradoScripts.model.subscription.Transaction;
import com.okta.mongodb.GeneradoScripts.model.subscription.PaymentBody;
import com.okta.mongodb.GeneradoScripts.model.subscription.Subscription;
import com.okta.mongodb.GeneradoScripts.model.user.User;
import com.okta.mongodb.GeneradoScripts.repository.TransactionRepository;
import com.okta.mongodb.GeneradoScripts.repository.PlanRepository;
import com.okta.mongodb.GeneradoScripts.repository.SubscriptionRepository;
import com.okta.mongodb.GeneradoScripts.repository.UserRepository;

@Service
public class SubcriptionService {

    private static final Logger logger = LoggerFactory.getLogger(SubcriptionService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Value("${paypal.url}")
    private String paypalUrl;

    @Value("${paypal.client.id}")
    private String paypalClientId;

    @Value("${paypal.client.secret}")
    private String paypalClientSecret;

    @Value("${culqi.url.token}")
    private String culqiUrlToken;

    @Value("${culqi.url.charges}")
    private String culqiUrlCharges;

    @Value("${culqi.public.key}")
    private String culqiPublicKey;

    @Value("${culqi.private.key}")
    private String culqiPrivateKey;

    @Value("${url.front.end}")
    private String urlFrontEnd;

    public ResponseEntity<?> create(PaymentBody body) {
        try {
            logger.info("Body recibido: {}", body);

            if (body.getProviderId() == null || body.getPlanId() == null || body.getMethod() == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Faltan datos requeridos"));
            }

            User user = userRepository.findByProviderId(body.getProviderId()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Usuario no encontrado"));
            }

            LocalDate today = LocalDate.now();

            // Buscar suscripción activa (status = "active" y endDate >= hoy)
            Subscription activeSub = subscriptionRepository
                    .findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user,
                            "active", today);

            if (activeSub != null) {
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Ya tienes una suscripción activa"));
            }

            // Buscar la última suscripción (independientemente del status)
            Subscription lastSub = subscriptionRepository.findTopByUserOrderByEndDateDesc(user);

            if (lastSub != null && lastSub.getEndDate().isBefore(today) &&
                    "active".equalsIgnoreCase(lastSub.getStatus())) {
                // Marcar la última suscripción vencida como expired
                lastSub.setStatus("expired");
                subscriptionRepository.save(lastSub);
            }

            Plan plan = planRepository.findById(body.getPlanId()).orElse(null);
            if (plan == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Plan no encontrado"));
            }

            if (body.getMethod().equals("card")) {
                Card card = body.getCard();

                String expiry[] = card.getExpiry().split("/");

                Map<String, Object> cardData = Map.of(
                        "card_number", card.getNumber(),
                        "cvv", card.getCvv(),
                        "expiration_month", expiry[0],
                        "expiration_year", expiry[1],
                        "email", user.getEmail());

                String token = generateTokenCulqi(cardData);

                int amount = (int) (plan.getPrice() * 100);

                Map pay = createPayCulqi(token, user.getEmail(), amount,
                        "Pago suscripción plan: " + plan.getName());

                String id = pay.get("id").toString();

                Transaction transaction = new Transaction();
                transaction.setProviderId(body.getProviderId());
                transaction.setPlanId(body.getPlanId());
                transaction.setOrderId(id);
                transaction.setStatus("completed");
                transaction.setRequestBody(new ObjectMapper().writeValueAsString(pay));
                transactionRepository.save(transaction);

                // Crear nueva suscripción
                Subscription newSub = new Subscription();
                newSub.setUser(user);
                newSub.setPlan(plan);
                newSub.setPrice(plan.getPrice());
                newSub.setMethod(body.getMethod());
                newSub.setStartDate(today);
                newSub.setEndDate(today.plusDays(plan.getDurationInDays()));
                newSub.setStatus("active");

                subscriptionRepository.save(newSub);

                return ResponseEntity.ok(Map.of(
                        "message", "Suscripción registrada exitosamente"));

            }

            if (body.getMethod().equals("paypal")) {
                String token = generateTokenPayPal();

                Map order = createOrderPayPal(token, Double.toString(plan.getPrice()), "USD",
                        urlFrontEnd + "/capture-order",
                        urlFrontEnd + "/pricing");

                String id = (String) order.get("id");
                String approveUrl = null;

                List<Map<String, Object>> links = (List<Map<String, Object>>) order.get("links");
                for (Map<String, Object> link : links) {
                    if ("approve".equals(link.get("rel"))) {
                        approveUrl = (String) link.get("href");
                        break;
                    }
                }

                if (approveUrl == null) {
                    return ResponseEntity.badRequest().body(
                            Map.of("message", "No se pudo obtener el link de aprobación"));
                }

                Transaction transaction = new Transaction();
                transaction.setProviderId(body.getProviderId());
                transaction.setPlanId(body.getPlanId());
                transaction.setOrderId(id);
                transaction.setStatus("pending");
                transactionRepository.save(transaction);

                return ResponseEntity.ok(Map.of(
                        "message", "Pago generado correctamente, trasladando a completar proceso...",
                        "approveUrl", approveUrl));
            }

            return ResponseEntity.badRequest().body(Map.of(
                    "message", "No se ha seleccionado un método de pago"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", ex.getMessage()));
        }
    }

    public ResponseEntity<?> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        List<Map<String, Object>> responseList = subscriptions.stream().map(sub -> {

            Map<String, Object> plan = Map.of(
                    "id", sub.getPlan().getId(),
                    "name", sub.getPlan().getName());

            Map<String, Object> user = Map.of(
                    "name", sub.getUser().getName(),
                    "email", sub.getUser().getEmail(),
                    "image", sub.getUser().getImage());

            Map<String, Object> response = Map.of(
                    "id", sub.getId(),
                    "plan", plan,
                    "price", sub.getPrice(),
                    "method", sub.getMethod(),
                    "startDate", sub.getStartDate(),
                    "endDate", sub.getEndDate(),
                    "status", sub.getStatus(),
                    "user", user);

            return response;
        }).toList();

        return ResponseEntity.ok(responseList);
    }

    public ResponseEntity<?> getSubscription(String providerId) {
        // Validar que el providerId sea válido
        if (providerId == null || providerId.isEmpty()) {
            return ResponseEntity.badRequest().body("Falta providerId");
        }

        // obtener el usuario y verificar si existe
        User user = userRepository.findByProviderId(providerId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        // Obtener la fecha actual
        LocalDate today = LocalDate.now();

        // Obtener la suscripción activa y validar que exista
        Subscription subscription = subscriptionRepository
                .findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user, "active", today);
        if (subscription == null) {
            return ResponseEntity.status(400).body("No hay suscripción activa");
        }

        // Devolver la información de la suscripción
        return ResponseEntity.ok(Map.of(
                "subscription", subscription,
                "user", user
        ));
    }

    private String generateTokenCulqi(Map<String, Object> cardData) throws Exception {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(culqiPublicKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(cardData, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(culqiUrlToken, request, Map.class);

            return (String) response.getBody().get("id");

        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> responseBody = mapper.readValue(ex.getResponseBodyAsString(),
                    new TypeReference<Map<String, Object>>() {
                    });

            String merchantMessage = responseBody.get("merchant_message").toString();
            String errorMessage = merchantMessage == null ? "Error al generar token en Culqi" : merchantMessage;
            throw new RuntimeException(errorMessage);
        } catch (RestClientException ex) {
            throw new RuntimeException("Error al llamar al servicio externo");
        }
    }

    private Map createPayCulqi(String token, String email, int amount, String description)
            throws Exception {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(culqiPrivateKey);

            Map<String, Object> body = Map.of(
                    "amount", amount,
                    "currency_code", "USD",
                    "email", email,
                    "source_id", token,
                    "description", description);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(culqiUrlCharges, request, Map.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> responseBody = mapper.readValue(ex.getResponseBodyAsString(),
                    new TypeReference<Map<String, Object>>() {
                    });

            String merchantMessage = responseBody.get("merchant_message").toString();
            String errorMessage = merchantMessage == null ? "Error al generar cargo en Culqi" : merchantMessage;
            throw new RuntimeException(errorMessage);
        } catch (RestClientException ex) {
            throw new RuntimeException("Error al llamar al servicio externo");
        }
    }

    public String generateTokenPayPal() {
        String credentials = paypalClientId + ":" + paypalClientSecret;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedCredentials);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> request = new HttpEntity<>("grant_type=client_credentials", headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                paypalUrl + "/v1/oauth2/token",
                HttpMethod.POST,
                request,
                Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("access_token");
        }

        throw new RuntimeException("No se pudo obtener el token de acceso PayPal");
    }

    public Map createOrderPayPal(String token, String amount, String currency, String returnUrl, String cancelUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> order = Map.of(
                "intent", "CAPTURE",
                "purchase_units", List.of(Map.of(
                        "amount", Map.of(
                                "currency_code", currency,
                                "value", amount))),
                "application_context", Map.of(
                        "brand_name", "Example",
                        "landing_page", "LOGIN",
                        "user_action", "PAY_NOW",
                        "return_url", returnUrl,
                        "cancel_url", cancelUrl));

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(order, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                paypalUrl + "/v2/checkout/orders",
                request,
                Map.class);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            return response.getBody();
        }

        throw new RuntimeException("No se pudo crear la orden en PayPal");
    }

    public ResponseEntity<?> captureOrden(String id) {
        try {
            Transaction transaction = transactionRepository.findByOrderId(id);
            if (transaction == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Transacción no encontrada"));
            }

            String token = generateTokenPayPal();

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("authorization", "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>("{}", headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    paypalUrl + "/v2/checkout/orders/" + id + "/capture",
                    request,
                    Map.class);

            if (response.getStatusCode() == HttpStatus.CREATED) {

                User user = userRepository.findByProviderId(transaction.getProviderId()).orElse(null);
                if (user == null) {
                    return ResponseEntity.badRequest().body(Map.of("message", "Usuario no encontrado"));
                }

                Plan plan = planRepository.findById(transaction.getPlanId()).orElse(null);
                if (plan == null) {
                    return ResponseEntity.badRequest().body(Map.of("message", "Plan no encontrado"));
                }

                LocalDate today = LocalDate.now();

                Subscription newSub = new Subscription();
                newSub.setUser(user);
                newSub.setPlan(plan);
                newSub.setPrice(plan.getPrice());
                newSub.setMethod("paypal");
                newSub.setStartDate(today);
                newSub.setEndDate(today.plusDays(plan.getDurationInDays()));
                newSub.setStatus("active");

                subscriptionRepository.save(newSub);

                // Actualizar el estado de la transacción
                transaction.setStatus("completed");
                transaction.setRequestBody(new ObjectMapper().writeValueAsString(response.getBody()));
                transactionRepository.save(transaction);

                return ResponseEntity.ok(Map.of(
                        "mesage", "Suscripción registrada exitosamente",
                        "body", response.getBody()));
            }

            return ResponseEntity.badRequest().body(Map.of(
                    "mesage", "Error al capturar la orden"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error al procesar pago");
        }
    }

}
