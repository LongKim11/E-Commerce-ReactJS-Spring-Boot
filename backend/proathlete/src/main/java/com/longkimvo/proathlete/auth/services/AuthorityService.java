package com.longkimvo.proathlete.auth.services;

import com.longkimvo.proathlete.auth.entities.Authority;
import com.longkimvo.proathlete.auth.repositories.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority() {
        List<Authority> authorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("USER");
        authorities.add(authority);
        return authorities;
    }

    public Authority createAuthority (String roleCode, String description) {
        Authority authority = Authority.builder().roleCode(roleCode).roleDescription(description).build();
        return authorityRepository.save(authority);
    }
}
