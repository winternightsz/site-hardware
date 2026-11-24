import { test, expect } from '@playwright/test'
import { appUrl } from './support'
import { site } from '../../src/data/site'

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test('seções preservam a rota e o foco; movimento ' + reducedMotion, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion })
    await page.goto(appUrl('/componentes'))
    await page.getByRole('heading', { name: site.catalogTitle }).waitFor()
    for (const reload of [false, true]) {
      if (reload) await page.reload()
      const initialUrl = page.url()
      for (const id of ['principais', 'outros']) {
        const link = page.locator('.category-links a[aria-controls="' + id + '"]')
        if (testInfo.project.use.hasTouch) await link.tap()
        else await link.click()
        await expect(page).toHaveURL(initialUrl)
        await expect(page.locator('#' + id)).toBeFocused()
        await expect(page.locator('#' + id + '-titulo')).toBeInViewport()
        await expect(page.getByRole('heading', { name: site.notFoundTitle })).toHaveCount(0)
        await link.focus()
        await page.keyboard.press('Enter')
        await expect(page.locator('#' + id)).toBeFocused()
        await expect(page).toHaveURL(initialUrl)
      }
    }
  })
}
