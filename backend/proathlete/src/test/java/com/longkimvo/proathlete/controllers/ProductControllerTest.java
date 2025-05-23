package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.dto.ProductDTO;
import com.longkimvo.proathlete.entities.Product;
import com.longkimvo.proathlete.enums.Gender;
import com.longkimvo.proathlete.services.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    private Product sampleProduct;
    private ProductDTO sampleProductDTO;

    private UUID sampleProductId;

    @BeforeEach
    void setUp() {
        sampleProductId = UUID.randomUUID();

        sampleProduct = Product.builder()
                .id(sampleProductId)
                .name("Test Product")
                .description("Test Description")
                .price(BigDecimal.valueOf(100.0))
                .gender(Gender.MEN)
                .build();

        sampleProductDTO = ProductDTO.builder()
                .name("Test Product")
                .description("Test Description")
                .price(BigDecimal.valueOf(100.0))
                .gender(Gender.MEN)
                .build();
    }

    @Test
    void testGetAllProducts() throws Exception {
        when(productService.getAllProducts()).thenReturn(List.of(sampleProduct));

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(sampleProductId.toString()))
                .andExpect(jsonPath("$[0].name").value("Test Product"));

        verify(productService, times(1)).getAllProducts();
    }

    @Test
    void testGetProductByID() throws Exception {
        when(productService.getProductByID(sampleProductId)).thenReturn(sampleProduct);

        mockMvc.perform(get("/api/product/{id}", sampleProductId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sampleProductId.toString()))
                .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService, times(1)).getProductByID(sampleProductId);
    }

    @Test
    void testCreateProduct() throws Exception {
        when(productService.createProduct(any(ProductDTO.class))).thenReturn(sampleProduct);

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleProductDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sampleProductId.toString()))
                .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService, times(1)).createProduct(any(ProductDTO.class));
    }

    @Test
    void testUpdateProduct() throws Exception {
        when(productService.updateProduct(eq(sampleProductId), any(ProductDTO.class))).thenReturn(sampleProduct);

        mockMvc.perform(put("/api/product/{id}", sampleProductId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleProductDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sampleProductId.toString()))
                .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService, times(1)).updateProduct(eq(sampleProductId), any(ProductDTO.class));
    }

    @Test
    void testDeleteProductByID() throws Exception {
        doNothing().when(productService).deleteProductByID(sampleProductId);

        mockMvc.perform(delete("/api/product/{id}", sampleProductId))
                .andExpect(status().isNoContent());

        verify(productService, times(1)).deleteProductByID(sampleProductId);
    }

    @Test
    void testGetProductByGender() throws Exception {
        when(productService.getProductByGender(Gender.MEN)).thenReturn(List.of(sampleProduct));

        mockMvc.perform(get("/api/product/by-gender")
                        .param("gender", "MALE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].gender").value("MALE"));

        verify(productService, times(1)).getProductByGender(Gender.MEN);
    }

    @Test
    void testGetProductByCategory() throws Exception {
        UUID categoryId = UUID.randomUUID();
        when(productService.getProductByCategory(categoryId)).thenReturn(List.of(sampleProduct));

        mockMvc.perform(get("/api/product/by-category")
                        .param("categoryID", categoryId.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(sampleProductId.toString()));

        verify(productService, times(1)).getProductByCategory(categoryId);
    }
}
