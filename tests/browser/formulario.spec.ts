import { test, expect } from '@playwright/test'
import { site } from '../../src/data/site'

const resposta = 'https://docs.google.com/forms/d/e/ID_APENAS_TESTE_LOCAL/viewform'

test('URL configurada gera iframe responsivo e alternativa em outra aba, sem armazenamento próprio', async ({ page }) => {
  await page.route('**/src/config/site.ts*', route => route.fulfill({
    contentType: 'text/javascript', body: 'export const googleFormsUrl = ' + JSON.stringify(resposta)
  }))
  // Documento de teste interceptado; nenhum formulário real é acessado ou enviado.
  await page.route('https://docs.google.com/forms/**', route => route.fulfill({
    contentType: 'text/html; charset=utf-8', body: '<p>Conteúdo externo interceptado no teste. Nenhuma resposta enviada.</p>'
  }))
  await page.goto('/avaliacao')
  await expect(page.getByText(site.evaluationVoluntary)).toBeVisible()
  const alternative = page.getByRole('link', { name: site.evaluationOpen })
  await expect(alternative).toHaveAttribute('href', resposta)
  await expect(alternative).toHaveAttribute('target', '_blank')
  await expect(alternative).toHaveAttribute('rel', 'noopener noreferrer')
  const iframe = page.locator('iframe')
  await expect(iframe).toHaveAttribute('src', resposta + '?embedded=true')
  await expect(iframe).toHaveAttribute('title', site.evaluationFrameTitle)
  await iframe.scrollIntoViewIfNeeded()
  await expect(page.frameLocator('iframe').getByText(/Conteúdo externo interceptado/)).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })))
    .toEqual({ local: 0, session: 0 })
  await expect(page.locator('main form, main input')).toHaveCount(0)
})

test('URL inválida mantém estado honesto sem iframe ou link externo', async ({ page }) => {
  await page.route('**/src/config/site.ts*', route => route.fulfill({
    contentType: 'text/javascript', body: 'export const googleFormsUrl = "https://docs.google.com/forms/d/ID_APENAS_TESTE/edit"'
  }))
  await page.goto('/avaliacao')
  await expect(page.getByText(site.evaluationPending)).toBeVisible()
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.getByRole('link', { name: site.evaluationOpen })).toHaveCount(0)
})

test('menu e fim do conteúdo levam à avaliação', async ({ page }) => {
  await page.goto('/componentes/monitor')
  await page.getByRole('link', { name: site.evaluationCalloutAction }).click()
  await expect(page).toHaveURL(/\/avaliacao$/)
  await page.getByRole('navigation', { name: site.navigation }).getByRole('link', { name: site.home, exact: true }).click()
  await page.getByRole('link', { name: site.evaluationCalloutAction }).click()
  await expect(page).toHaveURL(/\/avaliacao$/)
})
