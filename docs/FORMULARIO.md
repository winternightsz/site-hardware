# Avaliação com Google Forms
## Estado real
A usuária criou o formulário e forneceu sua URL pública em src/config/site.ts. /avaliacao usa essa configuração única para o iframe (?embedded=true) e o link alternativo em nova aba. Não foi criado outro formulário, o script não foi executado na conta Google pelo agente e nenhuma pergunta foi alterada.

Verificação real em Edge sem autenticação: o link alternativo abriu as cinco perguntas, sem campo de e-mail. O iframe apontou para o endereço correto, mas o Google respondeu HTTP 401 e pediu login dentro da incorporação. O mesmo comportamento ocorreu com e sem referrerPolicy; a política original foi mantida. Não há evidência suficiente para atribuir a causa a uma configuração específica da conta ou do navegador. A página orienta usar a alternativa quando isso ocorrer. Não houve preenchimento nem envio de respostas. Página sem overflow horizontal em 320px.

## Histórico de criação com Apps Script — não repetir para o formulário atual
O formulário atual já existe. O roteiro abaixo é somente referência; não execute novamente para ativar o site.

1. Entre na conta Google responsável pelo projeto e abra https://script.google.com/. Clique em **Novo projeto**.
2. No editor, abra Código.gs, apague o conteúdo inicial e cole todo o arquivo scripts/criar-formulario.gs deste repositório. Dê um nome ao projeto e salve.
3. Selecione a função **criarFormulario** na lista junto de Executar. Clique em **Executar uma única vez**.
4. Quando solicitado, clique em Revisar permissões, escolha a conta e autorize o acesso solicitado ao Google Forms após conferir que é o projeto que você acabou de criar. O escopo necessário é gerenciar formulários (https://www.googleapis.com/auth/forms). Não é necessário ativar APIs avançadas, implantar aplicativo web ou criar gatilhos. Se a instituição bloquear Apps Script/autorização, use a alternativa manual ou procure o administrador; não amplie permissões da conta.
5. Aguarde a execução terminar. No **Registro de execução**, copie a **URL de edição** (restrita ao responsável) e a **URL para respondentes**. Se precisar reabrir o resultado, consulte Execuções e os logs da execução.
6. Abra a URL de edição e revise as perguntas e permissões conforme a seção seguinte.

**Executar criarFormulario novamente poderá gerar outro formulário.** Há uma única chamada FormApp.create por execução, sem controle de reutilização entre execuções. Se ocorrer erro após criar o arquivo, procure a URL de edição nos primeiros logs ou o formulário no Drive. Corrija esse formulário existente, em vez de repetir a criação. A função tenta habilitar publicação quando a API suporta; falhas são registradas e exigem revisão manual, não significam que outro arquivo deve ser criado.

## Revisar acesso antes de ativar
- Confira exatamente cinco perguntas de **Múltipla escolha**, todas com **Obrigatória** ativada, sem opção “Outro” e na ordem abaixo.
- Em **Configurações → Respostas**, mantenha coleta de endereços de e-mail desativada e **Limitar a 1 resposta** desativado (essa limitação exige login).
- Não solicite nome, matrícula ou outros dados pessoais. Não habilite resumo público das respostas. O script também desativa edição posterior e modo teste.
- Se disponível, em **Configurações → Apresentação**, ative **Desativar salvamento automático para todos os participantes**. Esse ajuste de rascunhos do Google não está exposto pelo FormApp usado no script; não é armazenamento implementado no site.
- Em **Publicar / Gerenciar acesso dos respondentes**, selecione o público pretendido, permitindo qualquer pessoa com o link para o acesso aberto do projeto. Confira se há restrição ao domínio institucional ou exigência de login e remova-a quando a política da conta permitir. Publicação sozinha não garante acesso aberto.
- Confirme que o formulário está publicado e aceitando respostas. Abra a URL de respondentes em janela anônima, sem a conta do criador, e confirme que não pede login/e-mail.
- A participação é voluntária; quem optar por responder deve preencher as cinco perguntas obrigatórias. As respostas ficam no Google Forms da conta responsável, não neste repositório ou no navegador por código do site. O Google pode processar dados técnicos conforme suas próprias políticas; não se promete anonimato absoluto.

## Perguntas exatas
| Ordem | Pergunta | Opções, nesta ordem |
| --- | --- | --- |
| 1 | Antes de acessar o site, quanto você conhecia sobre as partes de um computador? | Nada; Pouco; Razoavelmente; Muito |
| 2 | Depois de explorar o site, quanto você considera que entende sobre as funções dessas partes? | Nada; Pouco; Razoavelmente; Muito |
| 3 | As comparações com situações do cotidiano ajudaram você a compreender o conteúdo? | Nada; Pouco; Bastante; Muito |
| 4 | Foi fácil encontrar as informações que procurava no site? | Muito difícil; Difícil; Fácil; Muito fácil |
| 5 | Como você avalia o conteúdo apresentado? | Ruim; Regular; Bom; Ótimo |

## Ativar no site
1. Copie a URL **completa dos respondentes**, no formato https://docs.google.com/forms/d/e/ID_REAL/viewform (ou o formato antigo /forms/d/ID_REAL/viewform). ID_REAL apenas indica onde estará o identificador fornecido pelo Google; não é um link para usar.
2. O link real já está configurado em src/config/site.ts. Para uma eventual troca futura, altere somente googleFormsUrl. Não use URL de edição, forms.gle, HTML de iframe ou endpoint formResponse. Se só tiver um link forms.gle, abra-o no navegador e copie o endereço completo após o redirecionamento.
3. Abra /avaliacao no servidor local e confira o iframe e **Abrir formulário em outra aba**. O código gera ?embedded=true automaticamente, remove parâmetros extras e mantém a alternativa em nova aba.
4. Faça um envio de teste você mesma, confirme a mensagem final e veja a resposta na aba Respostas do formulário. Esse teste real não foi executado pelo agente. Ajuste a altura do iframe se necessário para o tema escolhido; há rolagem interna e alternativa em outra aba.
5. Execute npm test, npm run lint e npm run build após configurar. Um build existente precisa ser reconstruído para incorporar a URL. Publicação do site continua fora desta etapa.

URL vazia ou inválida mantém a mensagem honesta, sem iframe ou botão externo. Não há backend, chaves, cookies de coleta próprios, localStorage, sessionStorage ou simulação de envio. A página informa voluntariedade e o uso do serviço Google. O menu e as chamadas ao final do início/detalhes levam a /avaliacao.

## Alternativa manual — somente referência para criação futura
O formulário atual já existe; não crie outro nesta etapa. Se Apps Script não estiver disponível para um projeto futuro:
1. Abra https://forms.google.com/ com a conta responsável e crie um **Formulário em branco**.
2. Título: “Avaliação — Segmentando um Computador”. Descrição: “Participação voluntária. Cinco perguntas sobre o site, sem solicitar dados pessoais.”
3. Adicione as cinco perguntas acima, cada uma como **Múltipla escolha**, quatro opções e **Obrigatória**. Não adicione questões ou opção Outro.
4. Configure privacidade/acesso conforme a seção de revisão. Mensagem de confirmação: “Obrigado por participar! Sua avaliação ajuda a melhorar o projeto.”
5. Publique, copie a URL completa de respondentes e siga a ativação no site. Não compartilhe a URL de edição com o público.

## Referências oficiais
- [FormApp e criação](https://developers.google.com/apps-script/reference/forms/form-app).
- [Configurações e publicação pelo FormApp](https://developers.google.com/apps-script/reference/forms/form).
- [Publicação e acesso de respondentes](https://support.google.com/docs/answer/2839588).
- [Rascunhos automáticos do Google Forms](https://support.google.com/docs/answer/10952360).
Consultadas em 06/11/2026. Políticas de contas institucionais podem limitar publicação/acesso e precisam ser verificadas pelo responsável.

## Revisão de qualidade — 06/11/2026
O comportamento real foi reconferido: alternativa abriu cinco perguntas sem login e sem campo de e-mail; iframe recebeu HTTP 401/pedido de login neste ambiente. Nenhuma resposta enviada ou pergunta alterada. Os 48 testes de UI isolam Google, portanto não aprovam o acesso incorporado real. Evidências e pendências em QUALIDADE.md.
