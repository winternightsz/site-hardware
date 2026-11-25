# Segmentando um Computador
Site educativo sobre a função dos componentes do computador, com linguagem para iniciantes. React 19, TypeScript 7, Vite 8, Tailwind CSS v4 e React Router 7 declarativo. São 14 temas, catálogo em dois grupos, detalhes com analogias e avaliação via Google Forms. Sem tutorial de montagem, recomendações de compra, backend ou armazenamento próprio de respostas.

## Executar localmente
Use Node 26.x (package.json/.nvmrc) e, na raiz do projeto:
```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```
Abra **http://127.0.0.1:5173/#/**. Ctrl+C encerra o servidor. Não abra index.html pelo explorador de arquivos.

## Rotas e hospedagem atuais
O código usa **HashRouter**, base Vite **/** e **GitHub Pages**. Exemplos de caminhos:
- /#/ — início.
- /#/componentes — catálogo.
- /#/componentes/memoria-ram — detalhe.
- /#/avaliacao — avaliação.
O servidor recebe o caminho antes do hash, portanto recarregar uma rota interna não exige rewrite do GitHub Pages. Links de seção usam SectionLink para rolar e focar IDs existentes sem substituir o hash da rota; não use href="#principais" diretamente.

Repositório: [winternightsz/site-hardware](https://github.com/winternightsz/site-hardware), branch main.
.github/workflows/deploy.yml já publica dist no Pages em pushes para main e permite execução manual. O workflow foi preservado. Após um push, acompanhe a execução em Actions e use o endereço exibido em Settings → Pages; não trate push como confirmação de deploy concluído.
vercel.json é uma configuração legada para outro host, não o mecanismo atual de publicação. O workflow de GitHub Pages permanece sem alterações.

## Build e verificações
```sh
npm test
npm run lint
npm run build
npm run test:build
npm run test:e2e
npm run test:production
```
- test: 27 testes locais, incluindo 14 temas, campos, assets, script administrativo simulado e resolução de URLs.
- lint: Oxlint sobre código, testes e configurações.
- build: TypeScript e Vite para dist, usando a base real do Pages.
- test:build: 2 verificações de saída/arquivos e acesso HTTP no preview com base.
- test:e2e: suíte de desenvolvimento adaptada a HashRouter, preservando testes anteriores e adicionando seções/teclado/movimento reduzido. Seis larguras: 320, 375, 390, 768, 1024 e 1280px.
- test:production: recompila e testa o bundle real no preview em /, incluindo todas as páginas, naturalWidth das imagens, seções, recarga, menu e iframe isolado.

Playwright usa Edge instalado por padrão; para Chromium, instale-o com npx playwright install chromium e defina PLAYWRIGHT_CHANNEL=chromium. Não é necessário navegador de teste para usar o site. Nenhuma dependência nova foi adicionada nesta correção.
Para abrir o build manualmente:
```sh
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```
Abra **http://127.0.0.1:4173/#/**. Não mantenha preview e test:e2e simultaneamente na porta 4173. Testes de produção usam 4175; test:build usa 4187.

## Estrutura e manutenção
- src/data/componentes.ts: conteúdo tipado; src/data/site.ts: textos da interface.
- src/utils/assetUrl.ts: resolve arquivos de public com import.meta.env.BASE_URL; preserva URLs externas/embutidas e caminhos já prefixados. Não concatene a base novamente nas páginas.
- src/components/SectionLink.tsx: links internos de rolagem com foco e respeito a prefers-reduced-motion.
- src/components e src/pages: UI e composição.
- public/imagens: 14 SVGs originais; public/favicon.svg: ícone.
- src/config/site.ts: única URL pública de resposta do Google Forms.
- docs/: produto, arquitetura, rastreio editorial, decisões, backlog e handoff.
- referencias/, dist, node_modules e capturas: apenas locais, ignorados pelo Git. Não distribuir o PDF ou a extração.
- package-lock.json: dependências reproduzíveis.

Preserve os textos alternativos e as proporções das ilustrações. Os dados podem conservar /imagens/arquivo.svg como identificação do recurso; a UI deve passar esse valor por assetUrl. Imagens importadas pelo Vite já têm seu endereço resolvido; não precisam ser convertidas em caminhos de public.

## Avaliação e limites de validação
A URL real permanece configurada. Testes de UI interceptam o conteúdo externo para verificar o aplicativo sem enviar respostas ou depender da rede. Isso não valida as permissões/serviço real do Google.
A última conferência real documentada abriu as cinco perguntas na alternativa, mas recebeu HTTP 401/pedido de login no iframe. Nenhum formulário foi criado/alterado nesta correção. Conferência real de envio/recebimento, leitor de tela, zoom nativo e celular físico continuam com o responsável.
Capturas e relatórios de testes ficam em test-results/, ignorado. Resultados efetivos da entrega em docs/HANDOFF.md.

## Demonstração
1. Abra o início e clique em Explorar componentes.
2. Use os dois links de seção, inclusive após recarregar, mostrando que a rota não muda.
3. Abra Memória RAM e compare sua analogia com armazenamento.
4. Mostre ilustração, função, exemplo e próximo componente.
5. Recarregue a rota de detalhe e navegue pelo menu em tela estreita.
6. Abra a avaliação e use a alternativa caso o iframe solicite login; não envie dados durante a apresentação.
7. Confira a página amigável para uma rota inexistente.

## Domínio personalizado — 25/11/2026
Endereço: **https://segmentandopc.mooo.com/#/**. O domínio está associado ao repositório em Settings → Pages → Custom domain, conforme a API do GitHub. O HTML do projeto é servido na raiz; por isso a base do Vite agora é / e o HashRouter permanece inalterado.
Antes da mudança, foram confirmados: registro A 185.199.108.153, associação cname=segmentandopc.mooo.com na API, is_served_by_pages=true, certificado HTTPS aprovado para esse domínio e resposta HTTPS 200 com o HTML do projeto. Não se considerou apenas a resolução DNS.
**Ressalva DNS:** a checagem do GitHub retorna is_valid=false / InvalidARecordError, pois recomenda CNAME para subdomínios e encontrou A. O FreeDNS restringiu CNAME, conforme informado pela responsável. O domínio está sendo servido e possui HTTPS, mas a validação DNS não está aprovada; consultar as opções do FreeDNS permanece pendente.
**HTTPS:** certificado aprovado e resposta HTTPS confirmada, porém https_enforced=false. O acesso HTTP também responde sem redirecionar. A responsável deve conferir e ativar Enforce HTTPS em Settings → Pages quando disponível. Nenhuma configuração de conta ou DNS foi alterada pelo agente.
Não foi criado arquivo CNAME: com publicação por GitHub Actions, o domínio fica configurado em Settings → Pages. Assets de public continuam resolvidos por assetUrl e a base atual é lida pelos testes; não se altera o conteúdo educativo nem o Google Forms.
Para repetir as conferências: Resolve-DnsName segmentandopc.mooo.com -Type A; gh api repos/winternightsz/site-hardware/pages; gh api repos/winternightsz/site-hardware/pages/health. A disponibilidade externa e o estado do certificado podem mudar; consulte novamente antes de futuras mudanças de domínio.
