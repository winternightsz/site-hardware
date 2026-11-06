# Conteúdo e revisão
## Fonte interna e extração
referencias/manual.pdf, 41 páginas físicas. Extração textual realizada com pypdf 7.0.0; resultado em referencias/manual.extraido.txt, ignorado pelo Git. Não houve OCR nem inspeção visual integral de diagramas. O texto foi lido; a aparência das páginas e direitos de imagens continuam pendentes. O sumário tem divergências de ordem/paginação: use as páginas físicas abaixo para rastrear a análise. Nunca servir, citar ou oferecer o arquivo no site.

## Direção editorial
Preservar abertura amigável, blocos curtos e analogias concretas. Parafrasear, definir termos na primeira ocorrência e distinguir analogia de funcionamento literal. Usar estrutura: função → analogia → limite → exemplo cotidiano → relação com outras peças. Sem tabelas de recomendação de capacidade, potência, resolução ou desempenho.
Temas: placa-mãe (pp. 3–6), CPU (7–10), cooler (11–13), RAM (14–17), vídeo (18–22), armazenamento (23–27), fonte (28–30), áudio (32), ventoinhas (33), pasta térmica (34), gabinete (35), rede (36), cabos (37–38), monitor (39–40).
A ordem do corpo prioriza conexões e processamento, memória e imagem, arquivos e energia, complementos; a futura navegação pode agrupar por função.

## Analogias a adaptar
- Placa-mãe como quebra-cabeça: enfatizar comunicação; nem tudo se encaixa diretamente nela.
- CPU como cérebro: executa instruções, não pensa como uma pessoa.
- RAM como mesa de trabalho: espaço temporário; mesa maior não acelera toda tarefa.
- Armazenamento como armário: conserva arquivos sem energia, mas não garante preservação eterna.
- GPU como diretor de cinema: processa gráficos; também pode executar outros cálculos.
- Fonte como coração: converte e fornece energia elétrica; analogia não descreve literalmente seu funcionamento.
- Rede como ponte, ventoinhas como janela: explicar troca de dados e circulação de ar sem prometer conexão à internet ou resfriamento abaixo do ambiente.

## Imprecisões e tratamento
| Páginas físicas | Ponto identificado | Tratamento editorial |
| --- | --- | --- |
| 5 | Placa-mãe controla o uso de todas as peças e recebe cada peça diretamente | Explicar interconexão; CPU, software e controladores participam; conexões podem ser indiretas. |
| 9–10 | Tudo passa pela CPU; GHz como operações/segundo; CPU não guarda informação | CPU executa instruções, mas há processamento especializado; GHz são ciclos/segundo; CPU tem registradores/cache. Não comparar desempenho só por frequência/núcleos. |
| 12–13 | Cooler reduzido a ventilador; risco de queimar como consequência automática; frase repetida sobre CPU | Explicar conjunto de dissipação e circulação de ar, inclusive líquido; superaquecimento pode levar a redução de desempenho/desligamento. Remover repetição e alarmismo. |
| 15–17 | Mais RAM sempre permite mais tarefas; MHz e recomendações de 8/16 GB | Capacidade ajuda quando há falta de memória, sem garantia universal. Omitir compra e números; se explicar DDR futuramente, diferenciar MHz de MT/s. |
| 20–22 | GPU integrada na placa-mãe como padrão; toda GPU possui VRAM; faixas de VRAM garantem classes de jogos | Em computadores atuais, GPU integrada costuma estar no processador e compartilhar RAM; dedicada geralmente usa memória própria. Remover faixas/recomendações. |
| 25–27 | Arquivos permanentes; M.2 sempre mais rápido; multiplicador fixo de NVMe | Armazenamento é não volátil, mas pode falhar. M.2 é formato e pode usar SATA ou NVMe; desempenho depende da interface e do dispositivo. |
| 30 | 80 PLUS como segurança; potências por categoria | Certificação trata de eficiência energética, não garante segurança global. Remover dimensionamento e compra. |
| 35 | Associação de tamanho do gabinete a computadores mais potentes | Tamanho/compatibilidade não equivalem a desempenho. Explicar proteção e organização. |
| 36 | Placa de rede garante acesso à internet | Adaptador conecta à rede; acesso à internet depende da rede e do serviço disponível. |
| 37–38 | SATA só dados e USB com velocidades associadas ao formato | Distinguir cabo SATA de dados e alimentação SATA; formato de conector USB não garante velocidade nem recursos. |
| 39–40 | Mais pixels sempre mais nitidez; Hz maiores sempre movimento mais suave; categorias de compra | Nitidez também depende do tamanho/distância; fluidez depende do conteúdo e dos quadros gerados. Remover recomendações. |

