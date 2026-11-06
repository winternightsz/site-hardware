import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { componentes } from '../src/data/componentes.ts'

test('textos didáticos não têm parágrafos idênticos e permanecem curtos', () => {
  const paragraphs = new Set()
  for (const item of componentes) {
    const body = [item.resumo, item.analogia, item.limiteAnalogia, item.explicacao, item.exemplo, ...item.pontosComplementares]
    for (const paragraph of body) {
      const text = paragraph.trim().replace(/\s+/g, ' ')
      assert.ok(!paragraphs.has(text), 'Parágrafo duplicado em ' + item.slug)
      paragraphs.add(text)
    }
    // Limite editorial de proteção, não avaliação automática de compreensão.
    assert.ok(body.join(' ').split(/\s+/).length <= 250, item.slug + ': conteúdo extenso')
  }
})

test('documento inclui idioma, descrição, título e favicon local', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /<html lang="pt-BR">/)
  assert.match(html, /<title>Segmentando um Computador<\/title>/)
  assert.match(html, /name="description" content="[^"]+"/)
  assert.match(html, /rel="icon" type="image\/svg\+xml" href="\/favicon.svg"/)
  assert.match(readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8'), /<svg/)
})

test('configuração Vercel aponta build estático e fallback SPA para index.html', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(config.buildCommand, 'npm run build')
  assert.equal(config.outputDirectory, 'dist')
  assert.deepEqual(config.rewrites, [{ source: '/(.*)', destination: '/index.html' }])
})
