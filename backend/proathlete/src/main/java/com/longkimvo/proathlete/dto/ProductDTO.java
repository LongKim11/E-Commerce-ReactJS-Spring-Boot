package com.longkimvo.proathlete.dto;

import com.longkimvo.proathlete.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private String name;
    private String description;
    private BigDecimal price;
    private String brand;
    private Gender gender;
    private UUID category_id;
    private List<ProductVariantDTO> variantList;
    private List<ResourceDTO> resourceList;
}
