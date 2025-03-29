package com.longkimvo.proathlete.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemRequest {
    private UUID productID;
    private UUID productVariantID;
    private String color;
    private String size;
    private Integer quantity;
    private Double price;
    private Double subTotal;
}
