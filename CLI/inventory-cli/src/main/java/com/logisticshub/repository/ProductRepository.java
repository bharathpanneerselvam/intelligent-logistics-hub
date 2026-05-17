package com.logisticshub.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.logisticshub.model.Product;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProductRepository {

    private static final String FILE_PATH = "inventory.json";

    private final ObjectMapper mapper = new ObjectMapper();

    public void saveProducts(List<Product> products) {

        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(new File(FILE_PATH), products);

        } catch (IOException e) {
            System.out.println("Error saving inventory");
        }
    }

    public List<Product> loadProducts() {

        File file = new File(FILE_PATH);

        if (!file.exists()) {
            return new ArrayList<>();
        }

        try {
            return mapper.readValue(
                    file,
                    new TypeReference<List<Product>>() {}
            );

        } catch (IOException e) {
            System.out.println("Error loading inventory");
            return new ArrayList<>();
        }
    }
}