import { expect, test } from '@playwright/test'

test('region filter narrows the park list', async ({ page }) => {
  await page.goto('/')
  const cards = page.getByRole('article')
  await expect(cards.first()).toBeVisible()
  const total = await cards.count()

  const filter = page.getByRole('navigation', { name: 'Filter by region' })
  const west = filter.getByRole('link', { name: 'West', exact: true })
  await west.click()

  await expect(page).toHaveURL(/region=West/)
  await expect(west).toHaveAttribute('aria-current', 'page')

  expect(await cards.count()).toBeLessThanOrEqual(total)
  for (const card of await cards.all()) {
    await expect(card).toContainText('West')
  }
})

test('stats chart re-ranks on toggle and bars are keyboard focusable', async ({ page }) => {
  await page.goto('/stats')

  const toggle = page.getByRole('radiogroup', { name: 'Chart metric' })
  await expect(toggle.getByRole('radio', { name: 'Annual visitors' })).toHaveAttribute(
    'aria-checked',
    'true'
  )

  const firstBar = page.locator('svg [role="img"]').first()
  await expect(firstBar).toHaveAttribute('aria-label', /visitors$/)

  await toggle.getByRole('radio', { name: 'Acres' }).click()
  await expect(page.getByText('Ranked by acres')).toBeVisible()
  await expect(firstBar).toHaveAttribute('aria-label', /acres$/)

  await firstBar.focus()
  await expect(page.getByRole('status')).toBeVisible() // the tooltip appears on focus
})