package com.adminui.testing.tests;


import com.adminui.testing.base.BaseTest;
import com.adminui.testing.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;


public class AdminLoginTest extends BaseTest {

    @Test
    public void verifyAdminLogin() throws InterruptedException {

        LoginPage loginPage = new LoginPage(driver);

        loginPage.login(
                "admin@gmail.com",
                "17Bharath@"
        );

        Thread.sleep(5000);

        System.out.println(driver.getCurrentUrl());

        Assert.assertTrue(
                driver.getCurrentUrl().contains("/admin")
        );
    }
}