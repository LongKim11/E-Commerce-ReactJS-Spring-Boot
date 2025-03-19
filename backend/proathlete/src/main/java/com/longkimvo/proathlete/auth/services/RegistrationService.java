package com.longkimvo.proathlete.auth.services;

import com.longkimvo.proathlete.auth.dto.RegistrationRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationResponse;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.helper.VerificationCodeGenerator;
import com.longkimvo.proathlete.auth.repositories.AuthorityRepository;
import com.longkimvo.proathlete.auth.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private EmailService emailService;

    public RegistrationResponse createUser(RegistrationRequest registrationRequest) {
        User existedUser = userDetailsRepository.findByEmail(registrationRequest.getEmail());

        if (existedUser != null) {
            return RegistrationResponse.builder().code(400).message("Email already existed!").build();
        }

        try {
            User user = new User();
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());

            userDetailsRepository.save(user);

            emailService.sendMail(user);

            return RegistrationResponse.builder().code(200).message("User created successfully!").build();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ServerErrorException(e.getMessage(), e.getCause());
        }
    }

    public void verifyUser(String username) {
        User user = userDetailsRepository.findByEmail(username);
        user.setEnabled(true);
        userDetailsRepository.save(user);
    }
}
