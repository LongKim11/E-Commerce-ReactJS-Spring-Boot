package com.longkimvo.proathlete.dto;


import com.longkimvo.proathlete.entities.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private UUID addressID;
    private List<OrderItemRequest> orderItemRequestList;
    private Double totalAmount;
    private Date expectedDeliveryDate;
    private String paymentMethod;
}
