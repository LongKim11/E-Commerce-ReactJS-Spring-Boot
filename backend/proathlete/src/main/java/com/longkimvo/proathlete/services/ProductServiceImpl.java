package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(ProductDTO productDTO) {

        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products;
    }

    private Product createProduct (ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription((productDTO.getDescription()));
        product.setPrice(productDTO.getPrice());
        product.setBrand(productDTO.getBrand());
        product.setGender(productDTO.getGender());

        return null;
    }

}
