
package com.okta.mongodb.GeneradoScripts.repository;

import com.okta.mongodb.GeneradoScripts.model.subscription.Subscription;
import com.okta.mongodb.GeneradoScripts.model.user.User;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Subscription findTopByUserAndStatusAndEndDateGreaterThanEqualOrderByEndDateDesc(User user, String status,
            LocalDate date);

    Subscription findTopByUserOrderByEndDateDesc(User user);

}
