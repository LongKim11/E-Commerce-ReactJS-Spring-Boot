package com.longkimvo.proathlete.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.longkimvo.proathlete.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name="order_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @Column(nullable = false)
    private UUID productVariantID;

    @ManyToOne
    @JoinColumn(name="order_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Order order;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double subTotal;
}
