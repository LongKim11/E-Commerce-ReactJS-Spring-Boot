package com.longkimvo.proathlete.dto;

import com.longkimvo.proathlete.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDeliveryStatusRequest {
    private UUID id;
    private OrderStatus status;
}
