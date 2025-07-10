package com.okta.mongodb.GeneradoScripts.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.coupon.Coupon;
import com.okta.mongodb.GeneradoScripts.service.CouponService;

@RestController
@RequestMapping("/coupon")
public class CouponController {

    @Autowired
    private CouponService service;

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        coupon.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(service.save(coupon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable String id, @RequestBody Coupon updated) {
        return service.findById(id)
                .map(existing -> {
                    existing.setCode(updated.getCode());
                    existing.setDiscount(updated.getDiscount());
                    existing.setValidUntil(updated.getValidUntil());
                    existing.setActive(updated.isActive());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
