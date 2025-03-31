package com.longkimvo.proathlete.auth.controllers;

import com.longkimvo.proathlete.auth.config.JWTTokenHelper;
import com.longkimvo.proathlete.auth.dto.LoginRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationResponse;
import com.longkimvo.proathlete.auth.dto.UserToken;
import com.longkimvo.proathlete.auth.entities.Authority;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.repositories.UserDetailsRepository;
import com.longkimvo.proathlete.auth.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RegistrationService registrationService;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JWTTokenHelper jwtTokenHelper;

    @PostMapping("/login")
    public ResponseEntity<UserToken> login(@RequestBody LoginRequest loginRequest) {
        try {

            Authentication authentication = UsernamePasswordAuthenticationToken
                    .unauthenticated(loginRequest.getUsername(), loginRequest.getPassword());

            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);

            if (authenticationResponse.isAuthenticated()) {

                User user = (User) authenticationResponse.getPrincipal();

                if (!user.isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                List<String> roles = user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();

                String token = jwtTokenHelper.generateToken(user.getEmail(), roles);

                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken, HttpStatus.OK);
            }

        } catch (BadCredentialsException e) {

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register (@RequestBody RegistrationRequest registrationRequest) {
        RegistrationResponse registrationResponse = registrationService.createUser(registrationRequest);

       return new ResponseEntity<>(registrationResponse, registrationResponse.getCode() == 200 ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode (@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String code = map.get("code");

        User user = (User) userDetailsService.loadUserByUsername(username);

        if (user != null && user.getVerificationCode().equals(code)) {
            registrationService.verifyUser(username);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
