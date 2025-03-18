package com.longkimvo.proathlete.repositories;

import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByGender (Gender gender);

    List<Product> findByCategory (Category categoryID);
}
