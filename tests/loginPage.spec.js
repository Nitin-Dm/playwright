import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
})
test.describe("loginpage", () => {
    test("should contain title", async ({ page }) => {
        await expect(page).toHaveTitle("Swag Labs");
    });
    test("input field should be visible", async ({ page }) => {

        await expect(page.locator('id=user-name')).toBeVisible();
        await expect(page.locator('id=password')).toBeVisible();
        await expect(page.locator('id=login-button')).toBeVisible();

    });
    test("when password field is empty", async ({ page }) => {

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', '');
        await page.click("#login-button");
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Password is required");

    });
    test("when username field is empty", async ({ page }) => {

        await page.fill('#user-name', '');
        await page.fill('#password', 'secret_sauce');
        await page.click("#login-button");
        
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username  is required");

    });

    test("should log in successfully with correct credentials", async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click("#login-button");

        await expect(page).toHaveURL(/inventory.html/);
    });
    test("should show error message if user doesnot exist", async ({ page }) => {
        await page.fill('#user-name', 'usernotexist@yopmail.com');
        await page.fill('#password', '123@123@123');
        await page.click("#login-button");
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username and password do not match any user in this service");
    });

    test("should show error for incorrect credentials(Correct Email with wrong password)", async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'wrongpassword');
        await page.click("#login-button");

        //  invalid creds
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username and password do not match any user in this service");
    });

    test("should show error when logging in without credentials", async ({ page }) => {
        var currentUrl = await page.url();
        await page.click("#login-button");
        var changedUrl = await page.url();
        if (currentUrl == changedUrl) {
            console.log("not issue");
        } else {
            console.log("issue");

        }

    });

});