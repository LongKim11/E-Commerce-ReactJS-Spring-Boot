package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.CategoryDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory (UUID categoryID) {
        Optional<Category> category = categoryRepository.findById(categoryID);
        return category.orElse(null);
    }

    public Category creatCategory (CategoryDTO categoryDTO) {
        Category category = mapToEntity(categoryDTO);
        return categoryRepository.save(category);
    }

    private Category mapToEntity(CategoryDTO categoryDTO) {
        return Category.builder()
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .build();
    }
}
