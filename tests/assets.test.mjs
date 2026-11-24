import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assetUrl } from '../src/utils/assetUrl.ts'

test('assets públicos usam a base uma única vez', () => {
  for (const path of ['/imagens/monitor.svg', 'imagens/monitor.svg', './imagens/monitor.svg',
    '/site-hardware/imagens/monitor.svg', 'site-hardware/imagens/monitor.svg']) {
    assert.equal(assetUrl(path, '/site-hardware/'), '/site-hardware/imagens/monitor.svg', path)
  }
  assert.equal(assetUrl('/imagens/monitor.svg', '/'), '/imagens/monitor.svg')
  assert.equal(assetUrl('/imagens/monitor.svg', '/outro-projeto/'), '/outro-projeto/imagens/monitor.svg')
})

test('URLs externas, dados, blob e assets Vite já resolvidos são preservados', () => {
  for (const path of ['https://example.org/image.svg', '//example.org/image.svg',
    'data:image/svg+xml;base64,PHN2Zy8+', 'blob:https://example.org/identificador',
    '/site-hardware/assets/image-hash.svg']) {
    assert.equal(assetUrl(path, '/site-hardware/'), path)
  }
  assert.equal(assetUrl('', '/site-hardware/'), '')
})
