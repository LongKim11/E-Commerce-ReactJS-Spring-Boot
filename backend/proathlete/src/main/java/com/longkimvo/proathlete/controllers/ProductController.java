package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.entities.Product;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        return null;
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return null;
    }
}