## Fontes primárias de checagem
Consultadas em 06/11/2026:
- [Intel: clock da CPU](https://www.intel.com/content/www/us/en/gaming/resources/cpu-clock-speed.html): ciclos e instruções não são equivalentes.
- [Kingston: M.2 SATA e NVMe](https://www.kingston.com/en/blog/pc-performance/two-types-m2-vs-ssd): formato não determina protocolo.
- [CLEAResult: programa 80 PLUS](https://www.clearesult.com/80plus/): certificação de eficiência.
Fontes reconferidas nesta etapa. Sustentam correções pontuais; o aceite técnico acadêmico permanece pendente.

## Estado do conteúdo
Os 14 temas estão redigidos em src/data/componentes.ts com resumo, analogia, limite, explicação, exemplo e um a três complementos. O slug é o identificador único. Os textos não são importados automaticamente da extração. A revisão de implementação removeu as recomendações de compra, números de desempenho e frases repetidas. Aceite do orientador e avaliação de compreensão pelo público continuam pendentes.

## Adaptação entregue no MVP
As correções da tabela anterior foram aplicadas nos dados do site, em vez de apenas deixadas como observações. Pontos centrais:
- CPU: GHz como ciclos, sem equivaler a instruções/desempenho; núcleos dependem do programa; pequenas memórias internas reconhecidas.
- RAM: temporária e volátil; salvar grava no armazenamento. Mais capacidade não acelera toda tarefa.
- Armazenamento: não volátil, sem promessa de permanência eterna; M.2 como formato e SATA/NVMe como possibilidades distintas; sem multiplicador de velocidade.
- Vídeo: integrada geralmente ao processador e compartilhando RAM; a figura representa placa dedicada, que geralmente possui VRAM.
- Fonte: conversão de energia explicitada; 80 PLUS descrito como eficiência sob teste, sem garantia geral de segurança.
- Cooler, pasta e ventoinhas: condução e dissipação de calor separadas de movimentação de ar; sem alarmismo ou passo a passo.
- Rede, cabos e monitor: rede não garante internet, USB-C não garante recursos e resolução/Hz não são promessa universal de qualidade.

## Origem das analogias e complementos
Analogias de quebra-cabeça, cérebro, ventilador, mesa, diretor, armário, coração, tradutor, janela para ventoinhas e ponte para rede foram parafraseadas da referência, com limites explicados.
Gabinete mantém a imagem de caixa. A ponte térmica da pasta amplia a explicação dos pequenos espaços do original; “caminhos” para cabos e “janela” para monitor são analogias editoriais novas, não citações nem analogias atribuídas ao manual. O original não traz uma analogia própria nesses trechos.
Os 14 exemplos cotidianos, os limites das analogias e os textos de interface são redação original desta implementação. Complementos como entrada de microfone, conversão elétrica da fonte e uso de rede local explicitam funcionamento técnico; não são transcrições do manual. Nenhuma estatística, depoimento ou resultado de pesquisa foi inventado. Validação acadêmica desses textos permanece pendente.

## Ilustrações e autorização
Não há autorização documentada de reutilização de imagens individuais do PDF. Portanto, não se tentou contornar essa restrição por recorte ou captura: optou-se pelos 14 SVGs originais permitidos no pedido. Não são imagens extraídas nem reproduções de páginas. Arquivos locais em public/imagens, cada um com título e alt correspondente nos dados. Sem marca de fabricante, scripts ou recursos externos; nenhum acima de 20 KB.
Desenhos simplificados, sem escala: todas as imagens carregaram nos testes de navegador. Foi inspecionado o catálogo completo e capturas de início e detalhe em desktop/mobile. Revisão humana recomendada para reconhecimento das peças, especialmente pasta térmica (corte), cabos (formas estilizadas), rede (representa possibilidades de conexão) e GPU (dedicada na figura).

## Revisão final manual × conteúdo do build local — 06/11/2026
A comparação foi textual, usando a extração das 41 páginas e os 14 registros atuais. “Conteúdo do site” aqui significa o build local, não publicação: nenhum deploy foi feito. Não houve nova inspeção visual integral do PDF. As 14 ilustrações do site foram vistas nas duas grades de cards, e seu carregamento/alt foi conferido nos testes.

| Tema e páginas físicas | Preservado da referência | Diferença importante no site |
| --- | --- | --- |
| Placa-mãe, 3–6 | Quebra-cabeça, conexões e comunicação | Não atribui todo controle à placa nem sugere encaixes universais; linguagem “encaixes com funções diferentes”. |
| Processador, 7–10 | Cérebro como analogia, instruções e núcleos | Não pensa como pessoa; GHz são ciclos, não instruções ou desempenho garantido; cache reconhecida. |
| Cooler, 11–13 | Ventilador e refrigeração | Inclui dissipador e transporte do calor; retira repetição sobre CPU fraca e consequência automática de queimar. |
| RAM, 14–17 | Mesa de trabalho e dados temporários | Diferencia salvar no armazenamento; retira recomendação de 8/16 GB e promessa de que mais RAM acelera tudo. |
| Vídeo, 18–22 | Diretor de cinema, gráficos e memória | Explica integrada/dedicada e compartilhamento da RAM; define GPU antes do uso e 3D no exemplo. Remove faixas de VRAM para compras. |
| HD/SSD, 23–27 | Armário, discos versus chips | Não promete conservação eterna; M.2 não equivale a NVMe nem garante velocidade. PCIe contextualizado como caminho de dados; sem multiplicador fixo. |
| Fonte, 28–30 | Coração e distribuição de energia | Explicita conversão; 80 PLUS significa eficiência sob teste, não garantia de segurança; remove potências recomendadas. |
| Áudio, 32 | Tradutor e integração à placa-mãe | Complementa entrada de microfone e necessidade de fone/alto-falante; não recomenda modelos avançados. |
| Ventoinhas, 33 | Janela e circulação de ar | Distingue ventoinha de conjunto cooler e evita sugerir geração de frio. |
| Pasta térmica, 34 | Preenchimento de microespaços e contato | Analogia de ponte é adaptação editorial; sem instruções de aplicação. Complemento repetido removido na revisão. |
| Gabinete, 35 | Caixa, tamanhos e ventilação | Sem associação de tamanho a desempenho e sem classificações de compra. |
| Rede, 36 | Ponte e troca de dados | Rede local pode funcionar sem internet; acesso à internet não é garantido pelo adaptador. |
| Cabos, 37–38 | HDMI/VGA, SATA, USB e Ethernet | “Caminhos” é analogia nova. Distingue dados/alimentação SATA e formato USB-C de recursos/velocidade. |
| Monitor, 39–40 | Pixels, resolução e taxa de atualização | “Janela” é analogia nova; resolução descrita em largura/altura. Nitidez e fluidez têm outros fatores; sem classes de compra. |

Os exemplos cotidianos e os limites das analogias são redação editorial, não transcrições. A organização em dois grupos mantém os sete primeiros temas do corpo como principais e os outros sete como complementares; não reproduz o sumário divergente nem a paginação impressa.
Os textos atuais têm 90–155 palavras por tema, contando resumo, analogia/limite, explicação, exemplo e complementos (sem título/alt/legenda). Não há parágrafos exatamente duplicados no conjunto verificado. O teste editorial admite até 250 palavras para detectar aumentos acidentais, mas não avalia compreensão automaticamente.
A aparência das figuras varia em relação às fotografias/diagramas do original: são SVGs esquemáticos novos, sem escala ou marcas. Nenhuma imagem do PDF foi incorporada. O aceite acadêmico e a compreensão por usuários leigos continuam pendentes; a revisão do agente não deve ser apresentada como validação pedagógica externa.
