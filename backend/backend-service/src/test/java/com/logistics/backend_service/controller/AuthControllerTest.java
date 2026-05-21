package com.logistics.backend_service.controller;

import com.logistics.backend_service.dto.AuthResponse;
import com.logistics.backend_service.dto.LoginRequest;
import com.logistics.backend_service.model.User;
import com.logistics.backend_service.repository.UserRepository;
import com.logistics.backend_service.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@gmail.com");
        user.setPassword("encodedPass");
        user.setRole("USER");
    }
    

    @Test
    void testRegister_Success() {
        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode("1234")).thenReturn("encodedPass");

        User input = new User();
        input.setEmail("test@gmail.com");
        input.setPassword("1234");

        ResponseEntity<?> response = authController.register(input);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully", response.getBody());

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_EmailAlreadyExists() {
        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        User input = new User();
        input.setEmail("test@gmail.com");
        input.setPassword("1234");

        ResponseEntity<?> response = authController.register(input);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email already registered", response.getBody());

        verify(userRepository, never()).save(any());
    }

    

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@gmail.com");
        request.setPassword("1234");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("1234", "encodedPass"))
                .thenReturn(true);

        when(jwtUtil.generateToken("test@gmail.com"))
                .thenReturn("mock-jwt-token");

        ResponseEntity<?> response = authController.login(request);

        assertEquals(200, response.getStatusCodeValue());

        AuthResponse body = (AuthResponse) response.getBody();
        assertNotNull(body);
        assertEquals("mock-jwt-token", body.getToken());
        assertEquals("test@gmail.com", body.getEmail());
        assertEquals("USER", body.getRole());
    }

    @Test
    void testLogin_UserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("notfound@gmail.com");
        request.setPassword("1234");

        when(userRepository.findByEmail("notfound@gmail.com"))
                .thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.login(request);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("User not found", response.getBody());
    }

    @Test
    void testLogin_WrongPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@gmail.com");
        request.setPassword("wrongpass");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("wrongpass", "encodedPass"))
                .thenReturn(false);

        ResponseEntity<?> response = authController.login(request);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Wrong password", response.getBody());
    }
}