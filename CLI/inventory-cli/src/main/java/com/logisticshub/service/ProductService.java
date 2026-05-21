package com.logisticshub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.logisticshub.model.Product;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class ProductService {

    private static final String BASE_URL =
            "http://localhost:8080/api/products";

    private final HttpClient client =
            HttpClient.newHttpClient();

    private final ObjectMapper mapper =
            new ObjectMapper();

    public void addProduct(Product product) {

        try {

            String json =
                    mapper.writeValueAsString(product);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(BASE_URL))
                            .header("Content-Type",
                                    "application/json")
                            .POST(HttpRequest.BodyPublishers
                                    .ofString(json))
                            .build();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );

            System.out.println("\nProduct Added");
            System.out.println(response.body());

        } catch (Exception e) {

            System.out.println(
                    "Error adding product"
            );
        }
    }

    public void viewProducts() {

        try {

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(BASE_URL))
                            .GET()
                            .build();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );

            List<Product> products =
                    mapper.readValue(
                            response.body(),
                            new TypeReference<List<Product>>() {}
                    );

            System.out.println("\n===== PRODUCTS =====");

            for (Product p : products) {
                System.out.println(p);
            }

        } catch (Exception e) {

            System.out.println(
                    "Error fetching products"
            );
        }
    }

    
    public void updateProduct(Long id,
                              Product product) {

        try {

            String json =
                    mapper.writeValueAsString(product);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(
                                    BASE_URL + "/" + id
                            ))
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .PUT(
                                    HttpRequest
                                            .BodyPublishers
                                            .ofString(json)
                            )
                            .build();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );

            System.out.println(
                    "\nProduct Updated"
            );

            System.out.println(
                    response.body()
            );

        } catch (Exception e) {

            System.out.println(
                    "Error updating product"
            );
        }
    }

    public void deleteProduct(Long id) {

        try {

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(
                                    BASE_URL + "/" + id
                            ))
                            .DELETE()
                            .build();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );

            System.out.println(
                    "\nProduct Deleted"
            );

            System.out.println(
                    response.body()
            );

        } catch (IOException |
                 InterruptedException e) {

            System.out.println(
                    "Error deleting product"
            );
        }
    }
}