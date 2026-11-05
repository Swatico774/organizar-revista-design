// script.js - Lógica interativa do site organizador de revista
// Lê dados exclusivamente de conteudo.js e armazena estado no localStorage

(function () {
  "use strict";

  // Chaves de armazenamento - chaves dedicadas e preservadas
  const STORAGE_KEY_CHECKED = "nextgen_revista_checked_steps_v2";
  const STORAGE_KEY_NAMES = "nextgen_revista_member_names";
  const STORAGE_KEY_ACTIVE_TAB = "nextgen_revista_active_tab";
  const STORAGE_KEY_MAPA_STATUS = "nextgen_revista_mapa_status"; // Nova chave para os status do mapa

  // Estado carregado do localStorage
  let checkedSteps = {};
  let memberNames = {};
  let mapaStatus = {}; // { [itemId]: { pronto: boolean, status: string } }
  let currentTabId = "geral";

  // Filtros ativos na aba Mapa de páginas
  let filtroResponsavel = "todos";
  let filtroStatus = "todos";

  // Carregar dados salvos
  function loadStorage() {
    try {
      checkedSteps = JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKED)) || {};
    } catch (e) {
      checkedSteps = {};
    }

    try {
      memberNames = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES)) || {};
    } catch (e) {
      memberNames = {};
    }

    try {
      mapaStatus = JSON.parse(localStorage.getItem(STORAGE_KEY_MAPA_STATUS)) || {};
    } catch (e) {
      mapaStatus = {};
    }

    const savedTab = localStorage.getItem(STORAGE_KEY_ACTIVE_TAB);
    if (savedTab && CONTEUDO[savedTab]) {
      currentTabId = savedTab;
    }
  }

  function saveStorage() {
    localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checkedSteps));
    localStorage.setItem(STORAGE_KEY_NAMES, JSON.stringify(memberNames));
    localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, currentTabId);
    localStorage.setItem(STORAGE_KEY_MAPA_STATUS, JSON.stringify(mapaStatus));
  }

  // Notificação Toast
  let toastTimeout = null;
  function showToast(mensagem) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.remove("hidden");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add("hidden");
    }, 2500);
  }

  // Copiar para clipboard com feedback
  function copyTextToClipboard(text, successMsg = "Copiado com sucesso!") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopyText(text, successMsg);
      });
    } else {
      fallbackCopyText(text, successMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      showToast(successMsg);
    } catch (err) {
      showToast("Não foi possível copiar.");
    }
    document.body.removeChild(textarea);
  }

  // Substituir apenas [nome] pelo nome digitado
  function processMessageText(template, memberName) {
    if (!template) return "";
    const cleanName = (memberName && memberName.trim()) ? memberName.trim() : "[nome]";
    return template.replace(/\[nome\]/gi, cleanName);
  }

  // Renderizar o Menu de Abas
  function renderNavTabs() {
    const navTabsContainer = document.getElementById("navTabs");
    navTabsContainer.innerHTML = "";

    const tabsOrder = [
      "geral",
      "designer",
      "fotografo",
      "redator",
      "revisor",
      "direcao_geral",
      "editor_chefe",
      "mapa_paginas"
    ];

    tabsOrder.forEach(tabKey => {
      const tabData = CONTEUDO[tabKey];
      if (!tabData) return;

      const btn = document.createElement("button");
      btn.className = `tab-btn ${tabKey === currentTabId ? "active" : ""}`;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", tabKey === currentTabId ? "true" : "false");
      btn.textContent = tabData.nome;

      btn.addEventListener("click", () => {
        currentTabId = tabKey;
        saveStorage();
        renderNavTabs();
        renderTabContent();
      });

      navTabsContainer.appendChild(btn);
    });
  }

  // Renderiza o conteúdo da aba selecionada
  function renderTabContent() {
    const mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = "";

    if (currentTabId === "geral") {
      renderGeralTab(mainContent);
    } else if (currentTabId === "mapa_paginas") {
      renderMapaPaginasTab(mainContent);
    } else {
      renderFunctionTab(mainContent, CONTEUDO[currentTabId]);
    }
  }

  // 1. Renderizar Aba Geral
  function renderGeralTab(container) {
    const data = CONTEUDO.geral;

    const wrapper = document.createElement("div");

    // Título da Aba
    const titleBox = document.createElement("div");
    titleBox.className = "tab-header-box";
    titleBox.innerHTML = `
      <div class="tab-title-row">
        <h2 class="tab-heading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Visão Geral da Revista
        </h2>
      </div>
      <p style="color: var(--text-muted); font-size: 0.95rem;">
        Regras do grupo e fluxo de trabalho para todos os membros da equipe.
      </p>
    `;
    wrapper.appendChild(titleBox);

    // Cartão: Regras do Grupo
    const regrasCard = document.createElement("div");
    regrasCard.className = "geral-card";
    regrasCard.innerHTML = `
      <h2>REGRAS DO GRUPO</h2>
      <ol class="geral-list">
        ${data.regras.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
    `;
    wrapper.appendChild(regrasCard);

    // Cartão: Fluxo de Cada Matéria
    const fluxoCard = document.createElement("div");
    fluxoCard.className = "geral-card";
    fluxoCard.innerHTML = `
      <h2>FLUXO DE CADA MATÉRIA</h2>
      <ol class="geral-list">
        ${data.fluxo.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
    `;
    wrapper.appendChild(fluxoCard);

    container.appendChild(wrapper);
  }

  // 2. Renderizar Abas de Função (Designer, Fotógrafo, Redator, Revisor, Direção Geral, Editor Chefe)
  function renderFunctionTab(container, tabData) {
    if (!tabData) return;

    const wrapper = document.createElement("div");

    // Cabeçalho da Aba com Nome de quem faz a função e Barra de Progresso
    const headerBox = document.createElement("div");
    headerBox.className = "tab-header-box";

    const savedName = memberNames[tabData.id] || "";

    headerBox.innerHTML = `
      <div class="tab-title-row">
        <h2 class="tab-heading">${escapeHtml(tabData.nome)}</h2>
        <div class="member-name-input-group">
          <label for="memberNameInput">Responsável:</label>
          <input 
            type="text" 
            id="memberNameInput" 
            class="member-name-input" 
            placeholder="Digite o nome..." 
            value="${escapeHtml(savedName)}"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-info">
          <span>Progresso da função</span>
          <strong id="progressText">0% concluído (0/${tabData.passos.length})</strong>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progressBarFill"></div>
        </div>
      </div>
    `;
    wrapper.appendChild(headerBox);

    // Seção especial: Paleta de Cores (Exclusiva da aba Designer)
    if (tabData.id === "designer" && tabData.paletaCores) {
      const paletteSec = createPaletteSection(tabData.paletaCores);
      wrapper.appendChild(paletteSec);
    }

    // Lista de Passos (Acordeões)
    const stepsContainer = document.createElement("div");
    stepsContainer.className = "steps-container";

    tabData.passos.forEach(passo => {
      const accordion = createStepAccordion(passo, tabData.id);
      stepsContainer.appendChild(accordion);
    });
    wrapper.appendChild(stepsContainer);

    // Bloco: Hábito diário (se existir)
    if (tabData.habitoDiario) {
      const habitoCard = document.createElement("div");
      habitoCard.className = "card-section card-habito";
      habitoCard.innerHTML = `
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          HÁBITO DIÁRIO
        </h3>
        <p>${escapeHtml(tabData.habitoDiario)}</p>
      `;
      wrapper.appendChild(habitoCard);
    }

    container.appendChild(wrapper);

    // Evento de digitação do nome
    const nameInput = document.getElementById("memberNameInput");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        memberNames[tabData.id] = e.target.value;
        saveStorage();
        updateDynamicMessages(tabData.id);
      });
    }

    // Atualiza barra de progresso inicial da aba
    updateProgress(tabData);
  }

  // Criação da Paleta de Cores (Aba Designer)
  function createPaletteSection(paleta) {
    const sec = document.createElement("div");
    sec.className = "palette-section";

    let swatchesHtml = "";
    paleta.cores.forEach(cor => {
      swatchesHtml += `
        <div class="color-swatch-card" data-hex="${cor.hex}" title="Clique para copiar ${cor.hex}">
          <div class="color-box" style="background-color: ${cor.hex};"></div>
          <span class="color-name">${escapeHtml(cor.nome)}</span>
          <span class="color-hex">${escapeHtml(cor.hex)}</span>
          <span class="color-desc">${escapeHtml(cor.descricao)}</span>
        </div>
      `;
    });

    sec.innerHTML = `
      <h3>PALETA DE CORES</h3>
      <p class="palette-subtitle">(salvar no Affinity com estes nomes — clique em qualquer cor para copiar o código)</p>
      <div class="palette-grid">
        ${swatchesHtml}
      </div>
      <div class="palette-rules-box">
        <strong>Regras de uso:</strong> ${escapeHtml(paleta.regras)}
      </div>
    `;

    // Evento de clique para copiar código hex
    sec.querySelectorAll(".color-swatch-card").forEach(card => {
      card.addEventListener("click", () => {
        const hex = card.getAttribute("data-hex");
        copyTextToClipboard(hex, `Código ${hex} copiado!`);
      });
    });

    return sec;
  }

  // Criação do Acordeão do Passo
  function createStepAccordion(passo, tabId) {
    const isChecked = !!checkedSteps[passo.id];

    const item = document.createElement("div");
    item.className = `step-accordion ${isChecked ? "completed" : ""}`;
    item.id = `step-card-${passo.id}`;

    // Header do Acordeão
    const header = document.createElement("div");
    header.className = "step-header";

    header.innerHTML = `
      <div class="step-header-left">
        <div class="step-checkbox-wrapper" onclick="event.stopPropagation();">
          <input 
            type="checkbox" 
            class="step-checkbox" 
            id="chk-${passo.id}" 
            ${isChecked ? "checked" : ""}
            aria-label="Marcar como feito: ${escapeHtml(passo.titulo)}"
          />
        </div>
        <div class="step-title-group">
          <span class="step-title">${escapeHtml(passo.titulo)}</span>
          ${passo.espera ? `<span class="badge-espera">Esperar</span>` : ""}
        </div>
      </div>
      <div class="accordion-chevron">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    `;

    // Evento de marcar checkbox
    const checkbox = header.querySelector(".step-checkbox");
    checkbox.addEventListener("change", (e) => {
      e.stopPropagation();
      checkedSteps[passo.id] = e.target.checked;
      saveStorage();

      if (e.target.checked) {
        item.classList.add("completed");
      } else {
        item.classList.remove("completed");
      }

      updateProgress(CONTEUDO[tabId]);
    });

    // Evento de abrir/fechar acordeão
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });

    item.appendChild(header);

    // Corpo do Acordeão (conteúdo)
    const body = document.createElement("div");
    body.className = "step-body";

    // 1. Antes de começar (se houver)
    if (passo.antes) {
      const bAntes = document.createElement("div");
      bAntes.className = "step-block";
      bAntes.innerHTML = `
        <div class="block-label label-antes">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Antes de começar
        </div>
        <div class="block-content block-content-callout callout-antes">${escapeHtml(passo.antes)}</div>
      `;
      body.appendChild(bAntes);
    }

    // 2. Atenção (se houver)
    if (passo.atencao) {
      const bAtencao = document.createElement("div");
      bAtencao.className = "step-block";
      bAtencao.innerHTML = `
        <div class="block-label label-atencao">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Atenção
        </div>
        <div class="block-content block-content-callout callout-atencao">${escapeHtml(passo.atencao)}</div>
      `;
      body.appendChild(bAtencao);
    }

    // 3. O que fazer (se houver)
    if (passo.oQueFazer) {
      const bOQue = document.createElement("div");
      bOQue.className = "step-block";
      let oQueContent = "";
      if (Array.isArray(passo.oQueFazer)) {
        oQueContent = `<ol>${passo.oQueFazer.map(li => `<li>${escapeHtml(li)}</li>`).join("")}</ol>`;
      } else {
        oQueContent = escapeHtml(passo.oQueFazer);
      }
      bOQue.innerHTML = `
        <div class="block-label label-o-que-fazer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          O que fazer
        </div>
        <div class="block-content">${oQueContent}</div>
      `;
      body.appendChild(bOQue);
    }

    // 4. Como fazer (se houver)
    if (passo.comoFazer) {
      const bComo = document.createElement("div");
      bComo.className = "step-block";
      let comoContent = "";
      if (Array.isArray(passo.comoFazer)) {
        comoContent = `<ol>${passo.comoFazer.map(li => `<li>${escapeHtml(li)}</li>`).join("")}</ol>`;
      } else {
        comoContent = escapeHtml(passo.comoFazer);
      }
      bComo.innerHTML = `
        <div class="block-label label-como-fazer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          Como fazer
        </div>
        <div class="block-content">${comoContent}</div>
      `;
      body.appendChild(bComo);
    }

    // 5. Mensagem para o grupo (se houver)
    if (passo.mensagem) {
      const bMensagem = document.createElement("div");
      bMensagem.className = "step-block";

      const currentName = memberNames[tabId] || "";
      const displayMsg = processMessageText(passo.mensagem, currentName);

      bMensagem.innerHTML = `
        <div class="block-label label-mensagem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Mensagem para o grupo
        </div>
        <div class="message-box" id="msg-box-${passo.id}">${escapeHtml(displayMsg)}</div>
        <button type="button" class="btn-copy" id="btn-copy-${passo.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copiar mensagem
        </button>
      `;

      // Evento de copiar mensagem
      const copyBtn = bMensagem.querySelector(`#btn-copy-${passo.id}`);
      copyBtn.addEventListener("click", () => {
        const liveName = memberNames[tabId] || "";
        const finalMsg = processMessageText(passo.mensagem, liveName);
        copyTextToClipboard(finalMsg, "Mensagem copiada para o grupo!");
      });

      body.appendChild(bMensagem);
    }

    item.appendChild(body);
    return item;
  }

  // 3. Renderizar Aba Mapa de Páginas
  function renderMapaPaginasTab(container) {
    const data = CONTEUDO.mapa_paginas;
    if (!data) return;

    const wrapper = document.createElement("div");
    wrapper.className = "mapa-container";

    // Header da Aba com Barra de Progresso de páginas prontas
    const headerBox = document.createElement("div");
    headerBox.className = "tab-header-box";
    headerBox.innerHTML = `
      <div class="tab-title-row">
        <h2 class="tab-heading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          Mapa de Páginas
        </h2>
      </div>
      <div class="progress-container">
        <div class="progress-info">
          <span>Progresso das 30 páginas</span>
          <strong id="mapaProgressText">0% prontas (0/30 páginas)</strong>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="mapaProgressBarFill"></div>
        </div>
      </div>
    `;
    wrapper.appendChild(headerBox);

    // Controles de Filtros
    const filtersBox = document.createElement("div");
    filtersBox.className = "mapa-filters-bar";

    // Obter lista única de responsáveis
    const responsaveisSet = new Set();
    data.itensEspeciaisInicio.forEach(it => responsaveisSet.add(it.responsavel));
    data.secoes.forEach(sec => sec.itens.forEach(it => responsaveisSet.add(it.responsavel)));
    data.itensEspeciaisFim.forEach(it => responsaveisSet.add(it.responsavel));

    const optionsResp = Array.from(responsaveisSet).sort().map(r => 
      `<option value="${escapeHtml(r)}" ${filtroResponsavel === r ? "selected" : ""}>${escapeHtml(r)}</option>`
    ).join("");

    filtersBox.innerHTML = `
      <div class="filter-item">
        <label for="filtroResponsavelSelect">Filtrar por responsável:</label>
        <select id="filtroResponsavelSelect" class="mapa-select-filter">
          <option value="todos" ${filtroResponsavel === "todos" ? "selected" : ""}>Todos os responsáveis</option>
          ${optionsResp}
        </select>
      </div>
      <div class="filter-item">
        <label for="filtroStatusSelect">Filtrar por status:</label>
        <select id="filtroStatusSelect" class="mapa-select-filter">
          <option value="todos" ${filtroStatus === "todos" ? "selected" : ""}>Todos os status</option>
          <option value="Não começou" ${filtroStatus === "Não começou" ? "selected" : ""}>Não começou</option>
          <option value="Em andamento" ${filtroStatus === "Em andamento" ? "selected" : ""}>Em andamento</option>
          <option value="Em revisão" ${filtroStatus === "Em revisão" ? "selected" : ""}>Em revisão</option>
          <option value="Pronta" ${filtroStatus === "Pronta" ? "selected" : ""}>Pronta</option>
        </select>
      </div>
    `;
    wrapper.appendChild(filtersBox);

    // Contêiner dos Itens do Mapa
    const mapaContentArea = document.createElement("div");
    mapaContentArea.id = "mapaItemsContainer";
    wrapper.appendChild(mapaContentArea);

    // Cartão final: Observações do mapa
    const obsCard = document.createElement("div");
    obsCard.className = "card-section";
    obsCard.style.borderLeft = "4px solid var(--accent-purple)";
    obsCard.innerHTML = `
      <h3>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Observações do mapa
      </h3>
      <ol class="geral-list" style="margin-top: 0.5rem;">
        ${data.observacoesMapa.map(obs => `<li>${escapeHtml(obs)}</li>`).join("")}
      </ol>
    `;
    wrapper.appendChild(obsCard);

    container.appendChild(wrapper);

    // Eventos de Filtro
    const respSelect = document.getElementById("filtroResponsavelSelect");
    const statusSelect = document.getElementById("filtroStatusSelect");

    if (respSelect) {
      respSelect.addEventListener("change", (e) => {
        filtroResponsavel = e.target.value;
        renderMapaCards(data);
      });
    }

    if (statusSelect) {
      statusSelect.addEventListener("change", (e) => {
        filtroStatus = e.target.value;
        renderMapaCards(data);
      });
    }

    // Renderizar os cartões e atualizar a barra de progresso
    renderMapaCards(data);
    updateMapaProgress(data);
  }

  // Renderizar a lista de cartões do mapa com base nos filtros
  function renderMapaCards(data) {
    const container = document.getElementById("mapaItemsContainer");
    if (!container) return;
    container.innerHTML = "";

    // Função de verificação de filtro
    function matchFilters(item) {
      const state = mapaStatus[item.id] || { pronto: false, status: "Não começou" };
      const statusValue = state.status || (state.pronto ? "Pronta" : "Não começou");

      if (filtroResponsavel !== "todos" && item.responsavel !== filtroResponsavel) {
        return false;
      }
      if (filtroStatus !== "todos" && statusValue !== filtroStatus) {
        return false;
      }
      return true;
    }

    // 1. Itens especiais do início (Capa, Segunda capa)
    const matchingInicio = data.itensEspeciaisInicio.filter(matchFilters);
    if (matchingInicio.length > 0) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "mapa-special-group";
      groupDiv.innerHTML = `<h3 class="mapa-group-title">Abertura e Capas Externas</h3>`;
      matchingInicio.forEach(item => {
        groupDiv.appendChild(createMapaCard(item, null, false));
      });
      container.appendChild(groupDiv);
    }

    // 2. Seções (páginas 1 a 30)
    data.secoes.forEach(secao => {
      const matchingItens = secao.itens.filter(matchFilters);
      if (matchingItens.length > 0) {
        const secDiv = document.createElement("div");
        secDiv.className = "mapa-section-block";
        secDiv.style.borderLeftColor = secao.corDestaque;

        const secHeader = document.createElement("div");
        secHeader.className = "mapa-section-header";
        secHeader.style.color = secao.corDestaque;
        secHeader.innerHTML = `<h4>${escapeHtml(secao.nome)}</h4>`;
        secDiv.appendChild(secHeader);

        matchingItens.forEach(item => {
          secDiv.appendChild(createMapaCard(item, secao.corDestaque, true));
        });

        container.appendChild(secDiv);
      }
    });

    // 3. Itens especiais do fim (Contracapa)
    const matchingFim = data.itensEspeciaisFim.filter(matchFilters);
    if (matchingFim.length > 0) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "mapa-special-group";
      groupDiv.innerHTML = `<h3 class="mapa-group-title">Encerramento Externo</h3>`;
      matchingFim.forEach(item => {
        groupDiv.appendChild(createMapaCard(item, null, false));
      });
      container.appendChild(groupDiv);
    }

    // Se nenhum item corresponder aos filtros
    if (container.children.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "card-section";
      emptyMsg.style.textAlign = "center";
      emptyMsg.style.color = "var(--text-muted)";
      emptyMsg.textContent = "Nenhum item encontrado para os filtros selecionados.";
      container.appendChild(emptyMsg);
    }
  }

  // Helper para tag de aviso de página dupla ou sozinha
  function getPageDuplaTag(paginasNums) {
    if (!paginasNums || paginasNums.length === 0) return "";
    
    // Página 1 ou 30: "Página sozinha"
    if (paginasNums.length === 1 && (paginasNums[0] === 1 || paginasNums[0] === 30)) {
      return `<span class="badge-page-type badge-page-single">Página sozinha</span>`;
    }
    
    // Demais páginas da contagem 1-30 formam página dupla
    return `<span class="badge-page-type badge-page-double">Página dupla</span>`;
  }

  // Criação de um cartão individual do mapa
  function createMapaCard(item, accentColor, isNumberedPage) {
    const card = document.createElement("div");
    card.className = "mapa-card";
    card.id = `card-${item.id}`;

    // Estado salvo
    const state = mapaStatus[item.id] || { pronto: false, status: "Não começou" };
    const isPronta = state.pronto || state.status === "Pronta";
    const currentStatus = state.status || (isPronta ? "Pronta" : "Não começou");

    if (isPronta) {
      card.classList.add("mapa-card-ready");
    }

    // Título ou Identificação
    const mainTitle = item.item ? item.item : item.titulo;
    const pageNumberDisplay = item.paginas ? `<span class="mapa-page-num">${escapeHtml(item.paginas)}</span>` : "";
    const pageBadge = isNumberedPage ? getPageDuplaTag(item.paginasNums) : "";

    // Montagem do HTML
    card.innerHTML = `
      <div class="mapa-card-top">
        <div class="mapa-card-left">
          <label class="mapa-checkbox-label">
            <input 
              type="checkbox" 
              class="mapa-checkbox" 
              id="chk-mapa-${item.id}" 
              ${isPronta ? "checked" : ""}
            />
            <span class="mapa-chk-custom"></span>
            <span class="mapa-chk-text">Pronta</span>
          </label>
          <div class="mapa-headings">
            <div class="mapa-page-row">
              ${pageNumberDisplay}
              ${pageBadge}
            </div>
            <h4 class="mapa-card-title">${escapeHtml(mainTitle)}</h4>
          </div>
        </div>
        <div class="mapa-card-right">
          <div class="mapa-status-wrapper">
            <label for="status-sel-${item.id}" class="mapa-status-label">Status:</label>
            <select id="status-sel-${item.id}" class="mapa-status-select">
              <option value="Não começou" ${currentStatus === "Não começou" ? "selected" : ""}>Não começou</option>
              <option value="Em andamento" ${currentStatus === "Em andamento" ? "selected" : ""}>Em andamento</option>
              <option value="Em revisão" ${currentStatus === "Em revisão" ? "selected" : ""}>Em revisão</option>
              <option value="Pronta" ${currentStatus === "Pronta" ? "selected" : ""}>Pronta</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mapa-card-details">
        <div class="mapa-detail-tag"><strong>Tipo:</strong> ${escapeHtml(item.tipo)}</div>
        <div class="mapa-detail-tag"><strong>Responsável:</strong> ${escapeHtml(item.responsavel)}</div>
        ${item.texto ? `<div class="mapa-detail-tag"><strong>Tamanho do texto:</strong> ${escapeHtml(item.texto)}</div>` : ""}
      </div>
      ${item.observacao ? `
        <div class="mapa-card-obs">
          <strong>Observação:</strong> ${escapeHtml(item.observacao)}
        </div>
      ` : ""}
    `;

    // Evento de alteração no Checkbox
    const chk = card.querySelector(`#chk-mapa-${item.id}`);
    const sel = card.querySelector(`#status-sel-${item.id}`);

    chk.addEventListener("change", (e) => {
      const checked = e.target.checked;
      const newStatus = checked ? "Pronta" : (sel.value === "Pronta" ? "Em andamento" : sel.value);
      
      sel.value = newStatus;
      mapaStatus[item.id] = { pronto: checked, status: newStatus };
      saveStorage();

      if (checked) {
        card.classList.add("mapa-card-ready");
      } else {
        card.classList.remove("mapa-card-ready");
      }

      updateMapaProgress(CONTEUDO.mapa_paginas);
    });

    // Evento de alteração no Select de Status
    sel.addEventListener("change", (e) => {
      const val = e.target.value;
      const isReady = (val === "Pronta");
      
      chk.checked = isReady;
      mapaStatus[item.id] = { pronto: isReady, status: val };
      saveStorage();

      if (isReady) {
        card.classList.add("mapa-card-ready");
      } else {
        card.classList.remove("mapa-card-ready");
      }

      updateMapaProgress(CONTEUDO.mapa_paginas);
    });

    return card;
  }

  // Atualização da barra de progresso das 30 páginas prontas
  function updateMapaProgress(data) {
    if (!data || !data.secoes) return;

    // A contagem das 30 páginas é baseada nas páginas das seções 1 a 30 (capa, segunda capa e contracapa ficam fora)
    let paginasProntasCount = 0;
    const totalPaginas = 30;

    data.secoes.forEach(secao => {
      secao.itens.forEach(item => {
        const state = mapaStatus[item.id] || { pronto: false, status: "Não começou" };
        const isPronta = state.pronto || state.status === "Pronta";
        if (isPronta && item.paginasNums) {
          paginasProntasCount += item.paginasNums.length;
        }
      });
    });

    const percent = Math.min(100, Math.round((paginasProntasCount / totalPaginas) * 100));

    const fillElem = document.getElementById("mapaProgressBarFill");
    const textElem = document.getElementById("mapaProgressText");

    if (fillElem) {
      fillElem.style.width = `${percent}%`;
    }
    if (textElem) {
      textElem.textContent = `${percent}% prontas (${paginasProntasCount}/${totalPaginas} páginas)`;
    }
  }

  // Atualizar mensagens em tempo real quando o usuário digita o nome
  function updateDynamicMessages(tabId) {
    const tabData = CONTEUDO[tabId];
    if (!tabData || !tabData.passos) return;

    const currentName = memberNames[tabId] || "";

    // Atualiza mensagens dos passos
    tabData.passos.forEach(passo => {
      if (passo.mensagem) {
        const box = document.getElementById(`msg-box-${passo.id}`);
        if (box) {
          box.textContent = processMessageText(passo.mensagem, currentName);
        }
      }
    });
  }

  // Atualização da barra de progresso da aba
  function updateProgress(tabData) {
    if (!tabData || !tabData.passos) return;

    const total = tabData.passos.length;
    let checkedCount = 0;

    tabData.passos.forEach(p => {
      if (checkedSteps[p.id]) {
        checkedCount++;
      }
    });

    const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

    const fillElem = document.getElementById("progressBarFill");
    const textElem = document.getElementById("progressText");

    if (fillElem) {
      fillElem.style.width = `${percent}%`;
    }
    if (textElem) {
      textElem.textContent = `${percent}% concluído (${checkedCount}/${total})`;
    }
  }

  // Limpar progresso com confirmação (reseta passos e status de páginas se confirmado)
  function setupResetButton() {
    const btn = document.getElementById("btnLimparProgresso");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const confirmReset = window.confirm(
        "Tem certeza que deseja limpar todo o progresso (passos marcados, status do mapa de páginas e nomes digitados)? Esta ação não pode ser desfeita."
      );

      if (confirmReset) {
        checkedSteps = {};
        memberNames = {};
        mapaStatus = {};
        localStorage.removeItem(STORAGE_KEY_CHECKED);
        localStorage.removeItem(STORAGE_KEY_NAMES);
        localStorage.removeItem(STORAGE_KEY_MAPA_STATUS);
        renderTabContent();
        showToast("Todo o progresso foi limpo com sucesso.");
      }
    });
  }

  // Função auxiliar para evitar injeção XSS simples
  function escapeHtml(text) {
    if (typeof text !== "string") return text;
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    loadStorage();
    renderNavTabs();
    renderTabContent();
    setupResetButton();
  });
})();
