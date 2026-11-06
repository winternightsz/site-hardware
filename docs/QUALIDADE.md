# Revisão de qualidade do MVP
Data: 06/11/2026. Revisão técnica local sob a perspectiva de recebimento pela equipe; não substitui aceite do orientador ou estudo com usuários.

## Correções realizadas
- Favicon SVG original local e link em index.html; idioma pt-BR, descrição e título já existiam.
- vercel.json com build, saída dist e rewrite SPA. Nenhum deploy executado.
- Títulos de /componentes/, /componentes/monitor/ e /avaliacao/ passaram a reconhecer a barra final, acompanhando as rotas aceitas pelo Router.
- Marcadores de “Saiba um pouco mais” restaurados após o reset de listas do Tailwind.
- Linguagem simplificada na placa-mãe; GPU definida antes de ser usada; explicação de vídeo integrado/dedicado mais direta; 3D e PCIe contextualizados; resolução reescrita com largura e altura; repetição na pasta térmica removida.
- README, arquitetura, produto e handoff reconciliados com a URL real já configurada e com a limitação do iframe.

## Evidências executadas nesta revisão
| Verificação | Resultado | Limite |
| --- | --- | --- |
| npm test | 25/25 passaram | Unicidade, campos, assets, URLs, metadados, SPA, limite de extensão e simulação do script; não mede compreensão. |
| npm run lint | Passou | Oxlint. |
| npm run build | Passou | TypeScript e Vite; não valida sozinho a interface. |
| npm run test:build | 2/2 passaram | Build sem PDF/referência interna, URLs diretas em HTML e assets SVG/JS/CSS acessíveis no preview local. |
| npm run test:e2e | 48/48 passaram | Edge headless em 1280×900 e emulação 320×740; Google isolado nos testes de UI. |
| Console e links próprios | Sem erros nos percursos automatizados do aplicativo | Teste percorreu início, catálogo, 14 detalhes e avaliação; Google isolado, portanto não se inclui seu HTTP 401 como sucesso. |
| Teclado/foco | Passou nos percursos automatizados | Skip link, card via Enter, foco no main após navegar e contorno visível; leitor de tela real não testado. |
| Contraste | Textos principais amostrados ≥4,5:1 | Cores computadas de lead, analogia/limite, complementos, exemplo, botão e menu ativo. Não é auditoria integral de WCAG. |
| Responsividade | Sem overflow horizontal nos percursos em 320px/1280px | Zoom CSS 200% verificado; não substitui zoom nativo e celular físico. |
| Produção no navegador | Catálogo, detalhe e avaliação recarregaram no preview | Google isolado nessa conferência; Vercel real não testada. |
| Referência interna | Ausente do build | Fonte e extração continuam ignoradas; não distribuídas. |

## Inspeção visual efetiva
Foram abertas as capturas das duas grades de cards com as 14 ilustrações, início desktop, início mobile, detalhe de armazenamento em 320px e favicon. As imagens carregaram, são coerentes com os textos alternativos e não apresentaram recortes evidentes nas vistas inspecionadas. As figuras são esquemáticas, sem escala; placa de vídeo mostra uma dedicada, rede sintetiza possibilidades e pasta térmica é um corte.
Arquivos locais ignorados em test-results/: qa-principais.png, qa-outros.png, qa-inicio-desktop.png, qa-detalhe-mobile.png e qa-favicon.png; a suíte também gera início/catalogo/detalhe em subpastas. Nova execução pode sobrescrevê-los.
Não foram inspecionadas visualmente todas as combinações possíveis de página/largura, nem as ilustrações internas do PDF página por página.

## Serviço externo real
A URL pública existe em src/config/site.ts e foi consultada com Edge em sessão limpa, sem login:
- Alternativa: abriu cinco grupos de escolha única, nenhum campo de e-mail; href, target e rel corretos.
- Iframe: endereço correto, mas Google retornou HTTP 401 e exibiu pedido de login. Isso impede aprovar o acesso incorporado anônimo neste ambiente. A alternativa continua funcional.
- Nenhuma pergunta alterada, nenhum formulário criado, nenhuma resposta preenchida/enviada.
O teste não determina a causa do bloqueio incorporado nem garante disponibilidade futura. Envio/recebimento e políticas da conta só podem ser confirmados pelo responsável.

## Pendências de aceite
1. Google: conferir iframe no navegador do público e fazer envio manual controlado se quiser validar recebimento.
2. Hospedagem: após autorização de deploy, testar URL interna direta, recarga, assets e erro amigável na Vercel. A presença de vercel.json não é evidência de deploy.
3. Acessibilidade: leitor de tela real, zoom nativo 200% e celular físico.
4. Produto: nome/informações institucionais e aceite acadêmico dos textos/imagens com público leigo.
Nenhuma pendência foi marcada como concluída sem evidência. Quiz, animações e ilustrações interativas continuam fora do escopo.
