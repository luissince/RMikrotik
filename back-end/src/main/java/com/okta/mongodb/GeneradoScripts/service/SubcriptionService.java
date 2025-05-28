package com.okta.mongodb.GeneradoScripts.service;

import java.time.LocalDate;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.subscription.PaymentBody;
import com.okta.mongodb.GeneradoScripts.model.subscription.Subscription;
import com.okta.mongodb.GeneradoScripts.model.user.User;
import com.okta.mongodb.GeneradoScripts.repository.SubscriptionRepository;
import com.okta.mongodb.GeneradoScripts.repository.UserRepository;

@Service
public class SubcriptionService {

    private static final Logger logger = LoggerFactory.getLogger(SubcriptionService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    private final Map<String, Integer> PLAN_DURATIONS = Map.of(
            "monthly", 30,
            "biweekly", 15,
            "daily", 1,
            "free", 1);

    private final Map<String, Double> PLAN_PRICES = Map.of(
            "monthly", 29.99,
            "biweekly", 19.99,
            "daily", 4.99,
            "free", 0.0);

    public ResponseEntity<?> create(PaymentBody body) {
        logger.info("Body recibido: {}", body);

        if (body.getProviderId() == null || body.getPlanId() == null || body.getMethod() == null) {
            return ResponseEntity.badRequest().body("Faltan datos requeridos");
        }

        User user = userRepository.findByProviderId(body.getProviderId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Double expectedPrice = PLAN_PRICES.get(body.getPlanId());
        Integer duration = PLAN_DURATIONS.get(body.getPlanId());

        if (expectedPrice == null || duration == null || !expectedPrice.equals(body.getPrice())) {
            return ResponseEntity.badRequest().body("Plan inválido o precio incorrecto");
        }

        LocalDate today = LocalDate.now();

        // Buscar suscripción activa (status = "active" y endDate >= hoy)
        Subscription activeSub = subscriptionRepository.findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user, "active", today);

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

        // Crear nueva suscripción
        Subscription newSub = new Subscription();
        newSub.setUser(user);
        newSub.setPlanId(body.getPlanId());
        newSub.setPrice(body.getPrice());
        newSub.setMethod(body.getMethod());
        newSub.setStartDate(today);
        newSub.setEndDate(today.plusDays(duration));
        newSub.setStatus("active");

        subscriptionRepository.save(newSub);

        return ResponseEntity.ok(Map.of("message", "Suscripción registrada exitosamente"));
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
        Subscription subscription = subscriptionRepository.findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(user, "active", today);

        if (subscription == null) {
            return ResponseEntity.status(400).body("No hay suscripción activa");
        }

        return ResponseEntity.ok(Map.of(
                "planId", subscription.getPlanId(),
                "status", subscription.getStatus(),
                "startDate", subscription.getStartDate(),
                "endDate", subscription.getEndDate(),
                "price", subscription.getPrice(),
                "method", subscription.getMethod()));
    }
}

