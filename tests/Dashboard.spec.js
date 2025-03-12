import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/v1/")
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click("#login-button");

    await expect(page).toHaveURL(/inventory.html/);

})

test.describe("dashboard", () => {
    test("should contain website Title", async ({ page }) => {
        await expect(page).toHaveTitle("Swag Labs");
    })
    test("should contain logo", async ({ page }) => {
        const logo = page.locator('.app_logo');
        await expect(logo).toBeVisible();
    })

});

test.describe("products visibility tests", () => {

    // checking visibility of all products
    test("all products are visible", async ({ page }) => {
        const products = page.locator(".inventory_item");
        const productCount = await products.count();

        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            await expect(product).toBeVisible();
            console.log(`Product ${i + 1} is visible`);
        }
    });

    //checking visibility of all product images
    test("all product images are visible", async ({ page }) => {
        const productImages = page.locator(".inventory_item_img");
        const productCount = await productImages.count();

        for (let i = 0; i < productCount; i++) {
            const productImage = productImages.nth(i);
            await expect(productImage).toBeVisible();
            console.log(`Product ${i + 1} image is visible`);
        }
    });

    //checking visibility of all product names
    test("all product names are visible", async ({ page }) => {
        const productNames = page.locator(".inventory_item_name");
        const productCount = await productNames.count();

        for (let i = 0; i < productCount; i++) {
            const productName = productNames.nth(i);
            await expect(productName).toBeVisible();
            console.log(`Product ${i + 1} name is visible`);
        }
    });

    // checking visibility of all product prices
    test("all product prices are visible", async ({ page }) => {
        const productPrices = page.locator(".inventory_item_price");
        const productCount = await productPrices.count();

        for (let i = 0; i < productCount; i++) {
            const productPrice = productPrices.nth(i);
            await expect(productPrice).toBeVisible();
            console.log(`Product ${i + 1} price is visible`);
        }
    });
    
    //checking visibility of add to cart button
    test("Add to cart button is visible and functioning", async ({page})=>{
        const productButtons = page.locator(".btn_inventory");
        const productCount = await productButtons.count();

        for (let i = 0; i < productCount+1; i++) {
            const productButton = productButtons.nth(i);
            await expect(productButton).toBeVisible();
            await productButton.click();
            console.log(`products ${i + 1}`);
                       
        }
    })

});