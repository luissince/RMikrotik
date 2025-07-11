package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.coupon.Coupon;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, String> {
    Optional<Coupon> findByCode(String code);

    boolean existsByCode(String code); 
}
