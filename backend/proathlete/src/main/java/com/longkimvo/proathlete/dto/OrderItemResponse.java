package com.longkimvo.proathlete.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.longkimvo.proathlete.entities.Order;
import com.longkimvo.proathlete.entities.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {

    private UUID id;

    private Product product;

    private UUID productVariantID;

    private Integer quantity;

    private Double price;

    private Double subTotal;

    private String color;

    private String size;
}
