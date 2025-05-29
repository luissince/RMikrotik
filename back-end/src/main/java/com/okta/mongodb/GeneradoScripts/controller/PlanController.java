package com.okta.mongodb.GeneradoScripts.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.service.PlanService;

@RestController
@RequestMapping("/plan")
public class PlanController {

    @Autowired
    private PlanService planService;

    @GetMapping()
    public List<Plan> listAll() {
        return planService.listAll();
    }

}
