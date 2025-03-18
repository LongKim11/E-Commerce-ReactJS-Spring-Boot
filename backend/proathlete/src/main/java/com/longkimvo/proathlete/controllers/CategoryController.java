package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.dto.CategoryDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.services.CategoryService;
import com.longkimvo.proathlete.services.ProductService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categoryList = categoryService.getAllCategories();
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryByID(@PathVariable(value="id") UUID categoryID) {
        Category category = categoryService.getCategoryByID(categoryID);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = categoryService.creatCategory(categoryDTO);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory (@PathVariable(value="id") UUID categoryID, @RequestBody CategoryDTO categoryDTO) {
        Category updatedCategory = categoryService.updateCategory(categoryID, categoryDTO);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryByID (@PathVariable(value="id") UUID categoryID) {
        categoryService.deleteCategoryByID(categoryID);
        return ResponseEntity.noContent().build();
    }

}
