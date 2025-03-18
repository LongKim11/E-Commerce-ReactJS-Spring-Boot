package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.enums.Gender;
import com.longkimvo.proathlete.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> productList = productService.getAllProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductByID (@PathVariable(value="id") UUID productID) {
        Product product = productService.getProductByID(productID);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = productService.createProduct(productDTO);
        return new ResponseEntity<>(product, HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(value="id") UUID productID, @RequestBody ProductDTO productDTO) {
        Product product = productService.updateProduct(productID, productDTO);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductByID (@PathVariable(value="id") UUID productID) {
        productService.deleteProductByID(productID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-gender")
    public ResponseEntity<List<Product>> getProductByGender(@RequestParam Gender gender) {
        List<Product> products = productService.getProductByGender(gender);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
