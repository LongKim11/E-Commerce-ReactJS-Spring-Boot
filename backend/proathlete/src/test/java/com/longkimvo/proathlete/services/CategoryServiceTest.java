package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.dto.CategoryDTO;
import com.longkimvo.proathlete.entities.Category;
import com.longkimvo.proathlete.exceptions.ResourceNotFoundException;
import com.longkimvo.proathlete.repositories.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest {

    @InjectMocks
    private CategoryService categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    private Category category;
    private CategoryDTO categoryDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        category = new Category();
        category.setId(UUID.randomUUID());
        category.setName("Clothing");
        category.setDescription("All kinds of clothes");

        categoryDTO = new CategoryDTO();
        categoryDTO.setName("Clothing");
        categoryDTO.setDescription("All kinds of clothes");
    }

    @Test
    void testGetAllCategories() {
        List<Category> categories = List.of(category);
        when(categoryRepository.findAll()).thenReturn(categories);

        List<Category> result = categoryService.getAllCategories();

        assertEquals(1, result.size());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void testGetCategoryByID_Success() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryByID(category.getId());

        assertEquals("Clothing", result.getName());
        verify(categoryRepository, times(1)).findById(category.getId());
    }

    @Test
    void testGetCategoryByID_NotFound() {
        UUID randomId = UUID.randomUUID();
        when(categoryRepository.findById(randomId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            categoryService.getCategoryByID(randomId);
        });

        verify(categoryRepository, times(1)).findById(randomId);
    }

    @Test
    void testCreateCategory() {
        when(categoryRepository.save(any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Category saved = categoryService.creatCategory(categoryDTO);

        assertEquals("Clothing", saved.getName());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void testUpdateCategory_Success() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CategoryDTO updatedDTO = new CategoryDTO();
        updatedDTO.setName("Updated");
        updatedDTO.setDescription("Updated desc");

        Category updated = categoryService.updateCategory(category.getId(), updatedDTO);

        assertEquals("Updated", updated.getName());
        assertEquals("Updated desc", updated.getDescription());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void testDeleteCategoryByID_Success() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));

        categoryService.deleteCategoryByID(category.getId());

        verify(categoryRepository, times(1)).deleteById(category.getId());
    }
}
