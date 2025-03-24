package com.longkimvo.proathlete.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.longkimvo.proathlete.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name="address")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String zipCode;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;

}
