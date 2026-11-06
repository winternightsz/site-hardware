import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, statSync, existsSync } from 'node:fs'
import { componentes, categorias } from '../src/data/componentes.ts'

const expected = ['placa-mae', 'processador', 'cooler', 'memoria-ram', 'placa-de-video', 'armazenamento', 'fonte-de-energia', 'placa-de-audio', 'ventoinhas', 'pasta-termica', 'gabinete', 'placa-de-rede', 'cabos', 'monitor']

test('catálogo contém exatamente os 14 temas e slugs únicos', () => {
  assert.equal(componentes.length, 14)
  assert.equal(new Set(componentes.map(item => item.slug)).size, 14)
  assert.deepEqual(componentes.map(item => item.slug).sort(), [...expected].sort())
  assert.deepEqual(categorias.map(item => item.id).sort(), ['outros', 'principais'])
  for (const categoria of categorias) {
    assert.equal(componentes.filter(item => item.categoria === categoria.id).length, 7)
  }
})

for (const componente of componentes) {
  test(componente.slug + ': campos essenciais e ilustração local válida', () => {
    for (const field of ['slug', 'nome', 'resumo', 'analogia', 'limiteAnalogia', 'explicacao', 'exemplo', 'imagem', 'alt']) {
      assert.equal(typeof componente[field], 'string', field)
      assert.ok(componente[field].trim().length > 0, field)
    }
    assert.match(componente.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(categorias.some(category => category.id === componente.categoria))
    assert.ok(componente.pontosComplementares.length >= 1 && componente.pontosComplementares.length <= 3)
    for (const point of componente.pontosComplementares) assert.ok(point.trim())
    assert.equal(componente.imagem, '/imagens/' + componente.slug + '.svg')
    const asset = new URL('../public' + componente.imagem, import.meta.url)
    assert.ok(existsSync(asset))
    const svg = readFileSync(asset, 'utf8')
    assert.match(svg, /<svg[^>]*viewBox="0 0 420 280"/)
    assert.match(svg, /<title>.+<\/title>/)
    assert.doesNotMatch(svg, /<script|<image|href=|onload=/i)
    assert.ok(statSync(asset).size < 20_000, 'asset leve')
    assert.doesNotMatch(JSON.stringify(componente), /manual\.pdf|referencias\/|https?:\/\//i)
  })
}

test('correções técnicas essenciais permanecem no conteúdo', () => {
  const bySlug = Object.fromEntries(componentes.map(item => [item.slug, JSON.stringify(item)]))
  assert.match(bySlug.processador, /ciclos por segundo/)
  assert.match(bySlug['memoria-ram'], /conteúdo é perdido/)
  assert.match(bySlug.armazenamento, /M\.2.*formato físico/)
  assert.match(bySlug['placa-de-video'], /compartilha parte da RAM/)
  assert.match(bySlug['fonte-de-energia'], /não é, por si só, uma garantia de segurança/)
})
