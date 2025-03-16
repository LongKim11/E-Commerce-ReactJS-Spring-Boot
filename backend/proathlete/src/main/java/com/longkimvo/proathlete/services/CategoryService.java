package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.CategoryDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.exceptions.ResourceNotFoundException;
import com.longkimvo.proathlete.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategory () {
        return categoryRepository.findAll();
    }

    public Category getCategoryByID (UUID categoryID) {
        Optional<Category> category = categoryRepository.findById(categoryID);
        return category.orElseThrow(() -> new ResourceNotFoundException("Category Not Found with ID: " + categoryID));
    }

    public Category creatCategory (CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        return categoryRepository.save(category);
    }

    public Category updateCategory (UUID categoryID, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(categoryID).orElseThrow(() -> new ResourceNotFoundException("Category Not Found with ID: " + categoryID));

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        return categoryRepository.save(category);
    }

    public void deleteCategoryByID(UUID categoryID) {
        Category category = categoryRepository.findById(categoryID).orElseThrow(() -> new ResourceNotFoundException("Category Not Found with ID: " + categoryID));

        categoryRepository.deleteById(categoryID);
    }
}
