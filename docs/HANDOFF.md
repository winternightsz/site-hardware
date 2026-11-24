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
