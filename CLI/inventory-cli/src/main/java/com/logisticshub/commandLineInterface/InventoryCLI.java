package com.logisticshub.commandLineInterface;

import com.logisticshub.model.Product;
import com.logisticshub.service.ProductService;

import java.util.Scanner;

public class InventoryCLI {

    private final Scanner scanner = new Scanner(System.in);

    private final ProductService service = new ProductService();

    public void start() {

        while (true) {

            System.out.println("\n===== INVENTORY MENU =====");

            System.out.println("1. Add Product");
            System.out.println("2. View Products");
            System.out.println("3. Update Quantity");
            System.out.println("4. Delete Product");
            System.out.println("5. Exit");

            System.out.print("Choose Option: ");

            int choice = scanner.nextInt();

            switch (choice) {

                case 1:
                    addProduct();
                    break;

                case 2:
                    service.viewProducts();
                    break;

                case 3:
                    updateQuantity();
                    break;

                case 4:
                    deleteProduct();
                    break;

                case 5:
                    System.out.println("Exiting...");
                    return;

                default:
                    System.out.println("Invalid Option");
            }
        }
    }

    private void addProduct() {

        System.out.print("Enter Product ID: ");
        int id = scanner.nextInt();

        scanner.nextLine();

        System.out.print("Enter Product Name: ");
        String name = scanner.nextLine();

        System.out.print("Enter Quantity: ");
        int quantity = scanner.nextInt();

        System.out.print("Enter Price: ");
        double price = scanner.nextDouble();

        Product product = new Product(
                id,
                name,
                quantity,
                price
        );

        service.addProduct(product);
    }

    private void updateQuantity() {

        System.out.print("Enter Product ID: ");
        int id = scanner.nextInt();

        System.out.print("Enter New Quantity: ");
        int quantity = scanner.nextInt();

        service.updateQuantity(id, quantity);
    }

    private void deleteProduct() {

        System.out.print("Enter Product ID: ");
        int id = scanner.nextInt();

        service.deleteProduct(id);
    }
}