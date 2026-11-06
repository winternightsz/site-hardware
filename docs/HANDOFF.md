# Handoff
Atualizado em 06/11/2026 após revisão de qualidade.

## O que está pronto
MVP local com início, catálogo em dois grupos, 14 detalhes preenchidos, avaliação e erro amigável de rota/slug. Fluxo Início → Componentes → Detalhes → Avaliação validado. Menu sempre disponível, foco de teclado, títulos por página, pt-BR, descrição e favicon local.
Conteúdo tipado em src/data/componentes.ts; UI em src/components e src/pages; textos de interface em src/data/site.ts. Revisão de linguagem reduziu repetições e contextualizou siglas; textos têm 90 a 155 palavras por componente (sem títulos/legendas). Análise comparativa com manual em CONTEUDO.md.
Quatorze SVGs originais locais: carregamento automatizado e inspeção visual das duas grades completos. A referência interna continua fora de Git e dist.
Toda a URL real do Google Forms permanece em src/config/site.ts. Sem backend, persistência própria de respostas, credenciais ou analytics. Sem novo Forms, alteração de perguntas ou submissão pelo agente.
vercel.json prepara npm run build, dist e rewrite para index.html. Código enviado ao GitHub com autorização explícita da usuária: https://github.com/winternightsz/site-hardware, branch main rastreando origin/main. O remoto estava vazio; o commit inicial e11e19cef5581ac2e170f5e15a47fd3df8b899f6 foi enviado e confirmado por comparação do HEAD com ls-remote. Uma atualização documental posterior registra o resultado; use git log ou a branch main do GitHub para identificar o último commit. Vercel permanece sem deploy ou configuração de conta externa.

## Verificações efetivamente executadas
- npm test: 25 testes passaram.
- npm run lint: passou.
- npm run build: passou (TypeScript e Vite).
- npm run test:build: 2 testes passaram; URLs diretas e assets no preview de produção, sem material interno no build.
- npm run test:e2e: 48 cenários passaram em Edge headless desktop 1280px e mobile emulado 320px.
- Navegador no build local: catálogo, detalhe e avaliação recarregaram; capturas das 14 ilustrações, início desktop, detalhe mobile e favicon geradas e abertas. Início mobile da suíte também inspecionado.
Os testes de UI isolam Google; não comprovam disponibilidade de Forms. Auditoria do aplicativo não encontrou erros de console, links internos inexistentes nem imagens quebradas nos percursos testados. Testes de contraste amostrados atingem pelo menos 4,5:1. Leitor de tela e zoom nativo não testados. Evidências detalhadas e limites em QUALIDADE.md.

## Google Forms — estado real
A alternativa em nova aba abriu cinco perguntas sem login e sem campo de e-mail em sessão limpa. O iframe usa a URL correta com embedded=true, mas o Google retornou HTTP 401/pedido de login dentro dele. Portanto, a incorporação anônima não está aprovada neste ambiente; a página orienta usar a alternativa.
Não foi preenchida ou enviada resposta. Falta conferir o iframe no navegador do público e, pelo responsável, um envio controlado/recebimento real. Não executar novamente criarFormulario: o formulário já existe.

## Abrir e demonstrar
```powershell
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```
Abra http://127.0.0.1:5173/. Em checkout novo, rode npm ci antes. Ctrl+C encerra o servidor.
Produção local: npm run build e depois npm run preview -- --host 127.0.0.1 --port 4173 --strictPort. Não execute preview e test:e2e simultaneamente na porta 4173.
1. Apresente o objetivo no início e clique em Explorar componentes.
2. Mostre os dois grupos e abra Memória RAM.
3. Explique a analogia da mesa e compare com o armário do armazenamento.
4. Mostre função, exemplo, complementos e navegação para outra peça.
5. Recarregue uma rota de detalhe para demonstrar acesso direto local.
6. Vá à avaliação e use Abrir formulário em outra aba caso o iframe peça login; não envie durante a apresentação.
7. Mostre o menu em tela estreita e uma rota inexistente.

## Pendências e próximo passo
- Conferir Forms no navegador do público e validar recebimento manualmente, sem recriar formulário.
- Aprovação acadêmica, nome e informações institucionais; conferir compreensão com leigos.
- Leitor de tela real, zoom nativo 200% e celular físico.
- Deploy somente com autorização explícita. Após deploy, testar o rewrite, assets e recarregamento no host real; a configuração local não comprova a hospedagem.
Leia AGENTS.md, README e docs/ antes de mudanças grandes; atualize BACKLOG/HANDOFF ao concluir tarefas. Nenhuma funcionalidade FUTURA implementada.

## Fechamento — GitHub e produção futura
Commit inicial publicado: e11e19cef5581ac2e170f5e15a47fd3df8b899f6 (feat: versão inicial do site educativo de hardware). Push normal para origin/main confirmado em 06/11/2026; remoto estava vazio e não houve alteração de histórico existente.
Nesta etapa, npm run build, npm run lint, npm test (25) e npm run test:build (2) passaram. A suíte de 48 cenários de navegador consta da revisão anterior; não foi repetida nesta entrega de versionamento/documentação, sem mudanças de UI.
Node 26.x declarado em package.json e .nvmrc; package-lock atualizado sem alterar dependências. Foram revisados os 59 arquivos incluídos; referências, extração, ferramentas internas, capturas, dependências, dist, .env e credenciais ficaram fora do Git. A documentação de manutenção foi preservada.
AGENTS.md continua consistente: este push teve autorização explícita e não concede autorização para deploy. Não foi instalada Vercel CLI, solicitada autenticação Vercel ou feita implantação. Não existe URL pública Vercel confirmada. Para publicar futuramente, seguir o roteiro manual do README e depois testar as rotas e registrar a URL real.
