export type Categoria = 'principais' | 'outros'

export interface Componente {
  slug: string
  nome: string
  categoria: Categoria
  resumo: string
  analogia: string
  limiteAnalogia: string
  explicacao: string
  exemplo: string
  pontosComplementares: string[]
  imagem: string
  alt: string
}

export const categorias: { id: Categoria; titulo: string; descricao: string }[] = [
  { id: 'principais', titulo: 'Componentes principais', descricao: 'As peças que conectam, processam, guardam e dão energia.' },
  { id: 'outros', titulo: 'Outros componentes', descricao: 'Conheça também o que ajuda a resfriar, proteger e conectar o computador ao mundo.' },
]

export const componentes: Componente[] = [
  {
    "slug": "placa-mae",
    "nome": "Placa-mãe",
    "categoria": "principais",
    "resumo": "O ponto de encontro das peças.",
    "analogia": "Pense em um quebra-cabeça: cada peça tem seu lugar, e o conjunto faz sentido quando elas estão conectadas.",
    "limiteAnalogia": "Os encaixes têm funções diferentes; algumas peças se conectam por cabos ou por outras placas.",
    "explicacao": "A placa-mãe é a placa que interliga os componentes do computador. Seus circuitos e conectores permitem que processador, memória e outras peças troquem dados.",
    "exemplo": "Ao abrir um documento, processador, RAM e armazenamento se comunicam por caminhos que passam pela placa-mãe.",
    "pontosComplementares": [
      "Ela possui conexões diferentes para funções diferentes, como memória, energia e dispositivos USB.",
      "Áudio e rede podem estar integrados nela, sem precisar de placas separadas."
    ],
    "imagem": "/imagens/placa-mae.svg",
    "alt": "Placa retangular com encaixe central do processador, trilhas e conectores de memória e expansão."
  },
  {
    "slug": "processador",
    "nome": "Processador",
    "categoria": "principais",
    "resumo": "Executa instruções e realiza cálculos.",
    "analogia": "Imagine o cérebro do computador, organizando e resolvendo as tarefas que você pede.",
    "limiteAnalogia": "Ele não pensa como uma pessoa: segue instruções dos programas, e divide o trabalho com outras peças.",
    "explicacao": "O processador, também chamado de CPU, executa instruções e processa dados. Ele participa de tarefas como abrir um programa, calcular uma conta e organizar o funcionamento do sistema.",
    "exemplo": "Quando você faz uma conta em uma planilha, o processador executa as instruções que calculam o resultado.",
    "pontosComplementares": [
      "Os núcleos são unidades de processamento que podem dividir tarefas, quando o programa permite.",
      "GHz mede bilhões de ciclos por segundo, não a quantidade de instruções. O desempenho também depende do projeto do processador e da tarefa.",
      "O processador possui pequenas memórias internas, como a cache, para acessar alguns dados rapidamente."
    ],
    "imagem": "/imagens/processador.svg",
    "alt": "Processador quadrado com área central e pequenos contatos ao redor."
  },
  {
    "slug": "cooler",
    "nome": "Cooler",
    "categoria": "principais",
    "resumo": "Ajuda a retirar o calor do processador.",
    "analogia": "Imagine um ventilador ajudando o cérebro do computador a não esquentar demais.",
    "limiteAnalogia": "Um cooler não é só um ventilador: ele também precisa conduzir e dissipar o calor.",
    "explicacao": "O cooler é um conjunto de refrigeração. Em um modelo a ar, uma peça metálica chamada dissipador recebe calor do processador, e uma ventoinha ajuda a levá-lo para o ar ao redor.",
    "exemplo": "Durante uma chamada de vídeo, o processador trabalha e gera calor; o sistema de refrigeração ajuda a controlar a temperatura.",
    "pontosComplementares": [
      "Há sistemas que usam líquido para transportar calor até um radiador, onde ele passa para o ar.",
      "Se a temperatura subir demais, o computador pode reduzir o desempenho ou desligar para se proteger."
    ],
    "imagem": "/imagens/cooler.svg",
    "alt": "Cooler a ar com ventoinha circular sobre aletas metálicas de um dissipador."
  },
  {
    "slug": "memoria-ram",
    "nome": "Memória RAM",
    "categoria": "principais",
    "resumo": "Mantém à mão o que está em uso agora.",
    "analogia": "A RAM é como uma mesa de trabalho: nela ficam os materiais que você está usando no momento.",
    "limiteAnalogia": "Uma mesa maior dá mais espaço, mas não torna todo trabalho mais rápido por si só.",
    "explicacao": "A memória RAM guarda temporariamente dados e programas em uso, para que o processador possa acessá-los rapidamente. Quando ela deixa de receber energia, seu conteúdo é perdido.",
    "exemplo": "Enquanto você escreve, parte do documento fica na RAM. Ao salvar, o arquivo é gravado no armazenamento.",
    "pontosComplementares": [
      "RAM e armazenamento têm funções diferentes: a RAM é o espaço de trabalho; HD e SSD conservam os arquivos sem energia.",
      "Ter mais RAM ajuda quando falta espaço para as tarefas em uso, mas não acelera automaticamente qualquer atividade."
    ],
    "imagem": "/imagens/memoria-ram.svg",
    "alt": "Módulo comprido de memória RAM com quatro chips e contatos na borda inferior."
  },
  {
    "slug": "placa-de-video",
    "nome": "Placa de vídeo",
    "categoria": "principais",
    "resumo": "Processa gráficos para formar as imagens.",
    "analogia": "Pense em um diretor de cinema que organiza cenas e efeitos para o que você vê na tela.",
    "limiteAnalogia": "Ela não decide como um diretor: executa cálculos seguindo instruções dos programas.",
    "explicacao": "A unidade de processamento gráfico, ou GPU, faz cálculos para produzir imagens. Ela pode fazer parte do processador (vídeo integrado) ou de uma placa separada (vídeo dedicado). O monitor exibe o resultado.",
    "exemplo": "Ao movimentar um objeto em um programa de imagens em três dimensões (3D), a GPU ajuda a calcular a imagem que aparece no monitor.",
    "pontosComplementares": [
      "Uma GPU integrada normalmente compartilha parte da RAM do computador. Ela não exige uma placa de vídeo separada.",
      "Uma placa dedicada geralmente tem memória própria, chamada VRAM, usada para dados gráficos.",
      "GPUs também podem executar outros tipos de cálculo, quando o programa foi preparado para isso."
    ],
    "imagem": "/imagens/placa-de-video.svg",
    "alt": "Placa de vídeo dedicada com duas ventoinhas, conector dourado e suporte lateral."
  },
  {
    "slug": "armazenamento",
    "nome": "Armazenamento: HD e SSD",
    "categoria": "principais",
    "resumo": "Conserva arquivos e programas sem energia.",
    "analogia": "HD e SSD são como armários de arquivos. O SSD costuma permitir encontrar e abrir as gavetas mais depressa.",
    "limiteAnalogia": "Os arquivos continuam guardados sem energia, mas não para sempre: dispositivos podem falhar.",
    "explicacao": "HD e SSD guardam documentos, fotos, programas e o sistema operacional. O HD usa discos magnéticos que giram; o SSD usa memória eletrônica, sem partes móveis.",
    "exemplo": "Quando você salva uma foto e desliga o computador, ela continua no HD ou SSD para ser aberta depois.",
    "pontosComplementares": [
      "O SSD geralmente reduz o tempo de iniciar o sistema e abrir arquivos, mas não determina sozinho a rapidez do computador.",
      "M.2 é um formato físico de dispositivo. Um SSD M.2 pode usar SATA ou NVMe; o formato sozinho não garante velocidade.",
      "NVMe é uma forma de comunicação usada por SSDs por meio da conexão PCIe, um caminho de dados com a placa-mãe. A velocidade varia conforme o dispositivo e a conexão."
    ],
    "imagem": "/imagens/armazenamento.svg",
    "alt": "Um HD com disco e braço de leitura, ao lado de um SSD retangular com chips."
  },
  {
    "slug": "fonte-de-energia",
    "nome": "Fonte de energia",
    "categoria": "principais",
    "resumo": "Converte e fornece energia para as peças.",
    "analogia": "Imagine um coração que distribui energia para as partes do computador funcionarem.",
    "limiteAnalogia": "Ela não bombeia um líquido: transforma energia elétrica e a fornece nas tensões necessárias.",
    "explicacao": "A fonte converte a energia elétrica da tomada em energia adequada aos componentes. Ela a distribui por cabos para a placa-mãe, os dispositivos de armazenamento e outras peças.",
    "exemplo": "Ao ligar o computador, a fonte fornece energia para que os circuitos possam funcionar.",
    "pontosComplementares": [
      "Sua capacidade de fornecer potência é expressa em watts (W). Isso não significa que o computador consuma esse valor o tempo todo.",
      "A certificação 80 PLUS indica eficiência energética em condições de teste. Ela não é, por si só, uma garantia de segurança ou de qualidade geral."
    ],
    "imagem": "/imagens/fonte-de-energia.svg",
    "alt": "Fonte em forma de caixa com grade circular de ventilação e cabos saindo de uma lateral."
  },
  {
    "slug": "placa-de-audio",
    "nome": "Placa de áudio",
    "categoria": "outros",
    "resumo": "Faz a ponte entre sinais digitais e som.",
    "analogia": "Pense em um tradutor que transforma sinais do computador em sons que você pode ouvir.",
    "limiteAnalogia": "Para o som chegar aos seus ouvidos, também é necessário um dispositivo como fone ou alto-falante.",
    "explicacao": "O circuito de áudio converte dados digitais em sinais para fones e caixas de som. Na entrada de um microfone, ele também pode converter sinais de áudio em dados para o computador.",
    "exemplo": "Ao ouvir uma música com fones conectados à saída de áudio, esse circuito participa da reprodução.",
    "pontosComplementares": [
      "Em muitos computadores, o áudio já está integrado à placa-mãe.",
      "Também existem placas e interfaces de áudio separadas, inclusive conectadas por USB."
    ],
    "imagem": "/imagens/placa-de-audio.svg",
    "alt": "Placa de áudio com chip central e três conexões circulares para áudio."
  },
  {
    "slug": "ventoinhas",
    "nome": "Ventoinhas",
    "categoria": "outros",
    "resumo": "Fazem o ar circular pelo gabinete.",
    "analogia": "É como abrir uma janela em um dia quente para deixar o ar circular.",
    "limiteAnalogia": "A ventoinha movimenta o ar; ela não produz frio como um aparelho de ar-condicionado.",
    "explicacao": "As ventoinhas ajudam a trazer ar do ambiente e a retirar ar aquecido do gabinete. Trabalham com os dissipadores e o cooler para que o calor não fique acumulado perto das peças.",
    "exemplo": "Quando o computador está trabalhando, o ar que passa pelo gabinete ajuda a levar o calor para fora.",
    "pontosComplementares": [
      "Ventoinha e cooler não são exatamente a mesma coisa: a ventoinha é uma das partes que podem compor um cooler.",
      "A circulação depende do conjunto: entradas, saídas de ar e organização interna do gabinete."
    ],
    "imagem": "/imagens/ventoinhas.svg",
    "alt": "Ventoinha quadrada de gabinete com cinco pás, centro circular e quatro furos nos cantos."
  },
  {
    "slug": "pasta-termica",
    "nome": "Pasta térmica",
    "categoria": "outros",
    "resumo": "Melhora a passagem do calor até o dissipador.",
    "analogia": "Imagine preencher pequenas falhas entre duas superfícies, como uma ponte para o calor passar.",
    "limiteAnalogia": "Ela não esfria sozinha: ajuda o calor a chegar ao sistema de refrigeração.",
    "explicacao": "A pasta térmica preenche pequenas irregularidades entre a superfície do processador e a base do dissipador. Isso melhora a transferência de calor entre eles.",
    "exemplo": "Quando o processador aquece, o calor atravessa essa interface e chega ao dissipador do cooler.",
    "pontosComplementares": [
      "Ela faz parte do contato térmico entre as superfícies, não substitui o dissipador nem a ventoinha."
    ],
    "imagem": "/imagens/pasta-termica.svg",
    "alt": "Corte esquemático de uma camada fina de pasta entre o processador e a base aletada do dissipador."
  },
  {
    "slug": "gabinete",
    "nome": "Gabinete",
    "categoria": "outros",
    "resumo": "Abriga, organiza e protege as peças.",
    "analogia": "Pense na caixa que reúne e dá lugar às peças do computador.",
    "limiteAnalogia": "O gabinete não é o computador inteiro, e seu tamanho não indica a potência da máquina.",
    "explicacao": "O gabinete é a estrutura que abriga boa parte dos componentes de um computador de mesa. Ele oferece pontos de fixação, proteção física e aberturas para a circulação de ar.",
    "exemplo": "As portas USB que você vê na frente de muitos gabinetes se ligam aos circuitos internos.",
    "pontosComplementares": [
      "Existem formatos e tamanhos diferentes, com espaços internos e conexões variados.",
      "A circulação de ar depende das aberturas e da disposição das peças, não apenas do tamanho."
    ],
    "imagem": "/imagens/gabinete.svg",
    "alt": "Gabinete de computador de mesa com painel lateral, porta frontal e aberturas de ventilação."
  },
  {
    "slug": "placa-de-rede",
    "nome": "Placa de rede",
    "categoria": "outros",
    "resumo": "Permite trocar dados com outros dispositivos.",
    "analogia": "Imagine uma ponte que liga o computador a uma rede.",
    "limiteAnalogia": "Estar conectado à rede não garante acesso à internet; isso depende da rede e do serviço disponível.",
    "explicacao": "O adaptador de rede permite enviar e receber dados. A conexão pode ser por cabo Ethernet ou sem fio, como no Wi-Fi, conforme os recursos do adaptador.",
    "exemplo": "Em uma rede doméstica, ele permite trocar dados com o roteador e, se houver acesso disponível, com a internet.",
    "pontosComplementares": [
      "A conexão de rede pode estar integrada à placa-mãe ou ser oferecida por um dispositivo separado.",
      "Uma rede também pode ser usada para compartilhar arquivos ou acessar uma impressora local, sem depender da internet."
    ],
    "imagem": "/imagens/placa-de-rede.svg",
    "alt": "Adaptador de rede com porta Ethernet, chip e antena representando uma versão com Wi-Fi."
  },
  {
    "slug": "cabos",
    "nome": "Cabos",
    "categoria": "outros",
    "resumo": "Conectam dispositivos e transportam sinais ou energia.",
    "analogia": "Pense nos caminhos que ligam as partes: cada tipo de cabo leva algo entre dois pontos.",
    "limiteAnalogia": "Nem todo caminho transporta a mesma coisa: formato e encaixe não garantem os mesmos recursos.",
    "explicacao": "Cabos fazem conexões dentro e fora do computador. Dependendo do tipo, transportam dados, imagem, som ou energia elétrica.",
    "exemplo": "Um cabo HDMI pode levar imagem e som ao monitor; um cabo Ethernet pode ligar o computador ao roteador.",
    "pontosComplementares": [
      "USB conecta dispositivos como teclado, mouse e celular; pode transportar dados e energia. O formato USB-C, sozinho, não informa velocidade ou todos os recursos.",
      "No armazenamento SATA há cabos de dados e conexões de alimentação distintas. O cabo SATA de dados não alimenta o dispositivo.",
      "HDMI transporta imagem e som; VGA transporta apenas imagem."
    ],
    "imagem": "/imagens/cabos.svg",
    "alt": "Dois cabos separados, um USB e um HDMI, com conectores estilizados."
  },
  {
    "slug": "monitor",
    "nome": "Monitor",
    "categoria": "outros",
    "resumo": "Exibe as imagens produzidas pelo computador.",
    "analogia": "Imagine uma janela para enxergar textos, imagens e vídeos que o computador prepara.",
    "limiteAnalogia": "A tela mostra o resultado, mas os cálculos e o armazenamento acontecem em outras peças.",
    "explicacao": "O monitor é um dispositivo de saída de imagem. Ele recebe um sinal de vídeo e o apresenta como pequenos pontos luminosos, chamados pixels, que formam a imagem.",
    "exemplo": "Quando você abre uma foto, o monitor exibe os pixels que permitem ver suas cores e detalhes.",
    "pontosComplementares": [
      "Resolução indica quantos pixels formam a imagem na largura e na altura. A nitidez percebida também depende do tamanho da tela e da distância de observação.",
      "A taxa de atualização, em hertz (Hz), indica quantas vezes por segundo a tela pode atualizar a imagem. A fluidez também depende do conteúdo e dos quadros produzidos pelo computador."
    ],
    "imagem": "/imagens/monitor.svg",
    "alt": "Monitor com tela azul, imagem de montanhas e suporte central sobre uma base."
  }
]
