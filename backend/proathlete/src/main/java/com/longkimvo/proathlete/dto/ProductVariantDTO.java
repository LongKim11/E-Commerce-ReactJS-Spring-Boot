package com.longkimvo.proathlete.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO {
    private UUID id;
    private String color;
    private String size;
    private Integer stockQuantity;
    private UUID product_id;
}
