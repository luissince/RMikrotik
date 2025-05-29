package com.okta.mongodb.GeneradoScripts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.plan.PlanCharacteristic;

public interface PlanCharacteristicRepository extends JpaRepository<PlanCharacteristic, Long> {

    List<PlanCharacteristic> findAllByPlanId(Long planId);

}

