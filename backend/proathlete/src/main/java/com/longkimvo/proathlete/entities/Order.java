package com.longkimvo.proathlete.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name="address_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Address address;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Payment payment;

    @Column(nullable = true)
    private String trackingNumber;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<OrderItem> orderItemList;
}
