package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long> {

}

