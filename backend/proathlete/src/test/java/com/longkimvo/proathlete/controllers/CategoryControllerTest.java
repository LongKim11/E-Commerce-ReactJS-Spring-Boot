package com.longkimvo.proathlete.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longkimvo.proathlete.dto.CategoryDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.services.CategoryService;
import com.longkimvo.proathlete.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CategoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @Mock
    private ProductService productService;

    @InjectMocks
    private CategoryController categoryController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
    }

    @Test
    void testGetAllCategory() throws Exception {
        List<Category> categories = Arrays.asList(
                new Category(UUID.randomUUID(), "Category 1", "Desc 1", null),
                new Category(UUID.randomUUID(), "Category 2", "Desc 2", null)
        );

        when(categoryService.getAllCategories()).thenReturn(categories);

        mockMvc.perform(get("/api/category"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(categories.size()))
                .andExpect(jsonPath("$[0].name").value("Category 1"));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    void testGetCategoryByID() throws Exception {
        UUID id = UUID.randomUUID();
        Category category = new Category(id, "Category 1", "Description", null);

        when(categoryService.getCategoryByID(id)).thenReturn(category);

        mockMvc.perform(get("/api/category/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Category 1"));

        verify(categoryService, times(1)).getCategoryByID(id);
    }

    @Test
    void testCreateCategory() throws Exception {
        CategoryDTO categoryDTO = new CategoryDTO("New Category", "New Desc");
        Category savedCategory = new Category(UUID.randomUUID(), categoryDTO.getName(), categoryDTO.getDescription(), null);

        when(categoryService.creatCategory(any(CategoryDTO.class))).thenReturn(savedCategory);

        mockMvc.perform(post("/api/category")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(categoryDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Category"));

        verify(categoryService, times(1)).creatCategory(any(CategoryDTO.class));
    }

    @Test
    void testUpdateCategory() throws Exception {
        UUID id = UUID.randomUUID();
        CategoryDTO categoryDTO = new CategoryDTO("Updated Name", "Updated Desc");
        Category updatedCategory = new Category(id, categoryDTO.getName(), categoryDTO.getDescription(), null);

        when(categoryService.updateCategory(eq(id), any(CategoryDTO.class))).thenReturn(updatedCategory);

        mockMvc.perform(put("/api/category/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(categoryDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"));

        verify(categoryService, times(1)).updateCategory(eq(id), any(CategoryDTO.class));
    }

    @Test
    void testDeleteCategoryByID() throws Exception {
        UUID id = UUID.randomUUID();

        doNothing().when(categoryService).deleteCategoryByID(id);

        mockMvc.perform(delete("/api/category/{id}", id))
                .andExpect(status().isNoContent());

        verify(categoryService, times(1)).deleteCategoryByID(id);
    }
}
