    package com.longkimvo.proathlete.auth.controllers;

    import com.longkimvo.proathlete.auth.config.JWTTokenHelper;
    import com.longkimvo.proathlete.auth.entities.User;
    import com.longkimvo.proathlete.auth.services.OAuth2Service;
    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.servlet.http.HttpSession;
    import org.hibernate.dialect.JsonHelper;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.oauth2.core.user.OAuth2User;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import java.io.IOException;
    import java.util.Collections;
    import java.util.List;

    @RestController
    @CrossOrigin
    @RequestMapping("/oauth2")
    public class OAuth2Controller {

        @Autowired
        OAuth2Service oAuth2Service;

        @Autowired
        private JWTTokenHelper jwtTokenHelper;

        @GetMapping("/success")
        public void callbackOAuth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {
            if (oAuth2User == null) {
                throw new RuntimeException("OAuth2User is null. Authentication might have failed.");
            }

            String username = oAuth2User.getAttribute("email");
            User user = oAuth2Service.getUser(username);

            if (user == null) {
                user = oAuth2Service.createUser(oAuth2User, "google");
            }

            List<String> roles = user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String token = jwtTokenHelper.generateToken(user.getEmail(), roles);

            response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
        }
    }
