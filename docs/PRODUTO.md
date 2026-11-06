# Produto
## Público e objetivo
Pessoas da comunidade sem conhecimento de hardware, inclusive estudantes e usuários ocasionais. Explicar o papel dos componentes, suas relações e exemplos cotidianos em português brasileiro, sem exigir vocabulário técnico.

## Não objetivos
Montagem, manutenção prática, diagnóstico, recomendações de compra, comparação de desempenho, catálogo comercial, plataforma técnica avançada, contas, backend e coleta própria de dados.

## Fluxo planejado
1. Início (/): apresenta propósito e entrada para o catálogo.
2. Componentes (/componentes): lista por função, com navegação clara.
3. Detalhe (/componentes/:slug): nome, função, analogia e seus limites, exemplo e relação com outras peças; retorno ao catálogo.
4. Avaliação (/avaliacao): participação voluntária em cinco perguntas obrigatórias de escolha única via Google Forms; URL real ativa iframe e alternativa em nova aba. Enquanto a URL estiver vazia/inválida, informa indisponibilidade. Contexto de extensão no início; /sobre não integra o escopo atual.
5. Endereço inexistente: mensagem compreensível e retorno ao início.
Fluxo implementado: início, catálogo em dois grupos, 14 detalhes, avaliação com URL real e erro de rota/slug. O iframe Google exige login neste ambiente; a alternativa em nova aba abriu as cinco questões.

## Requisitos funcionais
- RF01: navegar do início ao catálogo e aos detalhes sem recarregar a aplicação.
- RF02: explicar placa-mãe, CPU, RAM, refrigeração, vídeo, armazenamento, fonte, áudio, ventoinhas, pasta térmica, gabinete, rede, cabos e monitor.
- RF03: usar analogia seguida de explicação literal e exemplo; esclarecer RAM versus armazenamento.
- RF04: oferecer retorno e tratar slug inválido sem conteúdo vazio.
- RF05: explicar o projeto e disponibilizar avaliação somente com URL real e aprovada; sem URL, informar indisponibilidade sem botão falso.

## Requisitos não funcionais
- RNF01: HTML semântico, um h1 por página, foco visível, teclado e link para pular navegação.
- RNF02: leitura sem rolagem horizontal a 320px e com zoom de 200%; contraste de texto normal pelo menos 4,5:1.
- RNF03: textos separados da UI, componentes simples e dependências mínimas.
- RNF04: build estático, sem cadastro, cookie de coleta ou armazenamento de respostas pelo site. Com URL real configurada, respostas são enviadas diretamente pelo Google Forms, sem backend próprio.
- RNF05: lint e build aprovados; não expor a referência interna nos arquivos servidos.

## Regras de negócio
A consulta é aberta e não tem progresso obrigatório. Analogias não substituem definições. Não prometer desempenho nem quantidades mínimas para compra. Componentes integrados não devem ser apresentados como placas separadas obrigatórias. Não mencionar ou oferecer o PDF no site. Não inventar parceiros, métricas, depoimentos ou contatos. Não reutilizar ilustrações sem permissão.

## Aceite do MVP
Todos os RF implementados e revisados; cada um dos 14 temas acessível por link real; URLs inválidas tratadas; textos revisados tecnicamente; navegação por teclado e telas pequenas verificada; ausência de PDF em dist; lint/build passando. Formulário pode permanecer indisponível se isso for comunicado com clareza. Implementação e verificações automatizadas concluídas; aceite acadêmico e verificações assistivas humanas permanecem pendentes (HANDOFF.md).

## Avaliação — escopo autorizado nesta etapa
Cinco perguntas definidas pelo responsável, todas obrigatórias e de escolha única; sem campo livre, nome ou e-mail. Participar é voluntário, mas quem optar por enviar responde às cinco. Menu e fim do conteúdo têm chamada à avaliação. Formulário existente e URL real fornecidos pela responsável. Script administrativo preservado somente como referência, sem nova execução. Conferência de acesso incorporado e teste de envio/recebimento real continuam com a responsável. Detalhes exatos em FORMULARIO.md.
