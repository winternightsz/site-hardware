import { test, expect } from '@playwright/test'
import { componentes } from '../../src/data/componentes'
import { site } from '../../src/data/site'

test.beforeEach(async ({ page }) => {
  // Mantém a auditoria do aplicativo independente do Google. A conferência real é separada.
  await page.route('https://docs.google.com/forms/**', route => route.fulfill({
    contentType: 'text/html; charset=utf-8', body: '<p>Documento externo isolado na auditoria local.</p>'
  }))
})

test('metadados, links internos, imagens e console das páginas do MVP', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const paths = ['/', '/componentes', ...componentes.map(item => '/componentes/' + item.slug), '/avaliacao']
  const known = new Set(paths)
  const assets = new Set<string>(['/favicon.svg'])
  for (const path of paths) {
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
      expect(known.has(href || ''), 'Link interno: ' + href).toBe(true)
    }
    for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
      expect(await page.locator('[id="' + href?.slice(1) + '"]').count(), 'Âncora: ' + href).toBe(1)
    }
    for (const src of await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')))) {
      if (src) assets.add(src)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true)
  }
  for (const asset of assets) {
    const response = await request.get(asset)
    expect(response.ok(), asset).toBe(true)
    expect(response.headers()['content-type'], asset).toContain('image/svg+xml')
  }
  expect(errors).toEqual([])
})

test('fluxo completo, recarregamento e título com barra final', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: site.explore }).first().click()
  await page.locator('.card-link').first().click()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(componentes[0].nome)
  await page.getByRole('link', { name: site.evaluationCalloutAction }).click()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.evaluationTitle)
  for (const path of ['/componentes/', '/componentes/monitor/', '/avaliacao/']) {
    await page.goto(path)
    await expect(page).not.toHaveTitle(new RegExp(site.notFoundTitle))
  }
})

test('foco de teclado, marcadores e contraste dos textos principais', async ({ page }) => {
  await page.goto('/componentes')
  const card = page.locator('.card-link').first()
  await card.focus()
  await expect(card).toBeFocused()
  expect(await card.locator('..').evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  expect(await page.locator('.more-section ul').evaluate(element => getComputedStyle(element).listStyleType)).toBe('disc')
  const ratios = await page.evaluate(() => {
    const parse = (value: string) => value.match(/[\d.]+/g)?.map(Number) || []
    const luminance = (rgb: number[]) => rgb.slice(0, 3).map(value => {
      const channel = value / 255
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4
    }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0)
    return ['.lead', '.analogy-text', '.analogy-limit', '.more-section li', '.example-box p', '.button-primary', '.navigation a.active'].map(selector => {
      const element = document.querySelector(selector)!
      const text = parse(getComputedStyle(element).color)
      let parent: Element | null = element
      let background = [255, 255, 255]
      while (parent) {
        const color = parse(getComputedStyle(parent).backgroundColor)
        if (color.length >= 3 && (color[3] === undefined || color[3] === 1)) { background = color; break }
        parent = parent.parentElement
      }
      const a = luminance(text), b = luminance(background)
      return { selector, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) }
    })
  })
  for (const result of ratios) expect(result.ratio, result.selector).toBeGreaterThanOrEqual(4.5)
})
