package com.adminui.testing.tests;

import com.adminui.testing.base.BaseTest;
import com.adminui.testing.pages.LoginPage;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DashboardTest extends BaseTest {

    @Test
    public void verifyDashboardCardsDisplayed() {

        LoginPage loginPage = new LoginPage(driver);

        loginPage.login(
                "admin@gmail.com",
                "17Bharath@"
        );

        Assert.assertTrue(
                driver.findElement(
                        By.className("card-container")
                ).isDisplayed()
        );
    }
}