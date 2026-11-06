# Backlog
Atualizado em 06/11/2026. P0 = fundação; P1 = essencial; P2 = opcional. Implementação e aceite humano são estados distintos.

| ID | Prioridade | Tarefa | Status | Critério verificável / evidência |
| --- | --- | --- | --- | --- |
| MVP-01 | P0 | Base Vite/React/TS, Tailwind v4 e Router declarativo na raiz | Concluído | Instalação, lint/build aprovados; BrowserRouter/Routes/Route em src/App.tsx. |
| MVP-02 | P0 | Git e proteção de referência/segredos | Concluído | Git local; check-ignore protege referencias/, .env, node_modules e dist. Branch main e origin configurados para o GitHub indicado; sem deploy do site. |
| MVP-03 | P0 | Extração e revisão inicial da referência | Concluído | 41 páginas extraídas; rastreio e correções em CONTEUDO.md. |
| MVP-04 | P0 | Documentação de produto e continuidade | Concluído | AGENTS, README e docs atualizados; QUALIDADE.md reúne evidências/limites da revisão, e HANDOFF inclui roteiro de demonstração. |
| MVP-05 | P1 | Redigir os 14 temas em src/data | Concluído | componentes.ts contém campos tipados, analogia, limite e exemplo por tema; 16 testes de dados/assets passaram. |
| MVP-06 | P1 | Catálogo e detalhes | Concluído | Dois grupos de sete cards; 14 detalhes, slug inválido tratado, retorno, próximo e histórico verificados no navegador em 1280px e 320px. |
| MVP-07 | P1 | Início e contexto do projeto | Concluído | CTA para catálogo e seção institucional no início. /sobre foi substituído pelo fluxo solicitado nesta etapa. |
| MVP-08 | P2 | Integração condicional da avaliação | Concluído | URL real fornecida pela usuária em src/config/site.ts; iframe correto e alternativa em nova aba. Link real abriu cinco perguntas sem login; iframe recebeu HTTP 401/pedido de login neste ambiente. Alternativa preservada e aviso atualizado. |
| MVP-09 | P1 | Aceite técnico e didático final | Em revisão | Adaptação e revisão pelo agente concluídas; limites/correções documentados. Orientador e público leigo ainda precisam conferir conteúdo e reconhecimento das ilustrações. |
| MVP-10 | P1 | Acessibilidade e responsividade | Parcial | Teclado, foco, ausência de overflow em 320px/desktop e reflow CSS 200% passaram; capturas e contraste das combinações principais (mínimo 5,52:1) inspecionados. Leitor de tela, zoom nativo e dispositivo físico pendentes. |
| MVP-11 | P1 | Aceite integrado | Parcial | 25 testes locais + 48 cenários de navegador + 2 verificações de build, lint/build aprovados; dist sem PDF e sem referência interna. Aceite humano de MVP-09/10 permanece pendente. |

## Revisão de qualidade — escopo atual
- QA-01 (Concluído): favicon local, marcadores de lista, títulos com barra final e revisão de linguagem/siglas. Testes e capturas em QUALIDADE.md.
- QA-02 (Concluído): configuração vercel.json e verificações de URLs/assets no preview local. Não representa deploy validado.
- QA-03 (Concluído): reconferência textual dos 14 temas versus extração do manual e inspeção das 14 ilustrações no site; limites documentados em CONTEUDO.md.
- QA-04 (Pendente — futura autorização de hospedagem): verificar recarga, assets e acesso direto no host Vercel real após deploy autorizado.

## Pendências da avaliação externa
- FORMS-01 (Concluído): script FormApp com cinco questões exatas, obrigatórias e escolha única; configurações/logs testados localmente com serviços simulados.
- FORMS-02 (Concluído): formulário existente e URL pública fornecidos pela usuária; configuração validada e build regenerado. Nenhuma nova criação ou alteração de perguntas pelo agente.
- FORMS-03 (Parcial): link real abriu cinco perguntas sem login e sem campo de e-mail em sessão limpa; iframe correto retorna HTTP 401/pedido de login neste ambiente (também sem referrerPolicy). Seis cenários isolados da integração passaram em desktop/mobile. Envio/recebimento real não testado; conferir comportamento incorporado em navegador do público. Nenhuma resposta enviada.
- Conferir imagens/textos com orientador, realizar teste com leitor de tela e zoom nativo, e registrar aceite.
- Publicação continua dependendo de autorização explícita.

## FUTURO — fora do MVP
- F01: animações didáticas opcionais com respeito a prefers-reduced-motion.
- F02: quiz curto sem cadastro, após definir finalidade pedagógica.
- F03: ilustrações interativas com alternativa textual.
- F04: evolução visual após avaliação com usuários leigos.
Os SVGs estáticos desta entrega não implementam interatividade. Nenhum item futuro foi marcado como concluído.

## Entrega no GitHub e preparação de produção
- PROD-01 (Concluído): build/lint, 25 testes locais e 2 testes do build aprovados nesta etapa; rewrite SPA preservado.
- PROD-02 (Concluído): 59 arquivos revisados sem indícios de segredos; commit inicial e11e19cef5581ac2e170f5e15a47fd3df8b899f6 com a mensagem solicitada enviado a origin/main. Hash remoto confirmado; sem force push, clone ou exclusão de histórico. Atualização documental enviada em commit separado.
- PROD-03 (Concluído): README com roteiro manual de importação GitHub → Vercel; Node 26.x alinhado com ambiente validado. Nenhuma CLI, autenticação Vercel ou implantação realizada.
