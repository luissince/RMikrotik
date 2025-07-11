package com.okta.mongodb.GeneradoScripts.controller;

import com.okta.mongodb.GeneradoScripts.model.coupon.Coupon;
import com.okta.mongodb.GeneradoScripts.service.CouponService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> getCouponById(@PathVariable String id) {
        return service.getCouponById(id);
    }

    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody Coupon coupon) {
        return service.createCoupon(coupon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable String id, @RequestBody Coupon updated) {
        return service.updateCoupon(id, updated);
    }

    @PatchMapping("/{code}/use")
    public ResponseEntity<?> useCoupon(@PathVariable String code) {
        return service.useCoupon(code);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable String id) {
        return service.deleteCoupon(id);
    }
}
