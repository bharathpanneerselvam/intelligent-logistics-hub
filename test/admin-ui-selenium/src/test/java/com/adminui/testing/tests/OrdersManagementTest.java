package com.adminui.testing.tests;

import com.adminui.testing.base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.adminui.testing.pages.LoginPage;

import java.time.Duration;

public class OrdersManagementTest extends BaseTest {

    @Test
    public void verifyOrdersPageLoads() {

        LoginPage loginPage = new LoginPage(driver);

        loginPage.login(
                "admin@gmail.com",
                "17Bharath@"
        );

        WebDriverWait wait =
                new WebDriverWait(driver, Duration.ofSeconds(15));

        wait.until(
                ExpectedConditions.urlContains("/admin")
        );

        driver.get("http://localhost:5173/admin/orders");

        WebElement table = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.className("forecast-table")
                )
        );

        Assert.assertTrue(table.isDisplayed());
    }
}