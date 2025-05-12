import { test, expect } from '@playwright/test';

test.describe('Mobile Phone Shop E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the home page before each test
        await page.goto('http://localhost:3000');
    });

    test('should display the list of phones', async ({ page }) => {
        // Check if phones are displayed
        await expect(page.locator('.phone-card')).toHaveCount(3);

        // Check if specific phone models are displayed
        await expect(page.getByText('iPhone 16 Pro')).toBeVisible();
        await expect(page.getByText('Galaxy S25')).toBeVisible();
        await expect(page.getByText('Pixel 9 Pro XL')).toBeVisible();
    });

    test('should navigate to phone details page when a phone is clicked', async ({ page }) => {
        // Click on the iPhone card
        await page.click('text=iPhone 16 Pro');

        // Verify that we are on the details page
        await expect(page).toHaveURL(/\/phone\/iPhone%2016%20Pro/);

        // Check if details page elements are visible
        await expect(page.getByText('Apple')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'iPhone 16 Pro' })).toBeVisible();
        await expect(page.getByText('Select colour')).toBeVisible();
        await expect(page.getByText('Select capacity')).toBeVisible();
    });

    test('should update total price when storage option changes', async ({ page }) => {
        // Navigate to iPhone details page
        await page.click('text=iPhone 16 Pro');

        // Check initial price
        await expect(page.getByText('Total device cost: £904')).toBeVisible();

        // Click on storage dropdown
        await page.click('.selected-storage');

        // Select 256GB option
        await page.click('text=256GB');

        // Check if price updated
        await expect(page.getByText('Total device cost: £1004')).toBeVisible();
    });

    test('should show stock availability correctly', async ({ page }) => {
        // Navigate to iPhone details page (in stock)
        await page.click('text=iPhone 16 Pro');
        await expect(page.getByText('In stock')).toBeVisible();

        // Go back to home page
        await page.click('text=Mobile Shop');

        // Navigate to Pixel details page (out of stock)
        await page.click('text=Pixel 9 Pro XL');
        await expect(page.getByText('Out of stock')).toBeVisible();

        // Check if add to basket button is disabled
        const addToBasketButton = page.getByRole('button', { name: /Add to basket/ });
        await expect(addToBasketButton).toBeDisabled();
    });

    test('should change button state after adding to basket', async ({ page }) => {
        // Navigate to iPhone details page
        await page.click('text=iPhone 16 Pro');

        // Check initial button state
        await expect(page.getByRole('button', { name: /Add to basket/ })).toBeVisible();

        // Click add to basket
        await page.click('text=Add to basket');

        // Check if button text changed
        await expect(page.getByRole('button', { name: /Remove from basket/ })).toBeVisible();

        // Check if basket count updated in header
        await expect(page.locator('.basket-count')).toContainText('1');

        // Click remove from basket
        await page.click('text=Remove from basket');

        // Check if button text changed back
        await expect(page.getByRole('button', { name: /Add to basket/ })).toBeVisible();
    });

    test('should show color options and allow selection', async ({ page }) => {
        // Navigate to iPhone details page
        await page.click('text=iPhone 16 Pro');

        // Check initial color selection
        await expect(page.getByText('Desert Titanium')).toBeVisible();

        // Click on color dropdown
        await page.click('.selected-color');

        // Check if all color options are visible
        await expect(page.getByText('Black Titanium')).toBeVisible();
        await expect(page.getByText('Natural Titanium')).toBeVisible();
        await expect(page.getByText('White Titanium')).toBeVisible();

        // Select different color
        await page.click('text=Black Titanium');

        // Check if selection updated
        await expect(page.locator('.selected-color')).toContainText('Black Titanium');
    });

    test('should show 5G capability correctly', async ({ page }) => {
        // Check if 5G logo is visible on all cards on home page
        const fiveGLogos = page.locator('.fiveg-logo');
        await expect(fiveGLogos).toHaveCount(3);

        // Navigate to iPhone details page
        await page.click('text=iPhone 16 Pro');

        // Check if 5G logo is visible on details page
        await expect(page.locator('.fiveg-badge')).toBeVisible();
    });
});