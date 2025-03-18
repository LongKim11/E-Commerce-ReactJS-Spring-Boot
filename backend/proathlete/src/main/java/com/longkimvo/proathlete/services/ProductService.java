package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.entities.ProductVariant;
import com.longkimvo.proathlete.entities.Resource;
import com.longkimvo.proathlete.enums.Gender;
import com.longkimvo.proathlete.exceptions.ResourceNotFoundException;
import com.longkimvo.proathlete.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    private Product mapToProduct(ProductDTO productDTO, Category category, Product updatedProduct){

        if (updatedProduct == null) {
            return  Product.builder()
                    .name(productDTO.getName())
                    .description(productDTO.getDescription())
                    .price(productDTO.getPrice())
                    .brand(productDTO.getBrand())
                    .gender(productDTO.getGender())
                    .category(category)
                    .build();
        }

        else {
            updatedProduct.setName(productDTO.getName());
            updatedProduct.setDescription(productDTO.getDescription());
            updatedProduct.setPrice(productDTO.getPrice());
            updatedProduct.setBrand(productDTO.getBrand());
            updatedProduct.setGender(productDTO.getGender());
            updatedProduct.setCategory(category);
            return updatedProduct;
        }
    }

    private List<Resource> mapToResource (ProductDTO productDTO, Product product) {
        return productDTO.getResourceList().stream().map(resourceDTO -> {
            return Resource.builder()
                    .url(resourceDTO.getUrl())
                    .product(product)
                    .build();
        }).toList();
    }


    private List<ProductVariant> mapToProductVariant(ProductDTO productDTO, Product product) {
        return productDTO.getVariantList().stream().map(variantDTO -> {
            return ProductVariant.builder()
                    .color(variantDTO.getColor())
                    .size(variantDTO.getSize())
                    .stockQuantity(variantDTO.getStockQuantity())
                    .product(product)
                    .build();
        }).toList();
    }

    public Product createProduct(ProductDTO productDTO) {
        Category category = categoryService.getCategoryByID(productDTO.getCategory_id());

        Product newProduct = mapToProduct(productDTO, category, null);

        List<ProductVariant> variantList = mapToProductVariant(productDTO, newProduct);

        List<Resource> resourceList = mapToResource(productDTO, newProduct);

        newProduct.setProductVariantList(variantList);
        newProduct.setResources(resourceList);

        return productRepository.save(newProduct);
    }

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    public Product getProductByID (UUID productID) {
        Optional<Product> product = productRepository.findById(productID);

        return product.orElseThrow(() -> new ResourceNotFoundException("Product Not Found with ID: " + productID));
    }

    public Product updateProduct (UUID productID, ProductDTO productDTO) {
        Category category = categoryService.getCategoryByID(productDTO.getCategory_id());

        Product updatedProduct = getProductByID(productID);

        updatedProduct = mapToProduct(productDTO, category, updatedProduct);

        updatedProduct.getProductVariantList().clear();
        updatedProduct.getResources().clear();

        List<ProductVariant> variantList = mapToProductVariant(productDTO, updatedProduct);

        List<Resource> resourceList = mapToResource(productDTO, updatedProduct);

        updatedProduct.setProductVariantList(variantList);
        updatedProduct.setResources(resourceList);

        return productRepository.save(updatedProduct);
    }


    public void deleteProductByID (UUID productID) {
        Product product = getProductByID(productID);

        productRepository.deleteById(productID);
    }


    public List<Product> getProductByGender(Gender gender) {
        return productRepository.findByGender(gender);
    }

}
