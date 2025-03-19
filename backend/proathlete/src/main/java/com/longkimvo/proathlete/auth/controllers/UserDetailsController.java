package com.longkimvo.proathlete.auth.controllers;

import com.longkimvo.proathlete.auth.dto.UserDetailsDTO;
import com.longkimvo.proathlete.auth.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDTO> getUserProfile(Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .authorityList(user.getAuthorities().toArray())
                .build();

        return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);
    }
}
