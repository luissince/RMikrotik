package com.okta.mongodb.GeneradoScripts.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.repository.PlanRepository;

@Service
public class PlanService {

        @Autowired
        private PlanRepository planRepository;

        public List<Plan> listAll() {
                List<Plan> plans = planRepository.findAll();
                return plans;
        }

}