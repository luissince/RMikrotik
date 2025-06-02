package com.okta.mongodb.GeneradoScripts.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.okta.mongodb.GeneradoScripts.model.plan.Plan;
import com.okta.mongodb.GeneradoScripts.model.plan.PlanCharacteristic;
import com.okta.mongodb.GeneradoScripts.repository.PlanRepository;

@Component
@Profile("development")
public class PlanDataLoader implements CommandLineRunner {

    private final PlanRepository planRepository;

    public PlanDataLoader(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public void run(String... args) {
        if (planRepository.count() == 0) {
            Plan monthly = new Plan(null, "monthly", "Acceso mensual completo", 30, 29.99, true, LocalDate.now(), null);
            Plan biweekly = new Plan(null, "biweekly", "Acceso por 15 días", 15, 19.99, true, LocalDate.now(),null);
            Plan daily = new Plan(null, "daily", "Acceso por un día completo", 1, 4.99, true, LocalDate.now(),null);
            Plan free = new Plan(null, "free", "Plan básico gratuito", 1, 0.0, true, LocalDate.now(),null); 

            monthly.setCharacteristics(List.of(
                    new PlanCharacteristic(null, monthly, "Acceso 30 días"),
                    new PlanCharacteristic(null, monthly, "Soporte premium"),
                    new PlanCharacteristic(null, monthly, "Todas las funciones"),
                    new PlanCharacteristic(null, monthly, "Sin anuncios")));

            biweekly.setCharacteristics(List.of(
                    new PlanCharacteristic(null, biweekly, "Acceso 15 días"),
                    new PlanCharacteristic(null, biweekly, "Soporte prioritario"),
                    new PlanCharacteristic(null, biweekly, "Funciones avanzadas")));

            daily.setCharacteristics(List.of(
                    new PlanCharacteristic(null, daily, "Acceso 24 horas"),
                    new PlanCharacteristic(null, daily, "Soporte básico")));

            free.setCharacteristics(List.of(
                    new PlanCharacteristic(null, free, "Acceso limitado"),
                    new PlanCharacteristic(null, free, "Con anuncios")));

            planRepository.saveAll(List.of(monthly, biweekly, daily, free));
        }
    }
}
