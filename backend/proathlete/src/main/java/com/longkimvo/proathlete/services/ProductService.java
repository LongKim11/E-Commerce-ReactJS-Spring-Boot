package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.entities.Product;

import java.util.List;

public interface ProductService {
    public Product addProduct(ProductDTO productDTO);
    public List<Product> getAllProducts();
}
