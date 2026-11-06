import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { getGoogleFormsLinks } from '../src/lib/googleForms.ts'
import { googleFormsUrl } from '../src/config/site.ts'

test('configuração pública é uma string e não exige nenhum segredo', () => {
  assert.equal(typeof googleFormsUrl, 'string')
})

test('aceita URLs completas de resposta e gera incorporação sem parâmetros extras', () => {
  for (const path of ['/forms/d/e/ID_APENAS_TESTE/viewform', '/forms/d/ID_APENAS_TESTE/viewform']) {
    const url = 'https://docs.google.com' + path
    assert.deepEqual(getGoogleFormsLinks('  ' + url + '/?usp=sharing&entry.123=teste#inicio '), {
      responseUrl: url, embedUrl: url + '?embedded=true'
    })
  }
})

test('URL vazia, de edição, encurtada ou de origem indevida não ativa a avaliação', () => {
  for (const value of ['', ' ', 'não é uma URL', 'javascript:alert(1)',
    'http://docs.google.com/forms/d/e/ID/viewform', 'https://forms.gle/TESTE',
    'https://docs.google.com/forms/d/ID/edit', 'https://docs.google.com/forms/d/ID/formResponse',
    'https://docs.google.com.evil.test/forms/d/ID/viewform',
    'https://usuario@docs.google.com/forms/d/ID/viewform',
    'https://docs.google.com:444/forms/d/ID/viewform']) {
    assert.equal(getGoogleFormsLinks(value), null, value)
  }
})

const perguntas = [
  ['Antes de acessar o site, quanto você conhecia sobre as partes de um computador?', ['Nada', 'Pouco', 'Razoavelmente', 'Muito']],
  ['Depois de explorar o site, quanto você considera que entende sobre as funções dessas partes?', ['Nada', 'Pouco', 'Razoavelmente', 'Muito']],
  ['As comparações com situações do cotidiano ajudaram você a compreender o conteúdo?', ['Nada', 'Pouco', 'Bastante', 'Muito']],
  ['Foi fácil encontrar as informações que procurava no site?', ['Muito difícil', 'Difícil', 'Fácil', 'Muito fácil']],
  ['Como você avalia o conteúdo apresentado?', ['Ruim', 'Regular', 'Bom', 'Ótimo']],
]

function simularCriacao(publicacao) {
  const state = { criacoes: 0, itens: [], configuracoes: {}, logs: [] }
  const form = {}
  for (const method of ['setDescription', 'setConfirmationMessage', 'setCollectEmail',
    'setLimitOneResponsePerUser', 'setAllowResponseEdits', 'setPublishingSummary',
    'setShowLinkToRespondAgain', 'setShuffleQuestions', 'setIsQuiz', 'setAcceptingResponses']) {
    form[method] = value => { state.configuracoes[method] = value; return form }
  }
  form.supportsAdvancedResponderPermissions = () => publicacao !== 'nao-suportada'
  form.setPublished = value => {
    if (publicacao === 'erro') throw new Error('Permissão negada no teste')
    state.configuracoes.setPublished = value
    return form
  }
  form.getEditUrl = () => 'URL_EDICAO_SIMULADA'
  form.getPublishedUrl = () => 'URL_RESPONDENTES_SIMULADA'
  form.addMultipleChoiceItem = () => {
    const data = {}
    state.itens.push(data)
    const item = {}
    for (const method of ['setTitle', 'setChoiceValues', 'showOtherOption', 'setRequired']) {
      item[method] = value => { data[method] = value; return item }
    }
    return item
  }
  const source = readFileSync(new URL('../scripts/criar-formulario.gs', import.meta.url), 'utf8')
  // Apenas serviços falsos em memória; nenhuma conexão, autenticação ou FormApp real.
  vm.runInNewContext(source + '\ncriarFormulario()', {
    FormApp: { create: title => { state.criacoes++; state.titulo = title; return form } },
    Logger: { log: value => state.logs.push(value) },
  }, { timeout: 1000 })
  return JSON.parse(JSON.stringify(state))
}

for (const modo of ['suportada', 'nao-suportada', 'erro']) {
  test('Apps Script simulado: cinco escolhas únicas obrigatórias e criação única; publicação ' + modo, () => {
    const state = simularCriacao(modo)
    assert.equal(state.criacoes, 1)
    assert.ok(state.titulo)
    assert.equal(state.itens.length, 5)
    assert.deepEqual(state.itens, perguntas.map(([title, options]) => ({
      setTitle: title, setChoiceValues: options, showOtherOption: false, setRequired: true
    })))
    assert.equal(state.configuracoes.setCollectEmail, false)
    assert.equal(state.configuracoes.setLimitOneResponsePerUser, false)
    assert.equal(state.configuracoes.setPublishingSummary, false)
    assert.equal(state.configuracoes.setShuffleQuestions, false)
    assert.equal(state.configuracoes.setAcceptingResponses, true)
    assert.ok(state.configuracoes.setDescription.includes('voluntária'))
    assert.ok(state.configuracoes.setConfirmationMessage)
    assert.ok(state.logs.some(log => log.includes('URL_EDICAO_SIMULADA')))
    assert.ok(state.logs.some(log => log.includes('URL_RESPONDENTES_SIMULADA')))
    assert.equal(state.configuracoes.setPublished, modo === 'suportada' ? true : undefined)
  })
}
