# Segmentando um Computador
Projeto universitário de extensão para explicar hardware a pessoas sem conhecimento prévio. Nome provisório. O MVP local tem 14 componentes, catálogo em dois grupos, detalhes, avaliação Google Forms e erro amigável. Não ensina montagem nem recomenda compras. Sem backend, autenticação ou armazenamento próprio de respostas. Site ainda não implantado na Vercel.

## Abrir o site
No PowerShell:
```powershell
# Na raiz deste repositório
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```
Abra **http://127.0.0.1:5173/**. Ctrl+C encerra o servidor. Se as dependências já estiverem instaladas, não precisa repetir npm ci. Não abra index.html pelo explorador.
Ambiente verificado: Node 26.13.0 e npm 11.20.0. Para reproduzir este ambiente e o build futuro da Vercel, use Node 26.x conforme package.json/.nvmrc.

## Verificar e conferir produção local
```sh
npm test
npm run lint
npm run build
npm run test:build
npm run test:e2e
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```
Abra http://127.0.0.1:4173/ para ver o build. Execute os comandos em sequência: preview e test:e2e usam a mesma porta e não devem ficar ativos ao mesmo tempo. test:build precisa de dist atualizado e usa 4187.
- npm test: 25 testes leves de conteúdo, imagens, URL, script simulado, metadados e configuração SPA.
- npm run lint: Oxlint sobre código, testes e configurações.
- npm run build: TypeScript e Vite, saída estática em dist.
- npm run test:build: 2 testes da saída e de URLs/assets no preview de produção.
- npm run test:e2e: 48 cenários de navegador em desktop 1280px e mobile emulado 320px, com Edge já instalado. Testes de UI isolam o conteúdo do Google; não provam a disponibilidade do serviço externo.

Para outro navegador suportado, instale Chromium com npx playwright install chromium e defina PLAYWRIGHT_CHANNEL=chromium antes de test:e2e. Não é necessário instalar navegador de testes para usar o site. Capturas ficam em test-results/, ignorado pelo Git.

## Rotas e organização
- /: apresentação, objetivo, catálogo e chamada à avaliação.
- /componentes: sete componentes principais e sete outros.
- /componentes/:slug: figura, analogia/limite, função, exemplo, complementos e próximo componente.
- /avaliacao: iframe e alternativa em outra aba; indisponibilidade honesta sem URL válida.
- Rotas e slugs inexistentes: página de recuperação.
- src/data/componentes.ts: conteúdo tipado; src/data/site.ts: textos de UI.
- src/config/site.ts: única URL pública de resposta do Google Forms, já configurada.
- src/components e src/pages: UI reutilizável e composição.
- public/imagens: 14 SVGs originais; public/favicon.svg: ícone local.
- docs: produto, arquitetura, backlog, decisões, conteúdo, formulário, revisão e handoff.
- referencias/: fonte interna ignorada, nunca distribuída.
- package-lock.json: versões reproduzíveis.

## Formulário e pendências
O link real em nova aba abriu as cinco perguntas sem login e sem campo de e-mail em sessão limpa. Na mesma conferência, o iframe retornou HTTP 401/pedido de login; o aviso orienta usar a alternativa. Não foi preenchida ou enviada resposta e não se alterou o formulário. Não execute o script de criação novamente.
Leitor de tela real, zoom nativo, celular físico, aceite acadêmico e recebimento de resposta real continuam pendentes. Resultados e limites em docs/QUALIDADE.md e docs/HANDOFF.md.

## SPA e futura hospedagem
vercel.json prepara npm run build, saída dist e rewrite para /index.html. Isso permite servir a aplicação em URLs internas quando implantada na Vercel. Assets existentes devem continuar sendo servidos normalmente; host diferente exige fallback equivalente.
URLs diretas e recarregamento foram verificados no preview local, não em infraestrutura Vercel. A configuração de Vercel está preparada e testada como arquivo; deploy e validação no host dependem de autorização explícita. Nenhum projeto, domínio ou deploy Vercel foi configurado.

