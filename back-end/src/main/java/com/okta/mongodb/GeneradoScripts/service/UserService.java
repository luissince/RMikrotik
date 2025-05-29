package com.okta.mongodb.GeneradoScripts.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.subscription.Subscription;
import com.okta.mongodb.GeneradoScripts.model.user.User;
import com.okta.mongodb.GeneradoScripts.model.user.UserBody;
import com.okta.mongodb.GeneradoScripts.repository.SubscriptionRepository;
import com.okta.mongodb.GeneradoScripts.repository.UserRepository;

@Service
public class UserService {

        private static final Logger logger = LoggerFactory.getLogger(UserService.class);

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private SubscriptionRepository subscriptionRepository;

        public Map<String, Object> create(UserBody body) {
                logger.info("Body recibido: {}", body);

                User user = userRepository.findByProviderId(body.getProviderId())
                                .orElseGet(() -> {
                                        User newUser = new User();
                                        newUser.setProviderId(body.getProviderId());
                                        newUser.setName(body.getName());
                                        newUser.setEmail(body.getEmail());
                                        newUser.setImage(body.getImage());
                                        return userRepository.save(newUser);
                                });

                // Obtener la última suscripción
                Subscription subscription = subscriptionRepository.findTopByUserOrderByEndDateDesc(user);

                Map<String, Object> response = new java.util.HashMap<>();
                response.put("user", user);

                if (subscription != null) {
                        Map<String, Object> subData = new java.util.HashMap<>();
                        subData.put("planId", subscription.getPlan().getId());
                        subData.put("startDate", subscription.getStartDate());
                        subData.put("endDate", subscription.getEndDate());
                        subData.put("status", subscription.getStatus());
                        subData.put("price", subscription.getPrice());
                        subData.put("method", subscription.getMethod());
                        response.put("subscription", subData);
                } else {
                        response.put("subscription", null);
                }

                return response;
        }

}
