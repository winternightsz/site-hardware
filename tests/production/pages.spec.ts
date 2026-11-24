import { test, expect } from '@playwright/test'
import { componentes } from '../../src/data/componentes'
import { site } from '../../src/data/site'
import { appUrl, basePath } from '../browser/support'

test.beforeEach(async ({ page }) => {
  await page.route('https://docs.google.com/forms/**', route => route.fulfill({
    contentType: 'text/html; charset=utf-8', body: '<p>Documento externo interceptado no teste. Nenhuma resposta enviada.</p>'
  }))
})

test('build Pages: todas as páginas, imagens e larguras sem overflow', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const paths = [
    ['/', site.title], ['/componentes', site.catalogTitle],
    ...componentes.map(item => ['/componentes/' + item.slug, item.nome]),
    ['/avaliacao', site.evaluationTitle], ['/nao-existe', site.notFoundTitle],
  ]
  for (const [route, title] of paths) {
    await page.goto(appUrl(route))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      expect(await image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      const src = await image.getAttribute('src')
      expect(src?.startsWith(basePath + 'imagens/'), src).toBe(true)
      expect(src?.includes(basePath + basePath.slice(1))).toBe(false)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
    const file = route === '/' ? 'home' : route === '/componentes' ? 'catalogo' :
      route === '/componentes/armazenamento' ? 'armazenamento' :
        route === '/avaliacao' ? 'avaliacao' : route === '/nao-existe' ? '404' : ''
    if (file) await page.screenshot({ path: testInfo.outputPath(file + '.png'), fullPage: true })
  }
  expect(errors).toEqual([])
})

test('build Pages: seções, menu, histórico e recarregamento preservam HashRouter', async ({ page }, testInfo) => {
  await page.goto(appUrl('/'))
  await page.getByRole('link', { name: site.explore }).first().click()
  for (const reload of [false, true]) {
    if (reload) await page.reload()
    const route = page.url()
    for (const id of ['principais', 'outros']) {
      const link = page.locator('.category-links a[aria-controls="' + id + '"]')
      if (testInfo.project.use.hasTouch) await link.tap()
      else await link.click()
      await expect(page).toHaveURL(route)
      await expect(page.locator('#' + id + '-titulo')).toBeInViewport()
    }
  }
  await page.locator('.card-link').first().click()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(componentes[0].nome)
  await page.getByRole('link', { name: site.evaluationCalloutAction }).click()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.evaluationTitle)
  await page.getByRole('navigation', { name: site.navigation }).getByRole('link', { name: site.home, exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.title)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.evaluationTitle)
})

test('build Pages: iframe, alternativa e teclado no caminho publicado', async ({ page }) => {
  await page.goto(appUrl('/avaliacao'))
  const iframe = page.locator('iframe')
  await expect(iframe).toHaveAttribute('src', /https:\/\/docs\.google\.com\/forms\/.+\?embedded=true$/)
  await iframe.scrollIntoViewIfNeeded()
  await expect(page.frameLocator('iframe').getByText(/Documento externo interceptado/)).toBeVisible()
  const box = await iframe.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.x).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  const alternative = page.getByRole('link', { name: site.evaluationOpen })
  await expect(alternative).toHaveAttribute('target', '_blank')
  await expect(alternative).toHaveAttribute('rel', 'noopener noreferrer')
  await page.goto(appUrl('/componentes'))
  // Uma troca de hash mantém o foco no main. Teste o primeiro Tab após recarga real.
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.catalogTitle)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: site.skip })).toBeFocused()
  const before = page.url()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await expect(page).toHaveURL(before)
})
