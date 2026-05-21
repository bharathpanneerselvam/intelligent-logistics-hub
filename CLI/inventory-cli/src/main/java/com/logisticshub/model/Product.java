package com.logisticshub.model;

public class Product {

    private Long id;

    private String name;

    private String category;

    private double price;

    private boolean bestseller;

    private String image;

    public Product() {
    }

    public Product(Long id,
                   String name,
                   String category,
                   double price,
                   boolean bestseller,
                   String image) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.bestseller = bestseller;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isBestseller() {
        return bestseller;
    }

    public void setBestseller(boolean bestseller) {
        this.bestseller = bestseller;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {

        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", bestseller=" + bestseller +
                ", image='" + image + '\'' +
                '}';
    }
}