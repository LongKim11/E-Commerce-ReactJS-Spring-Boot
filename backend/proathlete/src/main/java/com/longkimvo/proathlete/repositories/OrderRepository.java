package com.longkimvo.proathlete.repositories;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser(User user);
}
