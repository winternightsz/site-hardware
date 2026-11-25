# Arquitetura
Atualizado em 25/11/2026. O código atual é a fonte de verdade; as decisões históricas de 06/11 estão em DECISOES.md.

## Base e publicação
React 19 + TypeScript 7 + Vite 8, Tailwind CSS v4 com @tailwindcss/vite e @import "tailwindcss". React Router 7 declarativo com HashRouter/Routes/Route em src/App.tsx.
Vite base=/. URLs no host seguem /#/componentes/:slug; a parte após # não é enviada ao servidor, permitindo recarga em hospedagem estática sem fallback de rotas no GitHub Pages.
.github/workflows/deploy.yml faz npm ci, npm run build e publica dist em GitHub Pages em pushes para main. Workflow existente preservado; não se declara conclusão de deploy sem consultar seu resultado.
Node 26.x e lockfile mantidos. vercel.json permanece como configuração legada, sem implantação Vercel ou migração nesta tarefa.

## Dados e UI
src/data/componentes.ts contém as 14 entradas (sete principais e sete outras), identificadas por slug. Campos: nome, categoria, resumo, analogia, limiteAnalogia, explicacao, exemplo, pontosComplementares, imagem e alt. Conteúdo não foi modificado nesta correção.
src/data/site.ts centraliza textos de UI; src/config/site.ts mantém a única URL pública do Forms.
Home, Catalog, Detail, Evaluation e NotFound compõem as páginas; ComponentCard e Layout são compartilhados. Layout atualiza título/foco quando o pathname interno do Router muda.

## Recursos públicos e links de seção
Home, cards e detalhes já passaram a usar assetUrl no commit a89d461. src/utils/assetUrl.ts mantém a base real do Vite e protege contra duplicação para caminhos já resolvidos com ou sem barra inicial. HTTPS, //, data: e blob: são preservados. Os dados continuam identificando arquivos de public por caminhos /imagens/...; a resolução ocorre na UI.
SectionLink usa useHref/useLocation para produzir um destino coerente com o Router e associa aria-controls ao ID. No clique normal, previne navegação, foca o destino sem rolar e chama scrollIntoView: smooth normalmente, auto com movimento reduzido. Assim o hash da rota não é substituído por #principais, #outros ou #conteudo. Funciona para skip link e catálogo; seções têm IDs estáveis, tabIndex=-1 e scroll-margin-top de 2rem. O cabeçalho atual não é fixo/sticky.
CSS preserva identidade visual; trilhas da hero usam minmax(0,...), filhos flex/grid podem encolher e textos/botões podem quebrar dentro do espaço disponível. Não há overflow-x:hidden no body.

## Formulário e privacidade
Iframe responsivo e alternativa externa com target=_blank/rel=noopener noreferrer; URL real não foi alterada. Página mantém aviso honesto para URL ausente/inválida. Sem backend, banco, autenticação, rastreamento ou armazenamento próprio de respostas.
A renderização externa e as permissões do Google não podem ser aprovadas com os testes interceptados. O script administrativo não foi executado e nenhuma resposta foi enviada nesta correção.

## Verificações
npm test cobre dados, assets, URL, metadados e script simulado. npm run lint usa Oxlint; npm run build inclui TypeScript.
playwright.config.ts usa o base do Vite e seis projetos (320/375/390/768/1024/1280px); tests/browser/support.ts centraliza URLs com hash. Testes antigos foram adaptados sem remover verificação de imagens, navegação, título, contraste e teclado.
playwright.production.config.ts inicia o preview do build na porta 4175 e usa a mesma base/larguras, com testes próprios que não dependem de módulos TS servidos pelo Vite. npm run test:production recompila antes. npm run test:build consulta arquivos e URLs de produção na porta 4187. Google é interceptado nos testes de UI.
Capturas ficam em test-results/ e não são versionadas. Resultados reais e limitações em HANDOFF.md; leitor de tela, zoom nativo e celular físico não são substituídos por emulação.

## Domínio personalizado
segmentandopc.mooo.com está associado no GitHub Pages e serve o projeto na raiz, com certificado aprovado e HTTPS 200 verificados antes da troca de base. O alerta InvalidARecordError (subdomínio com A em vez de CNAME) permanece registrado e não é confundido com validação DNS aprovada. Enforce HTTPS está desativado e depende de ajuste manual. Workflow, HashRouter e assets não foram modificados. Não há arquivo CNAME novo: a publicação usa Actions e a associação fica em Settings → Pages.
