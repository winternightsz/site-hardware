# Estado atual — domínio personalizado, 25/11/2026

O checkout começou limpo e sincronizado em main, no commit 6f3c493e52e71a72c736fc391337a6999d4d5f5a. O domínio segmentandopc.mooo.com está associado ao Pages pela API; is_served_by_pages=true, certificado aprovado e HTTPS 200 servindo o HTML deste projeto foram conferidos antes de alterar a base. O registro A resolve para 185.199.108.153.

A base do Vite passou a /; HashRouter, plugins, workflow, conteúdo, imagens e Google Forms foram preservados. O teste de duplicação de base foi ajustado para também aceitar raiz. Não foi criado CNAME, pois a publicação usa Actions.

**Pendências externas:** o health do GitHub retorna is_valid=false / InvalidARecordError para o A no subdomínio, recomendando CNAME; a restrição do FreeDNS foi informada pela responsável. O serviço responde, mas não se afirma validação DNS aprovada. Certificado aprovado e HTTPS funcionando não equivalem a redirecionamento: https_enforced=false e HTTP também responde. Revisar DNS com FreeDNS e ativar Enforce HTTPS no Pages quando disponível. Nenhuma configuração externa foi alterada.

## Verificações desta entrega
- npm run build e npm run lint: aprovados.
- npm test: 27 aprovados; npm run test:build: 2 aprovados.
- npm run test:e2e -- --project=mobile --project=desktop: 52 aprovados.
- npm run test:production: 18 aprovados, nas seis larguras configuradas e com base /.
- Testes incluem recursos, navegação/recarga, teclado e overflow. Google foi interceptado; não validam permissões nem recebimento de respostas. Não houve nova inspeção visual manual de todas as páginas nesta configuração; permanecem os limites de acessibilidade e serviço externo descritos abaixo.

## Abrir e demonstrar agora
Use npm run dev -- --host 127.0.0.1 --port 5173 --strictPort e abra http://127.0.0.1:5173/#/.
Após build, npm run preview -- --host 127.0.0.1 --port 4173 --strictPort serve http://127.0.0.1:4173/#/.
URL pública esperada após o workflow: https://segmentandopc.mooo.com/#/.
Demonstre início → componentes → seções → detalhe → recarga → avaliação; confira menu estreito e teclado. Não envie respostas de demonstração.

O push autorizado nesta tarefa dispara o workflow existente. Conferir sua execução em Actions; commit e push não garantem, sozinhos, publicação concluída. Os registros de 24/11 abaixo são históricos: suas URLs com /site-hardware/ e resultados não descrevem a base atual.

---
# Handoff
Atualizado em 24/11/2026 — correções de imagens, navegação e responsividade.

## Estado real do projeto
Checkout existente em main, iniciado no commit a89d461567827fb39abff602cbcf9492a9d2a095, limpo e sincronizado com origin/main no começo. Preservados os commits do Codespaces b16fa06/a89d461, HashRouter, base Vite /site-hardware/ e .github/workflows/deploy.yml.
Hospedagem atual: GitHub Pages, com publicação automática por GitHub Actions em push para main. Vercel/BrowserRouter descrevem a preparação antiga, não a arquitetura atual. Workflow não foi alterado.
Rotas internas continuam /, /componentes, /componentes/:slug, /avaliacao e erro amigável, representadas no navegador como /site-hardware/#/.... Conteúdo educativo, 14 ilustrações, textos alternativos e configuração do Forms preservados.

## Problemas e correções
- Imagens: o commit do Codespaces já havia aplicado assetUrl na Home, nos cards e nos detalhes. Todos os arquivos existem; nenhum foi substituído. A resolução foi fortalecida para caminhos relativos, já prefixados com/sem barra inicial e vazios, preservando HTTPS, //, data:, blob: e assets Vite já resolvidos. O build foi testado no prefixo real, não na raiz.
- Seções: href="#principais"/"#outros" substituía o hash da rota e gerava 404. Novo SectionLink vincula IDs estáveis e faz foco/rolagem sem navegar. O skip link tinha o mesmo conflito e agora usa a solução compartilhada.
- Rolagem: smooth normalmente e auto com prefers-reduced-motion; margem de 2rem para o título. Cabeçalho atual é estático.
- Responsividade: trilhas da hero com minmax(0,...), filhos flex/grid com min-width:0, quebra de textos e limites de largura de botões. Sem ocultar overflow no body, sem redesign e sem novos breakpoints redundantes.
- Testes: URLs antigas de BrowserRouter/raiz substituídas por helper de base/hash. Preservadas verificações anteriores; acrescentadas seções, movimento reduzido, seis larguras e produção no preview.