## Demonstração rápida
1. Abra o início e explique o objetivo para leigos.
2. Clique em Explorar componentes e mostre os dois grupos.
3. Abra Memória RAM; relacione a mesa de trabalho com o armário de HD/SSD.
4. Mostre a explicação, os complementos e o botão para outra peça.
5. Recarregue a página de detalhes para demonstrar a rota direta local.
6. Vá à avaliação e abra o formulário em outra aba se o iframe pedir login; não envie respostas na demonstração.
7. Mostre o layout estreito e uma rota inexistente.

Leia AGENTS.md e todos os documentos antes de mudanças grandes. Referências de implementação: [Vite](https://vite.dev/guide/), [Tailwind v4](https://tailwindcss.com/docs/installation/using-vite), [React Router declarativo v7](https://reactrouter.com/7.18.5/start/declarative/installation) e [rewrites Vercel](https://vercel.com/docs/rewrites). Nenhuma funcionalidade FUTURA foi adicionada.

## Repositório e tecnologias
Código enviado ao repositório [winternightsz/site-hardware](https://github.com/winternightsz/site-hardware), branch principal main. Este projeto já existe na raiz do checkout; não é necessário gerar outro projeto para trabalhar nele.
Stack: React 19, TypeScript 7, Vite 8, React Router 7 em modo declarativo, Tailwind CSS v4 com @tailwindcss/vite. Oxlint, node:test e Playwright são ferramentas de desenvolvimento.
Node.js 26.x está declarado em package.json e .nvmrc para alinhar o build com o ambiente validado. package-lock.json é versionado; use npm ci para instalação reproduzível.

## Publicar futuramente pela interface da Vercel
Este roteiro é para execução manual futura; nenhum deploy foi executado pelo agente.
1. Abra https://vercel.com/ e entre na conta que será responsável pela hospedagem.
2. No painel, escolha **Add New → Project**. Conecte o GitHub, se necessário, concedendo acesso ao repositório winternightsz/site-hardware.
3. Importe **site-hardware** e confirme a branch de produção **main**.
4. Mantenha a raiz do projeto em **./** (raiz do repositório). Escolha o preset **Vite**.
5. Confira as configurações: **Install Command: npm ci**, **Build Command: npm run build**, **Output Directory: dist**, **Node.js: 26.x**. O build e o diretório de saída já estão declarados em vercel.json.
6. Não há variáveis de ambiente obrigatórias. A URL pública de resposta do Google Forms está em src/config/site.ts; não insira credenciais Google. Não envie a pasta referencias/.
7. Somente quando decidir publicar, clique em **Deploy** e aguarde o build. Copie a URL de produção exibida no painel; não há URL Vercel confirmada antes disso.
8. Abra a URL e teste /, /componentes, /componentes/memoria-ram e /avaliacao. Recarregue cada rota interna para conferir o rewrite de SPA. Confira imagens, favicon e a alternativa do formulário; o iframe pode exigir login conforme o ambiente.
9. Registre a URL e o resultado dessas verificações em docs/HANDOFF.md. Após a integração GitHub/Vercel, novos pushes em main podem gerar implantações automáticas conforme as configurações do projeto.

Não é necessário usar Vercel CLI. O rewrite já existente corresponde à recomendação para [Vite SPA na Vercel](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas). A versão do Node pode ser conferida na [documentação de versões suportadas](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Arquivos que permanecem apenas locais
.gitignore exclui referencias/ (PDF, texto extraído e ferramenta de extração), node_modules/, dist/, capturas/relatórios de teste, .env, chaves, arquivos de credenciais e estado local de ferramentas. Os documentos em docs/, AGENTS.md e scripts/criar-formulario.gs são necessários para manutenção, rastreio editorial e testes; serão preservados no repositório. O script administrativo não entra no build nem deve ser executado novamente para o formulário existente.
