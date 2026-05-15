package com.logisticshub.service;

import com.logisticshub.model.Product;
import com.logisticshub.repository.ProductRepository;

import java.util.List;

public class ProductService {

    private final ProductRepository repository;

    private final List<Product> products;

    public ProductService() {

        repository = new ProductRepository();

        products = repository.loadProducts();
    }

    public void addProduct(Product product) {

        products.add(product);

        repository.saveProducts(products);

        System.out.println("Product Added");
    }

    public void viewProducts() {

        if (products.isEmpty()) {
            System.out.println("Inventory Empty");
            return;
        }

        for (Product product : products) {
            System.out.println(product);
        }
    }

    public void deleteProduct(int id) {

        products.removeIf(product -> product.getId()==id);

        repository.saveProducts(products);

        System.out.println("Product Deleted");
    }

    public void updateQuantity(int id, int quantity) {

        for (Product product : products) {

            if (product.getId() == id) {

                product.setQuantity(quantity);
                repository.saveProducts(products);
                System.out.println("Quantity Updated");

                return;
            }
        }

        System.out.println("Product Not Found");
    }
}