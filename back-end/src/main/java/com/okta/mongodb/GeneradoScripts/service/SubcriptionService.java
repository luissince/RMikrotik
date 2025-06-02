package com.okta.mongodb.GeneradoScripts.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.model.subscription.PaymentBody;
import com.okta.mongodb.GeneradoScripts.model.subscription.Subscription;
import com.okta.mongodb.GeneradoScripts.model.user.User;
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

    public ResponseEntity<?> create(PaymentBody body) {
        logger.info("Body recibido: {}", body);

        if (body.getProviderId() == null || body.getPlanId() == null || body.getMethod() == null) {
            return ResponseEntity.badRequest().body("Faltan datos requeridos");
        }

        User user = userRepository.findByProviderId(body.getProviderId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        LocalDate today = LocalDate.now();

        // Buscar suscripción activa (status = "active" y endDate >= hoy)
        Subscription activeSub = subscriptionRepository
                .findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user, "active", today);

        if (activeSub != null) {
            return ResponseEntity.badRequest().body("Ya tienes una suscripción activa");
        }

        // Buscar la última suscripción (independientemente del status)
        Subscription lastSub = subscriptionRepository.findTopByUserOrderByEndDateDesc(user);

        if (lastSub != null && lastSub.getEndDate().isBefore(today) && "active".equalsIgnoreCase(lastSub.getStatus())) {
            // Marcar la última suscripción vencida como expired
            lastSub.setStatus("expired");
            subscriptionRepository.save(lastSub);
        }

        Plan plan = planRepository.findById(body.getPlanId()).orElse(null);
        if (plan == null) {
            return ResponseEntity.status(404).body("Plan no encontrado");
        }

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

        return ResponseEntity.ok(Map.of("message", "Suscripción registrada exitosamente"));
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

    public ResponseEntity<?> getActiveSubscription(String providerId) {
        if (providerId == null || providerId.isEmpty()) {
            return ResponseEntity.badRequest().body("Falta providerId");
        }

        User user = userRepository.findByProviderId(providerId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        LocalDate today = LocalDate.now();

        // Obtener solo la suscripción activa actual
        Subscription subscription = subscriptionRepository
                .findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user, "active", today);

        if (subscription == null) {
            return ResponseEntity.status(400).body("No hay suscripción activa");
        }

        return ResponseEntity.ok(Map.of(
                "planId", subscription.getPlan().getId(),
                "status", subscription.getStatus(),
                "startDate", subscription.getStartDate(),
                "endDate", subscription.getEndDate(),
                "price", subscription.getPrice(),
                "method", subscription.getMethod()));
    }
}
