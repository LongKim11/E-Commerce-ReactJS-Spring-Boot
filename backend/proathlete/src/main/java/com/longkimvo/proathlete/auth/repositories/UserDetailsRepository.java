package com.longkimvo.proathlete.auth.repositories;

import com.longkimvo.proathlete.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, UUID> {
    User findByEmail(String username);
}
