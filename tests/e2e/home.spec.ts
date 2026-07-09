import { test, expect } from '@playwright/test'

test('home page loads and shows conference cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('conferences')
  await expect(page.locator('article').first()).toBeVisible()
})

test('topic filter reduces visible cards', async ({ page }) => {
  await page.goto('/')
  const totalBefore = await page.locator('article').count()
  await page.locator('#listings').getByRole('button', { name: 'Machine Learning' }).click()
  const totalAfter = await page.locator('article').count()
  expect(totalAfter).toBeGreaterThan(0)
  expect(totalAfter).toBeLessThanOrEqual(totalBefore)
})

test('detail page renders for first conference', async ({ page }) => {
  await page.goto('/c/icml-2026')
  await expect(page.locator('h1')).toContainText('ICML')
  await expect(page.getByText('Paper deadline')).toBeVisible()
})

test('subscribe page renders form', async ({ page }) => {
  await page.goto('/subscribe')
  await expect(page.getByRole('button', { name: /notify me/i })).toBeVisible()
})
