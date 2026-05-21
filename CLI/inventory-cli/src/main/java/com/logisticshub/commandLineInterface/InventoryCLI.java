package com.logisticshub.commandLineInterface;

import com.logisticshub.model.Product;
import com.logisticshub.service.ProductService;

import java.util.Scanner;

public class InventoryCLI {

    private final Scanner scanner =
            new Scanner(System.in);

    private final ProductService service =
            new ProductService();

    public void start() {

        while (true) {

            System.out.println(
                    "\n===== INVENTORY MENU ====="
            );

            System.out.println(
                    "1. Add Product"
            );

            System.out.println(
                    "2. View Products"
            );

            System.out.println(
                    "3. Update Product"
            );

            System.out.println(
                    "4. Delete Product"
            );

            System.out.println(
                    "5. Exit"
            );

            System.out.print(
                    "Choose Option: "
            );

            int choice =
                    scanner.nextInt();

            scanner.nextLine();

            switch (choice) {

                case 1:
                    addProduct();
                    break;

                case 2:
                    service.viewProducts();
                    break;

                case 3:
                    updateProduct();
                    break;

                case 4:
                    deleteProduct();
                    break;

                case 5:
                    System.out.println(
                            "Exiting..."
                    );
                    return;

                default:
                    System.out.println(
                            "Invalid Option"
                    );
            }
        }
    }

    private void addProduct() {

        System.out.print("Name: ");
        String name =
                scanner.nextLine();

        System.out.print("Category: ");
        String category =
                scanner.nextLine();

        System.out.print("Price: ");
        double price =
                scanner.nextDouble();

        System.out.print(
                "Bestseller (true/false): "
        );

        boolean bestseller =
                scanner.nextBoolean();

        scanner.nextLine();

        System.out.print("Image URL: ");
        String image =
                scanner.nextLine();

        Product product =
                new Product(
                        null,
                        name,
                        category,
                        price,
                        bestseller,
                        image
                );

        service.addProduct(product);
    }

    private void updateProduct() {

        System.out.print(
                "Enter Product ID: "
        );

        Long id =
                scanner.nextLong();

        scanner.nextLine();

        System.out.print("Name: ");
        String name =
                scanner.nextLine();

        System.out.print("Category: ");
        String category =
                scanner.nextLine();

        System.out.print("Price: ");
        double price =
                scanner.nextDouble();

        System.out.print(
                "Bestseller (true/false): "
        );

        boolean bestseller =
                scanner.nextBoolean();

        scanner.nextLine();

        System.out.print("Image URL: ");
        String image =
                scanner.nextLine();

        Product product =
                new Product(
                        id,
                        name,
                        category,
                        price,
                        bestseller,
                        image
                );

        service.updateProduct(
                id,
                product
        );
    }

    private void deleteProduct() {

        System.out.print(
                "Enter Product ID: "
        );

        Long id =
                scanner.nextLong();

        service.deleteProduct(id);
    }
}