package com.okta.mongodb.GeneradoScripts.model.subscription;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.model.user.User;

@Entity
@Data
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;
    private Double price;
    private String method;

    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transaccion_id")
    private Transaction transaction;
}
