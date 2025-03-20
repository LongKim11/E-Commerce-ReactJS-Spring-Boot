package com.longkimvo.proathlete.auth.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Service {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private AuthorityService authorityService;

    public User createUser(OAuth2User oAuth2User, String provider) {
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String email = oAuth2User.getAttribute("email");

        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .provider(provider)
                .enabled(true)
                .authorities(authorityService.getUserAuthority())
                .build();
        return userDetailsRepository.save(user);
    }

    public User getUser(String username) {
        return userDetailsRepository.findByEmail(username);
    }
}