## Verificações executadas
- npm run build: aprovado, TypeScript + Vite, base /site-hardware/.
- npm run lint: aprovado.
- npm test: 27 testes locais aprovados.
- npm run test:build: 2 testes aprovados, build sem referência interna e assets/HTML acessíveis no prefixo.
- npm run test:e2e: 156 cenários aprovados nas larguras 320, 375, 390, 768, 1024 e 1280px.
- npm run test:production: 18 cenários aprovados nas mesmas larguras, usando dist e preview real na subpasta.
Cobertura: todas as 14 páginas de componentes, Home, catálogo, avaliação e 404; naturalWidth > 0; links e recarga; seções por mouse/toque/teclado antes e após recarga; foco; menu; contraste amostrado; ausência de overflow horizontal; iframe/alternativa com conteúdo externo interceptado.
A primeira passagem de produção falhou em uma expectativa do teste: uma troca de hash não equivale a recarregar o documento nem reiniciar o Tab. O teste foi corrigido para fazer recarga real antes de verificar o primeiro Tab; a suíte de 18 foi repetida e passou.

## Inspeção visual e limites
Capturas de produção foram abertas: Home em 320/768/1280px, detalhe de armazenamento em 375px, 404 em 390px, avaliação em 1024px e catálogo completo em 768px. Capturas adicionais são geradas por largura em test-results/production, ignorado pelo Git.
As vistas inspecionadas mantêm imagens, proporções, menu, cores e leitura sem cortes evidentes. Não se afirma inspeção visual de toda combinação página/largura, embora todas tenham verificação automatizada de imagens/overflow.
Google foi interceptado nos testes; isso valida o encaixe e os controles do iframe, não a disponibilidade/permissões do serviço. A última conferência real documentada encontrou pedido de login no iframe e alternativa funcional. Nenhuma resposta enviada, pergunta alterada ou novo formulário criado nesta tarefa.
Leitor de tela real, zoom nativo, celular físico e aceite acadêmico continuam pendentes.

## Executar e demonstrar
```sh
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```
Abra http://127.0.0.1:5173/site-hardware/#/.
Para produção: npm run preview -- --host 127.0.0.1 --port 4173 --strictPort e abra http://127.0.0.1:4173/site-hardware/#/.
Demonstre: início → catálogo → os dois links de seção → detalhe → recarga → avaliação. Repita seções por teclado e menu em tela estreita. Não envie respostas de demonstração.

## Git, publicação e próximos passos
Commit e push para origin/main autorizados nesta tarefa, com mensagem “fix: corrigir imagens navegacao e responsividade”. Conferir o commit efetivo em git log e o resultado do workflow em Actions; push não é confirmação de deploy concluído. Não foi feita publicação manual nem alteração do workflow.
Antes de enviar, revisar diff/segredos e consultar novamente origin/main; não sobrescrever commits remotos novos. PDF, extração, node_modules, dist e capturas permanecem ignorados.
Após a execução automática, conferir o endereço real exibido em Settings → Pages, imagens e seções no site público. A confirmação de disponibilidade do Google e o teste de recebimento continuam com o responsável. Sem funcionalidades FUTURAS nesta entrega.

## Confirmação após push — 24/11/2026
Commit de correção fa359c09494395dfe6da84f4d316e0c666ca36b2 enviado a origin/main. Workflow https://github.com/winternightsz/site-hardware/actions/runs/45493493222 concluiu com success para esse commit.
A API confirmou https://winternightsz.github.io/site-hardware/. Checagem pública em Edge com largura 390px confirmou 18 imagens (Home, catálogo e primeiro detalhe), foco/rota das duas seções, recarga do detalhe e controles da avaliação, sem overflow horizontal. O conteúdo externo Google foi interceptado também nessa checagem; não houve preenchimento ou envio de respostas.
Esta confirmação é registrada em commit documental posterior; não afirma que o serviço Google foi aprovado nem altera o workflow. Após novos pushes, acompanhe a execução correspondente no Actions.
