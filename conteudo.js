// Arquivo com todo o conteúdo estruturado da revista, exatamente como fornecido
const CONTEUDO = {
  geral: {
    id: "geral",
    nome: "Geral",
    regras: [
      "Ao terminar qualquer passo, mande a mensagem no grupo."
    ],
    fluxo: [
      "Redator entrega o texto completo (título, subtítulo, legendas sugeridas e fontes).",
      "Direção geral aprova o conteúdo.",
      "Revisor corrige o português.",
      "Designer faz o esboço na página mestra.",
      "Fotógrafo escolhe ou ajusta as imagens olhando o esboço.",
      "Direção geral e editor chefe aprovam o esboço.",
      "Designer detalha a página.",
      "Revisor confere a página pronta (erros novos aparecem depois da diagramação).",
      "Editor chefe registra tudo no diário de bordo."
    ]
  },
  designer: {
    id: "designer",
    nome: "Designer",
    paletaCores: {
      cores: [
        { nome: "Carvão azulado", hex: "#0B0F1A", descricao: "fundo" },
        { nome: "Azul marinho escuro", hex: "#151C2E", descricao: "superfícies" },
        { nome: "Ciano", hex: "#00E5FF", descricao: "destaque principal" },
        { nome: "Violeta", hex: "#8B5CF6", descricao: "destaque secundário" },
        { nome: "Branco gelo", hex: "#F2F6FA", descricao: "texto" },
        { nome: "Cinza azulado", hex: "#8A94A6", descricao: "texto secundário" },
        { nome: "Rosa neon", hex: "#FF3D81", descricao: "detalhes pontuais" }
      ],
      regras: "Proporção: 60% escuros, 30% brancos e cinzas, 10% destaques. Matérias longas em página clara (fundo #F2F6FA, texto #0B0F1A). Fundo escuro só para capa, aberturas de seção e anúncios."
    },
    passos: [
      {
        id: "v2_designer_p1",
        titulo: "Passo 1: Criar o documento base e as margens",
        espera: false,
        atencao: "O Affinity Designer 2 antigo não tem páginas mestras. Isso existe no app novo e gratuito chamado Affinity (estúdio de layout). Confirme com o editor chefe se o professor aceita o app novo. Se não aceitar, cada página vira uma prancheta, e o passo 6 muda para \"criar uma prancheta modelo e duplicar\".",
        oQueFazer: "Deixar o arquivo pronto para todas as páginas nascerem padronizadas.",
        comoFazer: [
          "Crie um documento novo em A4 (210 x 297 mm), 300 DPI.",
          "Configure sangria de 3 mm em todos os lados.",
          "Defina margens internas entre 12 e 15 mm e escolha um valor só. Use o mesmo na revista inteira.",
          "Se for fazer páginas duplas, configure o documento como páginas opostas (a página 1 fica sozinha, 2 e 3 formam a primeira dupla, e assim por diante).",
          "Salve como NextGenInsights_v1 na pasta compartilhada."
        ],
        mensagem: "Documento base criado: A4, 300 DPI, sangria 3 mm, margens [valor] mm. Está na pasta compartilhada como [nome do arquivo]."
      },
      {
        id: "v2_designer_p2",
        titulo: "Passo 2: Salvar as cores",
        espera: false,
        oQueFazer: "Deixar a paleta pronta para ninguém usar cor fora do padrão.",
        comoFazer: [
          "Abra o painel de amostras (Swatches) e crie uma paleta chamada NextGen.",
          "Cadastre as 7 cores com os nomes e códigos da paleta.",
          "Confira os códigos digitando o hexadecimal, não escolhendo no olho.",
          "Faça um quadradinho de teste de cada cor numa página de rascunho para ver como ficam impressas ou na tela."
        ],
        mensagem: "Paleta salva no arquivo com as 7 cores. Quem precisar de alguma cor em imagem ou anúncio, use exatamente os códigos da aba Designer."
      },
      {
        id: "v2_designer_p3",
        titulo: "Passo 3: Definir as 2 fontes",
        espera: false,
        oQueFazer: "Escolher uma fonte para títulos e outra para textos.",
        comoFazer: [
          "Escolha uma fonte de título com personalidade tecnológica e uma de texto fácil de ler em tamanho pequeno.",
          "Confira se as duas têm licença gratuita e suportam acentos e cedilha do português.",
          "Teste com a frase \"Inteligência artificial, ação, coração e não\" para ver se os acentos saem corretos.",
          "Mostre as opções para direção geral e editor chefe antes de fechar.",
          "Anote o nome das fontes e o motivo da escolha para o diário de bordo."
        ],
        mensagem: "Fontes definidas: título [nome da fonte], texto [nome da fonte]. Instalem as duas para abrir os arquivos sem erro."
      },
      {
        id: "v2_designer_p4",
        titulo: "Passo 4: Grade de colunas",
        espera: false,
        oQueFazer: "Criar a estrutura que alinha todos os textos e imagens.",
        comoFazer: [
          "Defina a quantidade de colunas (por exemplo, 3 colunas para matérias, com um espaço fixo entre colunas).",
          "Configure as guias no documento.",
          "Faça um pequeno modelo mostrando onde ficam título, texto, legenda e imagem."
        ],
        mensagem: "Grade pronta: [número] colunas com [valor] mm de espaço entre elas. Todo mundo que mandar imagem, pense em ocupar 1, 2 ou 3 colunas."
      },
      {
        id: "v2_designer_p5",
        titulo: "Passo 5: Estilos de texto",
        espera: false,
        oQueFazer: "Criar a hierarquia visual que a revista toda vai seguir.",
        comoFazer: "Crie estilos salvos para título da matéria, subtítulo, intertítulo, texto corrido, legenda, crédito da foto, citação em destaque, número de página e chamada de capa. Defina tamanho, entrelinha e cor de cada um. O título é bem maior que o subtítulo, que é maior que o texto. Aplique sempre pelo estilo, nunca à mão.",
        mensagem: "Estilos de texto criados. A partir de agora, todo texto na revista usa esses estilos."
      },
      {
        id: "v2_designer_p6",
        titulo: "Passo 6: Páginas mestras (uma clara e uma escura)",
        espera: false,
        oQueFazer: "Criar as duas bases onde todas as páginas serão montadas.",
        comoFazer: [
          "Crie a mestra clara: fundo #F2F6FA, texto #0B0F1A, número de página automático.",
          "Crie a mestra escura: fundo #0B0F1A, texto #F2F6FA, número de página automático.",
          "Coloque o número no mesmo lugar nas duas, dentro das margens.",
          "Teste com uma página dupla para conferir o encontro das páginas no meio."
        ],
        mensagem: "Páginas mestras prontas (clara e escura) com numeração automática."
      },
      {
        id: "v2_designer_p7",
        titulo: "Passo 7: Logo da revista",
        espera: false,
        oQueFazer: "Criar o logo NextGen Insights.",
        comoFazer: "Faça versões para fundo escuro e fundo claro. Use ciano e violeta com moderação. Teste em tamanho pequeno para ver se continua legível. Exporte em PNG com fundo transparente e salve também o original editável.",
        mensagem: "Logo pronto em duas versões, escura e clara. Estão na pasta compartilhada."
      },
      {
        id: "v2_designer_p8",
        titulo: "Passo 8: Esboços das páginas",
        espera: true,
        antes: "Esperar o texto da matéria estar aprovado pela direção geral e revisado pelo revisor.",
        oQueFazer: "Montar a estrutura de cada página sem acabamento.",
        comoFazer: "Aplique a mestra correta, coloque título, texto e espaços reservados para as imagens. Mostre o esboço ao fotógrafo para ele escolher as imagens. Depois peça aprovação à direção geral e ao editor chefe.",
        mensagem: "Esboço da [matéria ou página] pronto. Fotógrafo, veja o espaço das imagens. Direção geral e editor chefe, aprovem por favor."
      },
      {
        id: "v2_designer_p9",
        titulo: "Passo 9: Detalhar as páginas",
        espera: true,
        antes: "Esboço aprovado e imagens entregues.",
        oQueFazer: "Trocar os espaços reservados por imagens finais, ajustar espaçamentos, destaques e detalhes visuais.",
        comoFazer: "Insira as imagens, confira os créditos na legenda, alinhe tudo à grade e confira as margens. Mantenha a cor de destaque em quantidade pequena. Depois chame o revisor para conferir a página pronta.",
        mensagem: "Página [número] detalhada. Revisor, pode conferir."
      },
      {
        id: "v2_designer_p10",
        titulo: "Passo 10: Anúncios e infográfico (junto com o fotógrafo)",
        espera: true,
        antes: "Esperar as imagens do fotógrafo e os dados do infográfico entregues pelo redator.",
        oQueFazer: "Montar os 5 anúncios de página inteira, o anúncio da segunda capa e o infográfico.",
        comoFazer: "Use marcas fictícias. O infográfico usa os dados entregues pelo redator e leva a fonte dos dados no rodapé. Anúncios usam fundo escuro, e o fotógrafo entrega as imagens.",
        mensagem: "Anúncio ou infográfico [qual] montado. Fotógrafo, confira as imagens. Revisor, confira os textos."
      },
      {
        id: "v2_designer_p11",
        titulo: "Passo 11: Capa",
        espera: true,
        antes: "Direção geral e designer terem escolhido a imagem principal e as manchetes. Faça a capa por último, como o professor recomendou.",
        oQueFazer: "Montar a capa com nome, logo, imagem principal da matéria principal, manchetes e data de publicação.",
        comoFazer: "A imagem e as manchetes precisam combinar com a matéria principal. Use a hierarquia: logo, imagem, manchete principal e manchetes menores. O revisor confere a ortografia das manchetes.",
        mensagem: "Capa pronta para aprovação. Direção geral e editor chefe, vejam o arquivo."
      },
      {
        id: "v2_designer_p12",
        titulo: "Passo 12: Entregar o arquivo editável do Affinity",
        espera: true,
        antes: "Todas as páginas aprovadas e conferidas pelo revisor.",
        oQueFazer: "Deixar o arquivo final do Affinity pronto e salvo na pasta compartilhada.",
        comoFazer: "Salve o arquivo editável final do Affinity com a data no nome. Abra o arquivo e confira se as páginas estão na ordem, se as imagens estão com boa resolução (300 DPI), se as fontes aparecem corretamente e se a numeração está certa. Guarde uma cópia de segurança na pasta compartilhada.",
        mensagem: "Arquivo final do Affinity pronto na pasta compartilhada. Revisor e editor chefe, façam a conferência final."
      }
    ],
    habitoDiario: "Ao fim do dia, salve o arquivo do Affinity com a data no nome (exemplo: NextGenInsights_2026_11_05)."
  },
  fotografo: {
    id: "fotografo",
    nome: "Fotógrafo",
    passos: [
      {
        id: "v2_fotografo_p1",
        titulo: "Passo 1: Lista de imagens por página",
        espera: false,
        oQueFazer: "Listar tudo o que cada página precisa.",
        comoFazer: "Abra o mapa das 30 páginas e escreva, para cada uma, quantas imagens precisa, de que tipo (foto do grupo, imagem da internet ou ilustração) e o que deve mostrar. Marque as que precisam ser fotografadas pelo grupo.",
        mensagem: "Lista de imagens pronta na pasta compartilhada. Quem for aparecer ou ajudar em foto, vejam as páginas marcadas."
      },
      {
        id: "v2_fotografo_p2",
        titulo: "Passo 2: Planilha de créditos",
        espera: false,
        oQueFazer: "Registrar a origem de toda imagem para não errar o crédito.",
        comoFazer: [
          "Crie uma planilha com as colunas: arquivo, página, autor, fonte e licença.",
          "Registre cada imagem na hora em que a baixar ou tirar.",
          "Use só imagens com licença que permita uso.",
          "Formato do crédito na legenda, abaixo da imagem: \"Foto: [nome do fotógrafo]\" para fotos do grupo e \"Foto: [nome do fotógrafo/nome do site]\" para imagens da internet."
        ],
        mensagem: "Planilha de créditos criada. Quem trouxer qualquer imagem, me mande autor, site e link."
      },
      {
        id: "v2_fotografo_p3",
        titulo: "Passo 3: Fotografar e coletar imagens",
        espera: false,
        oQueFazer: "Produzir ou encontrar as imagens da lista.",
        comoFazer: "Fotografe com boa luz e o celular na horizontal quando a página for larga. Para imagens da internet, procure bancos gratuitos e anote a licença. Salve em alta resolução, pois 300 DPI exige imagem grande.",
        mensagem: "Imagens da matéria [número] coletadas. Estão na pasta [nome da pasta]."
      },
      {
        id: "v2_fotografo_p4",
        titulo: "Passo 4: Tratar as imagens",
        espera: false,
        oQueFazer: "Deixar as imagens com visual único.",
        comoFazer: "Ajuste brilho, contraste e corte. Se possível, aplique leve tom azulado para combinar com a paleta. Mantenha o mesmo estilo em todas.",
        mensagem: "Imagens tratadas e prontas para uso."
      },
      {
        id: "v2_fotografo_p5",
        titulo: "Passo 5: Escolher imagens olhando o esboço",
        espera: true,
        antes: "Esperar o designer entregar o esboço da página.",
        oQueFazer: "Ajustar ou trocar imagens conforme o espaço real.",
        mensagem: "Imagens da página [número] escolhidas e entregues ao designer."
      },
      {
        id: "v2_fotografo_p6",
        titulo: "Passo 6: Anúncios, segunda capa e infográfico (com o designer)",
        espera: false,
        oQueFazer: "Criar as imagens dos 5 anúncios e da segunda capa, e ajudar no infográfico.",
        comoFazer: "Use marcas fictícias, sem logos reais. O infográfico usa dados do redator e precisa de fonte no rodapé.",
        mensagem: "Imagens dos anúncios prontas e enviadas ao designer."
      }
    ],
    habitoDiario: "Atualize a planilha de créditos ao fim do dia."
  },
  redator: {
    id: "redator",
    nome: "Redator",
    passos: [
      {
        id: "v2_redator_p1",
        titulo: "Passo 1: Pesquisa de cada tema",
        espera: false,
        oQueFazer: "Juntar informações confiáveis das 4 matérias.",
        comoFazer: "Para cada tema (inteligência artificial no dia a dia, golpes digitais e cibersegurança, vício em telas e redes sociais, games e eSports) procure pelo menos 3 fontes confiáveis, como jornais, órgãos oficiais e estudos. Anote link, título e data de cada uma.",
        mensagem: "Pesquisa da matéria [número] concluída. Fontes anotadas no arquivo."
      },
      {
        id: "v2_redator_p2",
        titulo: "Passo 2: Escrever cada matéria",
        espera: false,
        oQueFazer: "Entregar o texto completo de cada matéria, com 700 a 1.000 palavras (matéria de 4 páginas).",
        comoFazer: [
          "Título e subtítulo.",
          "Introdução de 80 a 120 palavras que apresente o assunto e prenda o leitor.",
          "Desenvolvimento com 3 ou 4 intertítulos de 2 a 6 palavras cada.",
          "Conclusão de 60 a 100 palavras, que retoma a ideia central e não traz dados novos.",
          "Legendas sugeridas para as imagens.",
          "Lista de fontes no final."
        ],
        mensagem: "Matéria [número] entregue para aprovação. Direção geral, pode ler."
      },
      {
        id: "v2_redator_p3",
        titulo: "Passo 3: Dados do infográfico",
        espera: false,
        oQueFazer: "Entregar números e informações ao fotógrafo e ao designer.",
        comoFazer: "Escolha de 4 a 6 dados curtos, cada um com fonte. Se o tema virar \"5 sinais de um golpe digital\", entregue os 5 sinais com explicação de uma linha.",
        mensagem: "Dados do infográfico entregues, com fontes."
      },
      {
        id: "v2_redator_p4",
        titulo: "Passo 4: Ajustes depois da revisão",
        espera: true,
        antes: "Esperar o retorno da direção geral ou do revisor.",
        oQueFazer: "Corrigir o que foi pedido e reenviar.",
        mensagem: "Matéria [número] ajustada conforme os comentários. Nova versão na pasta."
      }
    ]
  },
  revisor: {
    id: "revisor",
    nome: "Revisor",
    passos: [
      {
        id: "v2_revisor_p1",
        titulo: "Passo 1: Guia de estilo de uma página",
        espera: false,
        oQueFazer: "Definir regras de escrita para toda a revista.",
        comoFazer: "Inclua tratamento ao leitor (você ou nós), como escrever números e datas, uso de siglas, aspas, estrangeirismos (por exemplo, eSports) e tamanho de título. Compartilhe com o redator antes dele escrever.",
        mensagem: "Guia de estilo pronto. Todos que escrevem, leiam antes."
      },
      {
        id: "v2_revisor_p2",
        titulo: "Passo 2: Revisar cada texto",
        espera: true,
        antes: "O texto ter sido aprovado pela direção geral.",
        oQueFazer: "Corrigir ortografia, acentuação, pontuação, concordância e clareza.",
        comoFazer: "Corrija com comentários visíveis ou controle de alterações, para o autor ver o que mudou. Não mude o sentido sem avisar.",
        mensagem: "Texto [qual] revisado. Autor, confira as correções."
      },
      {
        id: "v2_revisor_p3",
        titulo: "Passo 3: Escrever a coluna 2 e a resenha",
        espera: false,
        oQueFazer: [
          "Coluna 2: \"Privacidade, quanto valem seus dados?\", de 350 a 450 palavras. Texto opinativo, assinado, com ponto de vista claro.",
          "Resenha: documentário O Dilema das Redes, de 300 a 400 palavras. Assista antes, resuma o essencial e dê sua avaliação."
        ],
        comoFazer: "O editor chefe revisa os textos do próprio revisor.",
        mensagem: "[Coluna 2 ou Resenha] pronta. Editor chefe, pode revisar."
      },
      {
        id: "v2_revisor_p4",
        titulo: "Passo 4: Conferir as páginas diagramadas",
        espera: true,
        antes: "Designer avisar que a página está detalhada.",
        oQueFazer: "Conferir texto na página, quebras de linha, créditos, legendas e numeração.",
        mensagem: "Página [número] conferida. Erros encontrados: [lista] ou \"nenhum erro\"."
      },
      {
        id: "v2_revisor_p5",
        titulo: "Passo 5: Conferência final de créditos",
        espera: true,
        antes: "Todas as páginas prontas.",
        oQueFazer: "Comparar a planilha de créditos com as legendas da revista.",
        mensagem: "Créditos conferidos. Pendências: [lista] ou \"nenhuma\"."
      }
    ]
  },
  direcao_geral: {
    id: "direcao_geral",
    nome: "Direção Geral",
    passos: [
      {
        id: "v2_direcao_geral_p1",
        titulo: "Passo 1: Definir o tom da revista",
        espera: false,
        oQueFazer: "Decidir como a revista fala com o leitor.",
        comoFazer: "Escolha um tom (por exemplo, jovem, informativo e acessível) e passe ao redator e ao revisor.",
        mensagem: "Tom da revista: [descrição]. Escrevam seguindo isso."
      },
      {
        id: "v2_direcao_geral_p2",
        titulo: "Passo 2: Carta da direção geral",
        espera: false,
        oQueFazer: "Escrever a carta de abertura, de 200 a 300 palavras.",
        comoFazer: "Apresente a revista, explique o tema e convide o leitor a continuar.",
        mensagem: "Carta da direção geral pronta para revisão."
      },
      {
        id: "v2_direcao_geral_p3",
        titulo: "Passo 3: Coluna 1",
        espera: false,
        oQueFazer: "Escrever \"A tecnologia ajuda ou atrapalha quem estuda?\", de 350 a 450 palavras.",
        comoFazer: "Coluna é opinião assinada. Defina uma posição e defenda com exemplos. Não é matéria, então pode ter ponto de vista.",
        mensagem: "Coluna 1 pronta para revisão."
      },
      {
        id: "v2_direcao_geral_p4",
        titulo: "Passo 4: Aprovar conteúdos",
        espera: true,
        antes: "Esperar o redator, o designer ou outro integrante enviar o que precisa de aprovação.",
        oQueFazer: "Aprovar o conteúdo de cada texto e o esboço de cada página em até 24 horas depois de receber.",
        comoFazer: "Verifique se o texto está no tema, no tom certo e correto nas informações. Responda no grupo com \"aprovado\" ou com a lista do que mudar.",
        mensagem: "[Texto ou Esboço] de [qual] aprovado. Ou: precisa mudar: [lista]."
      },
      {
        id: "v2_direcao_geral_p5",
        titulo: "Passo 5: Capa (com o designer)",
        espera: false,
        oQueFazer: "Escolher a imagem principal e as manchetes.",
        comoFazer: "A imagem vem da matéria principal. As manchetes devem ser curtas e atraentes.",
        mensagem: "Imagem e manchetes da capa escolhidas: [descrição]."
      }
    ]
  },
  editor_chefe: {
    id: "editor_chefe",
    nome: "Editor Chefe",
    passos: [
      {
        id: "v2_editor_chefe_p1",
        titulo: "Passo 1: Fechar o mapa e abrir o diário de bordo",
        espera: false,
        oQueFazer: "Deixar o mapa das 30 páginas aprovado e iniciar o diário.",
        comoFazer: "O diário precisa ter datas de cada execução ou alteração, paleta, tipografia, funções de cada membro, planejamento, referências e ideias, inclusive as que não deram certo.",
        mensagem: "Diário de bordo aberto. Me mandem o que fizeram e o que não deu certo."
      },
      {
        id: "v2_editor_chefe_p2",
        titulo: "Passo 2: Sumário e expediente",
        espera: true,
        antes: "Esperar as páginas estarem definidas e as funções de cada integrante estarem com nome.",
        oQueFazer: "Montar o sumário (matérias com páginas, pode dividir por seção) e o expediente (nome e função de todos, mais um convite ao leitor).",
        mensagem: "Sumário e expediente prontos. Conferam seus nomes e funções."
      },
      {
        id: "v2_editor_chefe_p3",
        titulo: "Passo 3: Conferir os requisitos",
        espera: true,
        antes: "Esperar a revista estar quase pronta.",
        oQueFazer: "Comparar a revista com a lista do professor.",
        comoFazer: "Confira 30 páginas (sem contar capa, segunda capa e contracapa), 5 anúncios de página inteira, 3 matérias, 2 colunas, capa, segunda capa de uso comercial, expediente, sumário, numeração de páginas, créditos em todas as imagens e diário de bordo.",
        mensagem: "Conferência feita. Faltam: [lista] ou \"tudo certo\"."
      }
    ]
  },
  mapa_paginas: {
    id: "mapa_paginas",
    nome: "Mapa de páginas",
    itensEspeciaisInicio: [
      {
        id: "mapa_capa",
        item: "Capa",
        tipo: "capa",
        responsavel: "Designer e Direção geral",
        observacao: "Nome e logo, imagem principal (da matéria principal), manchetes e data de publicação. Feita por último."
      },
      {
        id: "mapa_segunda_capa",
        item: "Segunda capa",
        tipo: "anúncio",
        responsavel: "Fotógrafo e Designer",
        observacao: "Anúncio extra, espaço comercial."
      }
    ],
    secoes: [
      {
        nome: "Abertura (páginas 1 a 3)",
        corDestaque: "#00E5FF", // Ciano
        itens: [
          {
            id: "mapa_p1",
            paginas: "Página 1",
            paginasNums: [1],
            titulo: "Sumário",
            tipo: "sumário",
            responsavel: "Editor chefe"
          },
          {
            id: "mapa_p2",
            paginas: "Página 2",
            paginasNums: [2],
            titulo: "Expediente",
            tipo: "expediente",
            responsavel: "Editor chefe"
          },
          {
            id: "mapa_p3",
            paginas: "Página 3",
            paginasNums: [3],
            titulo: "Carta da direção geral",
            tipo: "carta",
            responsavel: "Direção geral",
            texto: "200 a 300 palavras"
          }
        ]
      },
      {
        nome: "Inovação (páginas 4 a 9)",
        corDestaque: "#8B5CF6", // Violeta
        itens: [
          {
            id: "mapa_p4_7",
            paginas: "Páginas 4 a 7",
            paginasNums: [4, 5, 6, 7],
            titulo: "Matéria 1: inteligência artificial no dia a dia",
            tipo: "matéria",
            responsavel: "Redator",
            texto: "700 a 1.000 palavras"
          },
          {
            id: "mapa_p8",
            paginas: "Página 8",
            paginasNums: [8],
            titulo: "Anúncio 1: notebook fictício com IA",
            tipo: "anúncio",
            responsavel: "Fotógrafo e Designer"
          },
          {
            id: "mapa_p9",
            paginas: "Página 9",
            paginasNums: [9],
            titulo: "Coluna 1: \"A tecnologia ajuda ou atrapalha quem estuda?\"",
            tipo: "coluna",
            responsavel: "Direção geral",
            texto: "350 a 450 palavras"
          }
        ]
      },
      {
        nome: "Segurança (páginas 10 a 15)",
        corDestaque: "#FF3D81", // Rosa neon
        itens: [
          {
            id: "mapa_p10_13",
            paginas: "Páginas 10 a 13",
            paginasNums: [10, 11, 12, 13],
            titulo: "Matéria 2: golpes digitais e cibersegurança",
            tipo: "matéria",
            responsavel: "Redator",
            texto: "700 a 1.000 palavras"
          },
          {
            id: "mapa_p14",
            paginas: "Página 14",
            paginasNums: [14],
            titulo: "Anúncio 2: antivírus fictício",
            tipo: "anúncio",
            responsavel: "Fotógrafo e Designer"
          },
          {
            id: "mapa_p15",
            paginas: "Página 15",
            paginasNums: [15],
            titulo: "Infográfico: \"5 sinais de um golpe digital\"",
            tipo: "infográfico",
            responsavel: "Fotógrafo e Designer, com dados do Redator",
            observacao: "O tema original era \"do computador ao celular\", mas combina melhor com a seção Segurança se virar \"5 sinais de um golpe digital\". A fonte dos dados vai no rodapé."
          }
        ]
      },
      {
        nome: "Comportamento (páginas 16 a 21)",
        corDestaque: "#00E5FF", // Ciano
        itens: [
          {
            id: "mapa_p16_19",
            paginas: "Páginas 16 a 19",
            paginasNums: [16, 17, 18, 19],
            titulo: "Matéria 3: vício em telas e redes sociais",
            tipo: "matéria",
            responsavel: "Redator",
            texto: "700 a 1.000 palavras"
          },
          {
            id: "mapa_p20",
            paginas: "Página 20",
            paginasNums: [20],
            titulo: "Anúncio 3: curso de programação fictício",
            tipo: "anúncio",
            responsavel: "Fotógrafo e Designer"
          },
          {
            id: "mapa_p21",
            paginas: "Página 21",
            paginasNums: [21],
            titulo: "Coluna 2: \"Privacidade, quanto valem seus dados?\"",
            tipo: "coluna",
            responsavel: "Revisor",
            texto: "350 a 450 palavras"
          }
        ]
      },
      {
        nome: "Games e cultura (páginas 22 a 27)",
        corDestaque: "#8B5CF6", // Violeta
        itens: [
          {
            id: "mapa_p22_25",
            paginas: "Páginas 22 a 25",
            paginasNums: [22, 23, 24, 25],
            titulo: "Matéria 4: games e eSports",
            tipo: "matéria",
            responsavel: "Redator",
            texto: "700 a 1.000 palavras"
          },
          {
            id: "mapa_p26",
            paginas: "Página 26",
            paginasNums: [26],
            titulo: "Anúncio 4: headset gamer fictício",
            tipo: "anúncio",
            responsavel: "Fotógrafo e Designer"
          },
          {
            id: "mapa_p27",
            paginas: "Página 27",
            paginasNums: [27],
            titulo: "Resenha do documentário O Dilema das Redes",
            tipo: "resenha",
            responsavel: "Revisor",
            texto: "300 a 400 palavras"
          }
        ]
      },
      {
        nome: "Carreira (páginas 28 a 30)",
        corDestaque: "#FF3D81", // Rosa neon
        itens: [
          {
            id: "mapa_p28_29",
            paginas: "Páginas 28 e 29",
            paginasNums: [28, 29],
            titulo: "Entrevista com profissional ou professor de TI",
            tipo: "entrevista",
            responsavel: "Editor chefe",
            texto: "600 a 800 palavras"
          },
          {
            id: "mapa_p30",
            paginas: "Página 30",
            paginasNums: [30],
            titulo: "Anúncio 5: smartphone fictício",
            tipo: "anúncio",
            responsavel: "Fotógrafo e Designer"
          }
        ]
      }
    ],
    itensEspeciaisFim: [
      {
        id: "mapa_contracapa",
        item: "Contracapa",
        tipo: "contracapa",
        responsavel: "Designer e Direção geral",
        observacao: "Imagem forte e chamada para a próxima edição. É uma ideia do grupo e precisa ser confirmada com o professor, pois o arquivo dele não define requisitos para a contracapa."
      }
    ],
    observacoesMapa: [
      "Os anúncios usam marcas fictícias.",
      "A página 1 fica sozinha. As páginas duplas são 2 e 3, 4 e 5, 6 e 7, e assim por diante. A página 30 fica sozinha no fim, de frente para a contracapa.",
      "As 30 páginas não incluem capa, segunda capa e contracapa."
    ]
  }
};
