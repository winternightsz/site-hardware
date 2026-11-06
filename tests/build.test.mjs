import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { preview } from 'vite'
import { componentes } from '../src/data/componentes.ts'

test('build distribui só assets públicos e não expõe a referência interna', () => {
  const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(new URL(entry.name + '/', directory)) : [new URL(entry.name, directory)])
  const files = walk(new URL('../dist/', import.meta.url))
  assert.ok(files.length > 14, 'Execute npm run build antes')
  for (const file of files) {
    assert.doesNotMatch(file.pathname, /\.pdf$|manual|extraido|\.gs$/i)
    if (/\.(html|js|css|svg)$/.test(file.pathname)) {
      assert.doesNotMatch(readFileSync(file, 'utf8'), /manual\.pdf|referencias\/|manual\.extraido/i)
    }
  }
})

test('preview de produção responde a URLs internas diretas e mantém SVGs/JS/CSS acessíveis', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 4187, strictPort: true } })
  const origin = 'http://127.0.0.1:4187'
  try {
    for (const path of ['/', '/componentes', '/avaliacao', '/rota-inexistente', ...componentes.map(item => '/componentes/' + item.slug)]) {
      const response = await fetch(origin + path)
      assert.equal(response.status, 200, path)
      assert.match(response.headers.get('content-type'), /text\/html/)
      assert.match(await response.text(), /<div id="root"><\/div>/)
    }
    const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
    const bundles = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1])
    assert.ok(bundles.length >= 2)
    for (const path of ['/favicon.svg', ...componentes.map(item => item.imagem), ...bundles]) {
      const response = await fetch(origin + path)
      assert.equal(response.status, 200, path)
      assert.match(response.headers.get('content-type'), path.endsWith('.svg') ? /image\/svg\+xml/ : /javascript|text\/css/)
    }
  } finally {
    await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
  }
})
