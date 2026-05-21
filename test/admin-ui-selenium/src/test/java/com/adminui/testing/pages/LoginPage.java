package com.adminui.testing.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

    WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    By email = By.id("email");
    By password = By.id("password");
    By loginBtn = By.className("auth-submit-btn");

    public void login(String userEmail, String userPassword) {

        driver.findElement(email).sendKeys(userEmail);

        driver.findElement(password).sendKeys(userPassword);

        driver.findElement(loginBtn).click();
    }
}