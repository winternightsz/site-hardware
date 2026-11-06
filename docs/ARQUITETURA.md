# Arquitetura
## Base e rotas
SPA estática: Vite 8, React 19, TypeScript 7, Tailwind CSS v4 e React Router 7 em modo declarativo. Versões resolvidas em package-lock.json. Tailwind integrado por @tailwindcss/vite e @import "tailwindcss", sem configuração legada v3.
src/main.tsx inicia React; src/App.tsx usa BrowserRouter/Routes/Route para /, /componentes, /componentes/:slug, /avaliacao e *. Detalhe valida slug e também usa NotFound. Os caminhos têm correspondência exata; vercel.json prepara build em dist e rewrite de SPA para index.html. Nenhum host ou conta foi configurado. A aplicação também trata barras finais nos títulos.

## Dados
src/data/componentes.ts exporta Componente, Categoria, categorias e componentes (14 entradas, sete principais e sete outros). O slug é o identificador único; não há id redundante. Campos: slug, nome, categoria, resumo, analogia, limiteAnalogia, explicacao, exemplo, pontosComplementares, imagem e alt. Um a três complementos por tema. A ordem do array define o próximo componente, com retorno ao primeiro após monitor.
src/data/site.ts concentra textos de interface. Metadados globais em index.html; títulos por rota no Layout. Conteúdo nunca depende do PDF no runtime e não carrega a extração.

## UI
- components/Layout: marca, menu de três links sempre disponível (quebra de linha no mobile), link de pular navegação, main e rodapé. NavLink marca a rota ativa. useEffect atualiza título e move o foco ao main apenas nas trocas de pathname; a primeira visita preserva a ordem de Tab.
- components/ComponentCard: card com um único link real, imagem, nome e resumo.
- pages/Home: apresentação, CTA, visão visual das funções e contexto de extensão (substitui a antiga proposta de /sobre).
- pages/Catalog: duas seções com âncoras e grade responsiva de cards.
- pages/Detail: nome → figura → analogia/limite → função/exemplo → complementos → navegação.
- pages/Evaluation: integra Google Forms condicionalmente à URL pública validada, com iframe responsivo e alternativa em outra aba. Sem URL válida, mostra pendência. components/EvaluationCallout oferece chamada ao final do início e dos detalhes.
- pages/NotFound: recuperação para início ou catálogo.

SVGs originais e independentes em public/imagens; sem fontes remotas, bibliotecas de ícones ou UI. src/index.css define tokens Tailwind v4, estilos e breakpoints 950/700/480px. Layouts usam Grid/Flex e fontes do sistema. Os blocos de conteúdo são seções semânticas, preparados para evolução sem acoplar texto a efeitos. Não existem animações nem interações de quiz nesta entrega.

## Privacidade
Sem backend, banco, autenticação, cookies de coleta ou armazenamento de respostas pelo site. Com googleFormsUrl vazia não há iframe nem requisição ao Google; com URL real configurada, o iframe carrega Google Forms e o envio ocorre somente no serviço externo. O site informa participação voluntária e ausência de solicitação de dados pessoais; não controla a persistência ou as políticas internas do Google. Não há endpoint próprio de envio. Não colocar segredos em VITE_: esses valores entram no bundle.
referencias/, .env e chaves são ignorados. Não copiar referências para public ou importá-las no código.

## Verificação e comandos
- npm run dev: Vite local.
- npm test: 25 verificações com node:test; 14 temas exatos, slugs únicos, categorias, campos essenciais, assets locais leves e correções essenciais.
- npm run lint: Oxlint sobre src, tests e configurações.
- npm run build: tsc -b e vite build, saída em dist.
- npm run test:e2e: Playwright com Edge já instalado, 48 cenários em desktop 1280px e mobile 320px. Verifica rotas reais, imagens carregadas, próximo/voltar, histórico, título, foco, teclado, ausência de overflow e estado sem coleta. Inclui reflow com zoom CSS 200%, que não substitui zoom nativo ou leitor de tela.
- npm run preview: servir build localmente.

Playwright é a única dependência nova de desenvolvimento; não entra no bundle. Testes iniciam e encerram servidor próprio em 127.0.0.1:4173; não reutilizam processos desconhecidos. Capturas em test-results/, ignoradas. PLAYWRIGHT_CHANNEL permite outro navegador instalado (padrão msedge). Navegadores adicionais são opcionais e não fazem parte do runtime.
Leitor de tela, zoom nativo, dispositivo físico e aceite acadêmico ainda exigem conferência humana. Detalhes em HANDOFF.md.

## Configuração e criação do formulário
src/config/site.ts contém a única configuração pública googleFormsUrl, já preenchida com a URL real pela usuária. src/lib/googleForms.ts aceita HTTPS de docs.google.com e apenas /forms/d/e/:id/viewform ou /forms/d/:id/viewform, rejeitando edição, encurtadores e outras origens. Normaliza sem query/fragmento e deriva ?embedded=true. Não resolve redirecionamentos nem verifica existência/publicação do formulário: isso exige o link real e revisão humana.
Iframe com largura 100%, altura 1600px, título acessível, lazy loading e alternativa target=_blank/rel=noopener noreferrer. Altura fixa com rolagem interna evita depender de acesso ao documento de outra origem; pode ser ajustada após conferir o tema real. Sem tentativa de ler respostas ou confirmação do iframe, pois são de outra origem.
scripts/criar-formulario.gs é ferramenta administrativa separada, não backend nem código enviado ao visitante. Apenas FormApp e Logger; cria um formulário por execução, sem gatilhos/planilha. A função não foi executada no Google. Testes de script usam vm com serviços simulados; testes de configuração interceptam módulo e iframe, sem submissão externa.

Verificação adicional: npm run test:build valida dist e serve preview em 4187 para consultar URLs internas e assets. Precisa de npm run build antes. QUALIDADE.md registra 25 testes locais, 48 cenários de navegador, 2 testes de build e a conferência real separada do Google.

Preparação de produção: engines.node=26.x e .nvmrc=26 alinham o runtime de build; package-lock.json preserva as versões. README detalha futura importação na Vercel (Vite, raiz ./, npm ci, npm run build, dist). Não há variáveis de ambiente obrigatórias nem implantação nesta entrega.
