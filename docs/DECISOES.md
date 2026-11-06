# Decisões
Data: 06/11/2026.

## Tomadas
- D01: SPA estática React + TypeScript/Vite na raiz, conforme solicitação; facilita continuidade acadêmica.
- D02: Tailwind v4 via plugin Vite e React Router declarativo; evita configuração legada e infraestrutura desnecessária. React Router na linha 7, com documentação da mesma versão.
- D03: nenhum backend, banco, autenticação, analytics ou serviço externo; não são necessários para leitura didática.
- D04: conteúdo em src/data e UI separada. Alterar texto não deve exigir alterar composição visual.
- D05: PDF e extração somente em referencias/, ignorados. A extração usou pypdf 7.0.0 instalado localmente nessa pasta, fora das dependências de runtime.
- D06: adaptar analogias e organização temática sem reproduzir imprecisões nem recomendações de compra; revisão em CONTEUDO.md.
- D07: etapa atual limitada à fundação e documentação. Início informativo e página inexistente comprovam composição e roteamento; catálogo e detalhes ficam no backlog.
- D08: manter Oxlint fornecido pelo template oficial; não adicionar ESLint em paralelo. TypeScript no build complementa o lint.
- D09: o gerador cancelou ao encontrar referencias/. Copiou-se o template oficial react-ts do create-vite 9.3.4 diretamente para a raiz, sem pasta de projeto aninhada e sem apagar referências.
- D10: formulário indisponível até haver URL e finalidade aprovadas; sem link fictício ou coleta local.

## Sugestões futuras (não aprovadas nem implementadas)
Animações com respeito a prefers-reduced-motion, quiz breve sem persistência, ilustrações interativas com alternativa textual e evolução visual após testes com o público. Não constituem requisitos do MVP.

## Atualização — MVP visual e educacional (06/11/2026)
- D11 (tomada): nova solicitação substitui a limitação de D07; catálogo, detalhes e avaliação pendente agora estão implementados. Contexto do projeto fica no início; /sobre não integra o fluxo atual.
- D12 (tomada): src/data/componentes.ts centraliza dados, com slug como identificador e campos extras limiteAnalogia/exemplo. Evita duplicação e permite evolução da UI sem reescrever conteúdo.
- D13 (tomada): SVGs originais locais em vez de reutilizar imagens sem autorização comprovada. Analogia e complementos editoriais novos estão identificados em CONTEUDO.md.
- D14 (tomada): menu de três links sempre disponível, com quebra no mobile, sem estado de menu ou dependência extra. Próximo componente segue a ordem editorial e volta ao primeiro.
- D15 (tomada): Playwright só em desenvolvimento para navegação real, imagens, foco, teclado e mobile. node:test cobre dados/assets sem biblioteca adicional. Edge já instalado evita baixar navegador nesta máquina.
- D16 (tomada): nenhuma integração com Google Forms agora; /avaliacao informa a configuração pendente. Revisão acadêmica e testes assistivos humanos continuam abertos, sem fingir aceite completo.

## Atualização — Google Forms condicional (06/11/2026)
- D17 (tomada): substitui o adiamento de D16: UI da integração pronta com googleFormsUrl pública e vazia em src/config/site.ts. Só URLs completas de resposta Google Forms são aceitas; iframe derivado e alternativa em nova aba.
- D18 (tomada): criar formulário via script FormApp que o responsável executa uma vez na conta, com exatamente cinco questões fornecidas. Sem acesso autenticado pelo agente, planilha, gatilho ou backend. Reexecução pode criar duplicata, explicitamente documentada.
- D19 (tomada): avisar voluntariedade e processamento no Google, sem afirmar anonimato absoluto. Não persistir respostas no código do site; permissões e rascunhos do serviço externo exigem conferência do responsável.
- D20 (tomada): validar o script por simulação local e o iframe por interceptação nos testes, sem submissão real ou URL fictícia na configuração entregue.

## Revisão de qualidade (06/11/2026)
- D21 (tomada): preparar vercel.json com build estático, dist e rewrite de SPA para index.html. Não selecionar conta, criar projeto remoto ou fazer deploy. Testes locais não substituem validar a hospedagem após autorização.
- D22 (tomada): adicionar favicon SVG original coerente com a marca e reconhecer barra final nos títulos. Restaurar marcadores dos complementos; são correções do MVP, sem novos recursos.
- D23 (tomada): reduzir repetição em pasta térmica e contextualizar GPU, 3D, PCIe e resolução para leigos; manter precisão e rastrear diferenças em CONTEUDO.md.
- D24 (tomada): usar testes leves existentes e acrescentar metadados, links, console próprio, contraste amostrado, produção local e extensão/duplicação de textos. Sem novas dependências. Relatório em QUALIDADE.md distingue teste isolado de serviço real.
- D25 (tomada): URL real já fornecida substitui o estado inicial vazio de D17. Verificação real confirma alternativa com cinco questões; iframe pede login/HTTP 401 neste ambiente. Não mascarar limitação externa nem recriar/alterar Forms; envio real permanece com o responsável.

## Envio ao GitHub — 06/11/2026
- D26 (tomada): manter o checkout existente, main e origin do repositório informado. Remoto consultado antes de enviar; nenhuma branch ou histórico remoto encontrado. Sem clone, exclusão de histórico ou force push.
- D27 (tomada): preservar docs de manutenção e testes no repositório; manter PDF, extração, ferramentas de referência, capturas e credenciais apenas locais e ignorados.
- D28 (tomada): explicitar Node 26.x em package.json/.nvmrc, versão já validada localmente e suportada para build na Vercel conforme documentação consultada. Publicação futura somente pela interface, pelo responsável; nenhuma CLI ou deploy nesta etapa.

- D29 (executada): commit inicial e11e19cef5581ac2e170f5e15a47fd3df8b899f6 enviado a origin/main e confirmado no GitHub em 06/11/2026. Documentação de fechamento em commit separado; Vercel permanece exclusivamente como preparação manual futura.
