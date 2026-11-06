/**
 * Execute criarFormulario UMA VEZ no Google Apps Script, autenticado na sua conta.
 * Cada execução cria UM NOVO formulário. Não há gatilhos, planilhas ou envio de respostas.
 * Se ocorrer um erro após a criação, use a URL de edição registrada; não execute de novo.
 */
function criarFormulario() {
  const formulario = FormApp.create('Avaliação — Segmentando um Computador');

  // Registre imediatamente para recuperar o arquivo mesmo se uma configuração falhar.
  Logger.log('URL de edição (somente responsável): ' + formulario.getEditUrl());
  Logger.log('URL para respondentes: ' + formulario.getPublishedUrl());

  formulario
    .setDescription('Participação voluntária. Cinco perguntas sobre o site, sem solicitar dados pessoais.')
    .setConfirmationMessage('Obrigado por participar! Sua avaliação ajuda a melhorar o projeto.')
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setPublishingSummary(false)
    .setShowLinkToRespondAgain(false)
    .setShuffleQuestions(false)
    .setIsQuiz(false);

  const perguntas = [
    {
      titulo: 'Antes de acessar o site, quanto você conhecia sobre as partes de um computador?',
      opcoes: ['Nada', 'Pouco', 'Razoavelmente', 'Muito']
    },
    {
      titulo: 'Depois de explorar o site, quanto você considera que entende sobre as funções dessas partes?',
      opcoes: ['Nada', 'Pouco', 'Razoavelmente', 'Muito']
    },
    {
      titulo: 'As comparações com situações do cotidiano ajudaram você a compreender o conteúdo?',
      opcoes: ['Nada', 'Pouco', 'Bastante', 'Muito']
    },
    {
      titulo: 'Foi fácil encontrar as informações que procurava no site?',
      opcoes: ['Muito difícil', 'Difícil', 'Fácil', 'Muito fácil']
    },
    {
      titulo: 'Como você avalia o conteúdo apresentado?',
      opcoes: ['Ruim', 'Regular', 'Bom', 'Ótimo']
    }
  ];

  perguntas.forEach(function (pergunta) {
    formulario.addMultipleChoiceItem()
      .setTitle(pergunta.titulo)
      .setChoiceValues(pergunta.opcoes)
      .showOtherOption(false)
      .setRequired(true);
  });

  formulario.setAcceptingResponses(true);
  try {
    if (typeof formulario.supportsAdvancedResponderPermissions === 'function' &&
        formulario.supportsAdvancedResponderPermissions()) {
      formulario.setPublished(true);
      Logger.log('Publicação habilitada. Revise o acesso dos respondentes na URL de edição.');
    } else {
      Logger.log('Publicação via API não suportada. Confira publicação e acesso na URL de edição.');
    }
  } catch (erro) {
    Logger.log('Não foi possível habilitar a publicação automaticamente: ' + erro.message);
    Logger.log('Use a URL de edição para revisar a publicação. NÃO crie outro formulário.');
  }
  Logger.log('Cinco perguntas criadas. Confira e-mails desativados, acesso e recebimento de respostas.');
}
