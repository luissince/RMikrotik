package com.okta.mongodb.GeneradoScripts.service;

import com.okta.mongodb.GeneradoScripts.model.coupon.Coupon;
import com.okta.mongodb.GeneradoScripts.repository.CouponRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CouponService {

    private static final Logger logger = LoggerFactory.getLogger(CouponService.class);

    private final CouponRepository repository;

    public CouponService(CouponRepository repository) {
        this.repository = repository;
    }

    public List<Coupon> findAll() {
        return repository.findAll();
    }

    public ResponseEntity<?> getCouponById(String id) {
        Optional<Coupon> optional = repository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Cupón no encontrado"));
        }
    }

    public ResponseEntity<?> createCoupon(Coupon coupon) {
        if (repository.existsByCode(coupon.getCode())) {
            return ResponseEntity.badRequest().body(Map.of("message", "El código del cupón ya existe"));
        }

        coupon.setCreatedAt(LocalDate.now());
        coupon.setUsed(false);
        repository.save(coupon);
        return ResponseEntity.ok(Map.of("message", "Cupón creado exitosamente"));
    }

    public ResponseEntity<?> updateCoupon(String id, Coupon updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setCode(updated.getCode());
                    repository.save(existing);
                    return ResponseEntity.ok(Map.of("message", "Cupón actualizado exitosamente"));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("message", "Cupón no encontrado")));
    }

    public ResponseEntity<?> useCoupon(String code) {
        return repository.findByCode(code)
                .map(existing -> {
                    if (existing.isUsed()) {
                        return ResponseEntity.badRequest().body(Map.of("message", "El cupón ya ha sido usado."));
                    }
                    existing.setUsed(true);
                    repository.save(existing);
                    return ResponseEntity.ok(Map.of("message", "Cupón marcado como usado exitosamente"));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("message", "Cupón no encontrado")));
    }

    public ResponseEntity<?> deleteCoupon(String id) {
        return repository.findById(id)
                .map(existing -> {
                    if (existing.isUsed()) {
                        return ResponseEntity.badRequest()
                                .body(Map.of("message", "No se puede eliminar un cupón que ha sido usado."));
                    }
                    repository.deleteById(id);
                    return ResponseEntity.ok(Map.of("message", "Cupón eliminado exitosamente"));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("message", "Cupón no encontrado")));
    }
}
