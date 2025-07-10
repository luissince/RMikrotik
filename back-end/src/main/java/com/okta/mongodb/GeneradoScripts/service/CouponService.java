package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.coupon.Coupon;
import com.okta.mongodb.GeneradoScripts.repository.CouponRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    private final CouponRepository repository;

    public CouponService(CouponRepository repository) {
        this.repository = repository;
    }

    public List<Coupon> findAll() {
        return repository.findAll();
    }

    public Optional<Coupon> findById(String id) {
        return repository.findById(id);
    }

    public Coupon save(Coupon coupon) {
        return repository.save(coupon);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }
}
