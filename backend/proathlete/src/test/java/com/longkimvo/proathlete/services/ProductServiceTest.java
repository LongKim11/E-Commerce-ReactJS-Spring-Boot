package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.dto.ProductVariantDTO;
import com.longkimvo.proathlete.dto.ResourceDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.enums.Gender;
import com.longkimvo.proathlete.exceptions.ResourceNotFoundException;
import com.longkimvo.proathlete.repositories.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private ProductService productService;

    private ProductDTO productDTO;
    private Category category;
    private Product product;
    private UUID productId;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        category = Category.builder().id(UUID.randomUUID()).name("Shoes").build();

        productDTO = ProductDTO.builder()
                .name("Nike Air")
                .description("Running Shoes")
                .price(BigDecimal.valueOf(100.0))
                .brand("Nike")
                .gender(Gender.MEN)
                .category_id(category.getId())
                .variantList(List.of(ProductVariantDTO.builder().color("Red").size("42").stockQuantity(10).build()))
                .resourceList(List.of(ResourceDTO.builder().url("http://image.com/img.png").build()))
                .build();

        product = Product.builder()
                .id(productId)
                .name("Nike Air")
                .description("Running Shoes")
                .price(BigDecimal.valueOf(100.0))
                .brand("Nike")
                .gender(Gender.MEN)
                .category(category)
                .productVariantList(new ArrayList<>())
                .resources(new ArrayList<>())
                .build();
    }

    @Test
    void createProduct_ShouldSaveAndReturnProduct() {
        when(categoryService.getCategoryByID(productDTO.getCategory_id())).thenReturn(category);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product createdProduct = productService.createProduct(productDTO);

        assertThat(createdProduct).isNotNull();
        assertThat(createdProduct.getName()).isEqualTo(productDTO.getName());
        assertThat(createdProduct.getProductVariantList()).hasSize(1);
        assertThat(createdProduct.getResources()).hasSize(1);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void getAllProducts_ShouldReturnList() {
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<Product> result = productService.getAllProducts();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getName()).isEqualTo("Nike Air");
    }


    @Test
    void getProductByID_ShouldReturnProduct_WhenExists() {
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        Product result = productService.getProductByID(productId);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(productId);
    }

    @Test
    void getProductByID_ShouldThrowException_WhenNotFound() {
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductByID(productId));
    }

    @Test
    void updateProduct_ShouldUpdateAndReturnProduct() {
        when(categoryService.getCategoryByID(productDTO.getCategory_id())).thenReturn(category);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product updated = productService.updateProduct(productId, productDTO);

        assertThat(updated.getName()).isEqualTo(productDTO.getName());
        assertThat(updated.getProductVariantList()).hasSize(1);
        assertThat(updated.getResources()).hasSize(1);
    }

    @Test
    void deleteProductByID_ShouldDelete() {
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        productService.deleteProductByID(productId);

        verify(productRepository).deleteById(productId);
    }

    @Test
    void getProductByGender_ShouldReturnProducts() {
        when(productRepository.findByGender(Gender.MEN)).thenReturn(List.of(product));

        List<Product> result = productService.getProductByGender(Gender.MEN);

        assertThat(result).hasSize(1);
        verify(productRepository).findByGender(Gender.MEN);
    }

    @Test
    void getProductByCategory_ShouldReturnProducts() {
        when(categoryService.getCategoryByID(category.getId())).thenReturn(category);
        when(productRepository.findByCategory(category)).thenReturn(List.of(product));

        List<Product> result = productService.getProductByCategory(category.getId());

        assertThat(result).hasSize(1);
        verify(productRepository).findByCategory(category);
    }

}
