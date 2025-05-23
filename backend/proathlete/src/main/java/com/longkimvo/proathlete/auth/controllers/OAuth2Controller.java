package com.longkimvo.proathlete.auth.controllers;

import com.longkimvo.proathlete.auth.config.JWTTokenHelper;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.services.OAuth2Service;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/oauth2")
public class OAuth2Controller {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);

    @Autowired
    private OAuth2Service oAuth2Service;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @GetMapping("/success")
    public void callbackOAuth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {
        logger.info("Processing OAuth2 success callback");

        if (oAuth2User == null) {
            logger.error("OAuth2User is null. Authentication might have failed.");
            response.sendRedirect("http://localhost:5173/auth/login?error=AuthenticationFailed");
            return;
        }

        logger.info("OAuth2User attributes: {}", oAuth2User.getAttributes());

        String username = oAuth2User.getAttribute("email");
        if (username == null) {
            logger.error("Email attribute not found in OAuth2User.");
            response.sendRedirect("http://localhost:5173/auth/login?error=InvalidUserData");
            return;
        }

        User user = oAuth2Service.getUser(username);
        if (user == null) {
            logger.info("Creating new user for email: {}", username);
            user = oAuth2Service.createUser(oAuth2User, "google");
        }
        logger.info("User authorities: {}", user.getAuthorities());

        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String token = jwtTokenHelper.generateToken(user.getEmail(), roles);
        logger.info("Generated JWT token for user: {}", username);

        response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
    }
}