import { test, expect } from '@playwright/test'
import { componentes } from '../../src/data/componentes'
import { site } from '../../src/data/site'

test('início, menu, catálogo e imagens funcionam sem rolagem horizontal', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.title)
  await page.screenshot({ path: testInfo.outputPath('inicio.png'), fullPage: true })
  await page.getByRole('link', { name: site.explore }).first().click()
  await expect(page).toHaveURL(/\/componentes$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.catalogTitle)
  await expect(page.locator('.component-card')).toHaveCount(14)
  await expect(page.getByRole('heading', { name: 'Componentes principais' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Outros componentes' })).toBeVisible()
  // Rola até cada ilustração para carregar também as imagens lazy.
  for (const image of await page.locator('.component-card img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveJSProperty('complete', true)
    await expect(image).not.toHaveJSProperty('naturalWidth', 0)
    await expect(image).toHaveAttribute('alt', /.+/)
  }
  for (const link of await page.locator('.card-link').all()) {
    const href = await link.getAttribute('href')
    expect(componentes.some(item => href === '/componentes/' + item.slug)).toBe(true)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('catalogo.png'), fullPage: true })
  expect(errors).toEqual([])
})

for (const componente of componentes) {
  test('detalhe direto: ' + componente.slug, async ({ page }, testInfo) => {
    const response = await page.goto('/componentes/' + componente.slug)
    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(componente.nome)
    await expect(page).toHaveTitle(componente.nome + ' | ' + site.name)
    const image = page.getByRole('img', { name: componente.alt })
    await expect(image).toHaveJSProperty('complete', true)
    await expect(image).not.toHaveJSProperty('naturalWidth', 0)
    for (const heading of [site.imagine, site.purpose, site.more]) {
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    }
    await expect(page.getByRole('main')).toContainText(componente.analogia)
    await expect(page.getByRole('main')).toContainText(componente.limiteAnalogia)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const next = componentes[(componentes.indexOf(componente) + 1) % componentes.length]
    const nextLink = page.getByRole('link', { name: new RegExp(site.next) })
    await expect(nextLink).toHaveAttribute('href', '/componentes/' + next.slug)
    await nextLink.click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(next.nome)
    await expect(page.getByRole('main')).toBeFocused()
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(componente.nome)
    if (componente.slug === 'processador') {
      await page.screenshot({ path: testInfo.outputPath('detalhe.png'), fullPage: true })
    }
    await page.getByRole('link', { name: site.backToList }).last().click()
    await expect(page).toHaveURL(/\/componentes$/)
  })
}

test('avaliação informa pendência e não oferece formulário ou envio', async ({ page }) => {
  await page.route('**/src/config/site.ts*', route => route.fulfill({
    contentType: 'text/javascript', body: 'export const googleFormsUrl = ""'
  }))
  const externalRequests: string[] = []
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4173/')) externalRequests.push(request.url())
  })
  await page.goto('/avaliacao')
  await expect(page.getByRole('heading', { name: site.evaluationStatus })).toBeVisible()
  await expect(page.getByText(site.evaluationPending)).toBeVisible()
  await expect(page.locator('form, input, textarea, iframe, button[type="submit"]')).toHaveCount(0)
  expect(externalRequests).toEqual([])
  await page.getByRole('navigation', { name: site.navigation }).getByRole('link', { name: site.catalog }).click()
  await expect(page).toHaveURL(/\/componentes$/)
})

test('rotas e slugs inexistentes exibem recuperação amigável', async ({ page }) => {
  for (const route of ['/nao-existe', '/componentes/nao-existe']) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.notFoundTitle)
    await page.getByRole('link', { name: site.back, exact: true }).click()
    await expect(page).toHaveURL(/\/$/)
  }
})

test('teclado, foco e ampliação de conteúdo', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: site.skip })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await page.goto('/componentes')
  const card = page.locator('.card-link').first()
  await card.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(componentes[0].nome)
  await expect(page.getByRole('main')).toBeFocused()
  if (testInfo.project.name === 'desktop') {
    // Zoom CSS 200% para verificar reflow; não substitui zoom nativo/leitor de tela.
    await page.evaluate(() => { document.documentElement.style.zoom = '2' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
