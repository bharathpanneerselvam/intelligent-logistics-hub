package com.logistics.backend_service.integration;

import com.logistics.backend_service.model.User;
import com.logistics.backend_service.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;
 

    @Test
    void testRegisterIntegration() {
        User user = new User();
        user.setEmail("test1@gmail.com");
        user.setPassword("1234");
        user.setRole("USER");

        ResponseEntity<String> response =
                restTemplate.postForEntity("/api/auth/register", user, String.class);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully", response.getBody());

        assertTrue(userRepository.findByEmail("test1@gmail.com").isPresent());
    }
 

    @Test
    void testLoginIntegration() {
    
        User user = new User();
        user.setEmail("login@test.com");
        user.setPassword("1234");
        user.setRole("USER");

        restTemplate.postForEntity("/api/auth/register", user, String.class);
 
        String loginJson = """
        {
            "email": "login@test.com",
            "password": "1234"
        }
        """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(loginJson, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity("/api/auth/login", request, String.class);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("token"));
    }
}