package com.longkimvo.proathlete.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResourceDTO {
    private UUID id;
    private String name;
    private String url;
    private UUID product_id;
}
