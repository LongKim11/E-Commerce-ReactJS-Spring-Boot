package com.longkimvo.proathlete.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JWTTokenHelper jwtTokenHelper;

    public JWTAuthenticationFilter(UserDetailsService userDetailsService, JWTTokenHelper jwtTokenHelper) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);

        } else {
            try {
                String authToken = jwtTokenHelper.getToken(request);
                if (authToken != null) {
                    String username = jwtTokenHelper.getUsernameFromToken(authToken);
                    if (username != null) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                        if (jwtTokenHelper.validateToken(authToken, userDetails)) {
                            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            authenticationToken.setDetails(new WebAuthenticationDetails(request));

                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
                    }
                }
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
