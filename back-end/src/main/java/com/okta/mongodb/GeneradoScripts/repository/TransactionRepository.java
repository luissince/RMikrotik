package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.subscription.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Transaction findByOrderId(String orderId);
}
