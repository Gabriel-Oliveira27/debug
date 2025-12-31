// ============================================
// DEBUG - Script Principal
// ============================================

/**
 * Espera o DOM carregar completamente antes de executar
 */
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initContactButtons();
    initAnimations();
    initKeyboardShortcuts();
    initDebugPanel();
    initTestsArea();
    logWelcomeMessage();
    detectSystemTheme();
    initPerformanceMonitor();
    initEasterEgg();
    initConnectionMonitoring();
});

// ============================================
// SISTEMA DE TOAST/NOTIFICAÇÕES
// ============================================

/**
 * Mostra uma notificação toast
 * @param {string} title - Título da notificação
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duração em ms (padrão: 3000)
 */
function showToast(title, message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Botão de fechar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto-remover após duração
    setTimeout(() => removeToast(toast), duration);
    
    console.log(`🔔 Toast [${type}]: ${title} - ${message}`);
}

/**
 * Remove uma notificação toast
 */
function removeToast(toast) {
    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

// ============================================
// TOGGLE DE TEMA (CLARO/ESCURO)
// ============================================

/**
 * Inicializa o toggle de tema
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('debug-theme') || 'dark';
    
    // Aplica tema salvo
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Toggle de tema
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('debug-theme', isLight ? 'light' : 'dark');
        
        showToast(
            'Tema Alterado',
            `Tema ${isLight ? 'claro' : 'escuro'} ativado`,
            'success',
            2000
        );
        
        console.log(`🎨 Tema alterado para: ${isLight ? 'claro' : 'escuro'}`);
    });
    
    console.log('✅ Toggle de tema inicializado');
}

// ============================================
// BOTÕES DE CONTATO
// ============================================

/**
 * Inicializa os botões de contato com feedback visual
 */
function initContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-button');
    const floatButton = document.querySelector('.float-button');
    
    // Adiciona feedback visual ao clicar nos botões de contato
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Efeito de "clique"
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Log para debug
            const label = button.getAttribute('aria-label');
            console.log(`📱 Abrindo: ${label}`);
            
            addToConsoleLog(`Clique em: ${label}`);
        });
    });
    
    // Feedback para o botão "Solicite algo novo"
    if (floatButton) {
        floatButton.addEventListener('click', (e) => {
            floatButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                floatButton.style.transform = '';
            }, 150);
            
            console.log('📧 Abrindo solicitação por e-mail...');
            addToConsoleLog('Abrindo solicitação por e-mail');
        });
    }
    
    console.log('✅ Botões de contato inicializados');
}

// ============================================
// ANIMAÇÕES
// ============================================

/**
 * Inicializa animações e efeitos visuais
 */
function initAnimations() {
    const contentCard = document.querySelector('.content-card');
    
    // Observer para detectar quando o card está visível
    if (contentCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(contentCard);
    }
    
    // Efeito parallax suave no movimento do mouse (apenas desktop)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
            
            const icon = document.querySelector('.code-icon');
            if (icon) {
                icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
            }
        });
    }
    
    console.log('✅ Animações inicializadas');
}

// ============================================
// ATALHOS DE TECLADO
// ============================================

/**
 * Inicializa atalhos de teclado
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + E = Abrir e-mail
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            window.location.href = 'mailto:gab.oliveirab27@gmail.com';
            console.log('📧 Atalho: Abrindo e-mail');
            showToast('Atalho', 'Abrindo e-mail...', 'info', 2000);
        }
        
        // Ctrl/Cmd + W = Abrir WhatsApp
        if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
            e.preventDefault();
            window.open('https://wa.me/5588988568911', '_blank');
            console.log('💬 Atalho: Abrindo WhatsApp');
            showToast('Atalho', 'Abrindo WhatsApp...', 'info', 2000);
        }
        
        // Ctrl/Cmd + I = Abrir Instagram
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            window.open('https://instagram.com/_gabriel.ob', '_blank');
            console.log('📸 Atalho: Abrindo Instagram');
            showToast('Atalho', 'Abrindo Instagram...', 'info', 2000);
        }
        
        // Ctrl/Cmd + D = Toggle Debug Panel
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const panel = document.getElementById('debugPanel');
            panel.classList.toggle('active');
            console.log('🐛 Atalho: Toggle Debug Panel');
        }
        
        // Ctrl/Cmd + T = Toggle Tema
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            document.getElementById('themeToggle').click();
        }
    });
    
    console.log('✅ Atalhos de teclado inicializados');
    console.log('   • Ctrl/Cmd + E = E-mail');
    console.log('   • Ctrl/Cmd + W = WhatsApp');
    console.log('   • Ctrl/Cmd + I = Instagram');
    console.log('   • Ctrl/Cmd + D = Debug Panel');
    console.log('   • Ctrl/Cmd + T = Toggle Tema');
}

// ============================================
// PAINEL DE DEBUG
// ============================================

/**
 * Inicializa o painel de debug
 */
function initDebugPanel() {
    const debugToggle = document.getElementById('debugToggle');
    const debugPanel = document.getElementById('debugPanel');
    const debugClose = document.getElementById('debugClose');
    const debugTabs = document.querySelectorAll('.debug-tab');
    const btnCopyInfo = document.getElementById('btnCopyInfo');
    const btnClearConsole = document.getElementById('btnClearConsole');
    
    // Toggle painel
    debugToggle.addEventListener('click', () => {
        const isOpening = !debugPanel.classList.contains('active');
        debugPanel.classList.toggle('active');
        
        if (isOpening) {
            updateSystemInfo();
            updateNetworkInfo();
            showToast('Painel de Debug', 'Painel aberto', 'info', 2000);
        }
    });
    
    // Fechar painel
    debugClose.addEventListener('click', () => {
        debugPanel.classList.remove('active');
    });
    
    // Tabs
    debugTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active de todas as tabs
            debugTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.debug-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Ativa tab selecionada
            tab.classList.add('active');
            document.getElementById(`tab${capitalize(targetTab)}`).classList.add('active');
            
            // Atualiza informações se necessário
            if (targetTab === 'network') {
                updateNetworkInfo();
            }
        });
    });
    
    // Copiar informações do sistema
    btnCopyInfo.addEventListener('click', () => {
        const systemInfo = getSystemInfoText();
        copyToClipboard(systemInfo);
        showToast('Copiado!', 'Informações do sistema copiadas', 'success', 2000);
    });
    
    // Limpar console
    btnClearConsole.addEventListener('click', () => {
        document.getElementById('consoleOutput').innerHTML = '';
        showToast('Console', 'Console limpo', 'info', 2000);
    });
    
    console.log('✅ Painel de debug inicializado');
}

/**
 * Atualiza informações do sistema
 */
function updateSystemInfo() {
    // Navegador
    const browserInfo = getBrowserInfo();
    document.getElementById('browserInfo').textContent = browserInfo;
    
    // Resolução
    const resolution = `${window.innerWidth}x${window.innerHeight}`;
    document.getElementById('resolutionInfo').textContent = resolution;
    
    // User Agent
    document.getElementById('userAgentInfo').textContent = navigator.userAgent;
    
    // Conexão
    const isOnline = navigator.onLine ? 'Online' : 'Offline';
    document.getElementById('connectionInfo').textContent = isOnline;
    
    // Cookies
    const cookiesEnabled = navigator.cookieEnabled ? 'Habilitados' : 'Desabilitados';
    document.getElementById('cookiesInfo').textContent = cookiesEnabled;
    
    // Local Storage
    const storageAvailable = typeof(Storage) !== 'undefined' ? 'Disponível' : 'Indisponível';
    document.getElementById('storageInfo').textContent = storageAvailable;
}

/**
 * Atualiza informações de rede
 */
function updateNetworkInfo() {
    // Connection API (se disponível)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        const type = connection.effectiveType || 'Desconhecido';
        document.getElementById('connectionType').textContent = type;
        
        const speed = connection.downlink ? `${connection.downlink} Mbps` : 'Desconhecido';
        document.getElementById('connectionSpeed').textContent = speed;
    } else {
        document.getElementById('connectionType').textContent = 'Não disponível';
        document.getElementById('connectionSpeed').textContent = 'Não disponível';
    }
    
    // Status online/offline
    const status = navigator.onLine ? '✅ Online' : '❌ Offline';
    document.getElementById('onlineStatus').textContent = status;
    
    // Latência (ping simulado)
    measureLatency();
}

/**
 * Mede latência (ping)
 */
function measureLatency() {
    const start = performance.now();
    
    fetch('?ping=' + Date.now(), { method: 'HEAD' })
        .then(() => {
            const latency = Math.round(performance.now() - start);
            document.getElementById('latencyInfo').textContent = `${latency}ms`;
        })
        .catch(() => {
            document.getElementById('latencyInfo').textContent = 'Erro';
        });
}

/**
 * Adiciona log ao console do debug
 */
function addToConsoleLog(message) {
    const consoleOutput = document.getElementById('consoleOutput');
    const logEntry = document.createElement('div');
    logEntry.className = 'console-log';
    
    const time = new Date().toLocaleTimeString('pt-BR');
    logEntry.innerHTML = `
        <div class="console-time">[${time}]</div>
        <div class="console-message">${message}</div>
    `;
    
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

/**
 * Obtém informações do navegador
 */
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Desconhecido';
    
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Edg') > -1) browser = 'Edge';
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';
    else if (ua.indexOf('Opera') > -1) browser = 'Opera';
    
    return browser;
}

/**
 * Obtém texto com informações do sistema
 */
function getSystemInfoText() {
    return `
=== INFORMAÇÕES DO SISTEMA ===

Navegador: ${getBrowserInfo()}
Resolução: ${window.innerWidth}x${window.innerHeight}
User Agent: ${navigator.userAgent}
Conexão: ${navigator.onLine ? 'Online' : 'Offline'}
Cookies: ${navigator.cookieEnabled ? 'Habilitados' : 'Desabilitados'}
Local Storage: ${typeof(Storage) !== 'undefined' ? 'Disponível' : 'Indisponível'}
Plataforma: ${navigator.platform}
Idioma: ${navigator.language}
Data/Hora: ${new Date().toLocaleString('pt-BR')}
    `.trim();
}

/**
 * Copia texto para área de transferência
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores antigos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ============================================
// ÁREA DE TESTES
// ============================================

/**
 * Inicializa a área de testes
 */
function initTestsArea() {
    const btnAddTest = document.getElementById('btnAddTest');
    
    // Carrega testes salvos
    loadTests();
    
    // Adicionar teste
    btnAddTest.addEventListener('click', () => {
        const testName = prompt('Nome do teste:');
        if (testName && testName.trim()) {
            addTest(testName.trim());
            showToast('Teste Adicionado', testName, 'success', 2000);
        }
    });
    
    console.log('✅ Área de testes inicializada');
}

/**
 * Carrega testes do localStorage
 */
function loadTests() {
    const tests = JSON.parse(localStorage.getItem('debug-tests') || '[]');
    
    if (tests.length > 0) {
        document.querySelector('.message-wrapper .title').textContent = `${tests.length} Teste${tests.length > 1 ? 's' : ''} Ativo${tests.length > 1 ? 's' : ''}`;
        document.querySelector('.message-wrapper .message').textContent = 'Veja abaixo a lista de testes disponíveis. Clique em cada um para mais informações.';
        document.getElementById('testsArea').style.display = 'block';
        
        tests.forEach(test => renderTest(test));
    }
}

/**
 * Adiciona um novo teste
 */
function addTest(name) {
    const tests = JSON.parse(localStorage.getItem('debug-tests') || '[]');
    const test = {
        id: Date.now(),
        name: name,
        createdAt: new Date().toISOString(),
        status: 'Ativo'
    };
    
    tests.push(test);
    localStorage.setItem('debug-tests', JSON.stringify(tests));
    
    // Atualiza UI
    document.querySelector('.message-wrapper .title').textContent = `${tests.length} Teste${tests.length > 1 ? 's' : ''} Ativo${tests.length > 1 ? 's' : ''}`;
    document.querySelector('.message-wrapper .message').textContent = 'Veja abaixo a lista de testes disponíveis. Clique em cada um para mais informações.';
    document.getElementById('testsArea').style.display = 'block';
    
    renderTest(test);
    addToConsoleLog(`Teste adicionado: ${name}`);
}

/**
 * Renderiza um teste na UI
 */
function renderTest(test) {
    const testsGrid = document.getElementById('testsGrid');
    const testCard = document.createElement('div');
    testCard.className = 'test-card';
    testCard.dataset.testId = test.id;
    
    testCard.innerHTML = `
        <div class="test-info">
            <div class="test-name">${test.name}</div>
            <div class="test-status">
                <span class="test-status-dot"></span>
                ${test.status}
            </div>
        </div>
        <div class="test-actions">
            <button class="test-btn" onclick="viewTest(${test.id})" aria-label="Ver teste">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>
            <button class="test-btn danger" onclick="removeTest(${test.id})" aria-label="Remover teste">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    `;
    
    testsGrid.appendChild(testCard);
}

/**
 * Visualiza um teste
 */
function viewTest(testId) {
    const tests = JSON.parse(localStorage.getItem('debug-tests') || '[]');
    const test = tests.find(t => t.id === testId);
    
    if (test) {
        const createdDate = new Date(test.createdAt).toLocaleString('pt-BR');
        alert(`
Teste: ${test.name}
Status: ${test.status}
Criado em: ${createdDate}
ID: ${test.id}
        `.trim());
        
        addToConsoleLog(`Visualizando teste: ${test.name}`);
    }
}

/**
 * Remove um teste
 */
function removeTest(testId) {
    if (!confirm('Tem certeza que deseja remover este teste?')) {
        return;
    }
    
    let tests = JSON.parse(localStorage.getItem('debug-tests') || '[]');
    const test = tests.find(t => t.id === testId);
    
    tests = tests.filter(t => t.id !== testId);
    localStorage.setItem('debug-tests', JSON.stringify(tests));
    
    // Remove da UI
    const testCard = document.querySelector(`[data-test-id="${testId}"]`);
    if (testCard) {
        testCard.style.animation = 'slideOutLeft 0.3s ease-out';
        setTimeout(() => {
            testCard.remove();
            
            // Atualiza mensagem se não houver mais testes
            if (tests.length === 0) {
                document.querySelector('.message-wrapper .title').textContent = 'Nenhum Teste Ativo';
                document.querySelector('.message-wrapper .message').textContent = 'Olá! Se você está vendo isso é porque não há nada em testes no momento, não precisa se preocupar, mas não é necessário voltar a esse site novamente — apenas se o desenvolvedor pedir ou comunicar para testar.';
                document.getElementById('testsArea').style.display = 'none';
            } else {
                document.querySelector('.message-wrapper .title').textContent = `${tests.length} Teste${tests.length > 1 ? 's' : ''} Ativo${tests.length > 1 ? 's' : ''}`;
            }
        }, 300);
    }
    
    showToast('Teste Removido', test.name, 'success', 2000);
    addToConsoleLog(`Teste removido: ${test.name}`);
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Exibe mensagem de boas-vindas no console
 */
function logWelcomeMessage() {
    console.log(`
╔════════════════════════════════════════╗
║                                        ║
║        🐛 DEBUG - Repositório          ║
║        Desenvolvido por Gabriel        ║
║                                        ║
║  📧 E-mail: gab.oliveirab27@gmail.com  ║
║  💬 WhatsApp: (88) 98856-8911          ║
║  📸 Instagram: @_gabriel.ob            ║
║                                        ║
║  Atalhos de Teclado:                   ║
║  • Ctrl+E = E-mail                     ║
║  • Ctrl+W = WhatsApp                   ║
║  • Ctrl+I = Instagram                  ║
║  • Ctrl+D = Debug Panel                ║
║  • Ctrl+T = Toggle Tema                ║
║                                        ║
╚════════════════════════════════════════╝
    `);
    
    addToConsoleLog('Sistema iniciado com sucesso');
}

/**
 * Detecta se o usuário está em dispositivo móvel
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta tema do sistema operacional
 */
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('🌙 Tema escuro do sistema detectado');
    } else {
        console.log('☀️ Tema claro do sistema detectado');
    }
    
    // Listener para mudanças no tema do sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            console.log(`🎨 Tema do sistema alterado para: ${e.matches ? 'escuro' : 'claro'}`);
        });
    }
}

/**
 * Capitaliza primeira letra
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// PERFORMANCE MONITOR
// ============================================

/**
 * Monitora performance da página
 */
function initPerformanceMonitor() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
            
            // Métricas adicionais
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            console.log(`📊 DOM carregado em ${domContentLoaded}ms`);
            
            addToConsoleLog(`Página carregada em ${pageLoadTime}ms`);
            
            // Mostra toast se carregamento foi lento
            if (pageLoadTime > 3000) {
                showToast('Performance', 'Carregamento lento detectado', 'warning', 3000);
            }
        });
    }
}

// ============================================
// INTERAÇÃO COM BOTÕES (ANALYTICS SIMULADO)
// ============================================

/**
 * Rastreia cliques nos botões (simulação de analytics)
 */
function trackButtonClick(buttonType) {
    const timestamp = new Date().toLocaleString('pt-BR');
    console.log(`📊 [${timestamp}] Clique no botão: ${buttonType}`);
    
    // Aqui você pode adicionar integração com Google Analytics,
    // Plausible, ou qualquer outra ferramenta de analytics
}

// Adiciona tracking aos links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        const label = this.getAttribute('aria-label') || 'Link';
        trackButtonClick(label);
    });
});

// ============================================
// EASTER EGG
// ============================================

/**
 * Easter egg: Clique triplo no badge
 */
function initEasterEgg() {
    let clickCount = 0;
    const badge = document.querySelector('.badge');
    
    if (badge) {
        badge.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 3) {
                console.log('🎉 Easter Egg encontrado!');
                badge.style.animation = 'none';
                badge.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
                badge.style.borderColor = 'transparent';
                badge.style.color = 'white';
                badge.style.transform = 'scale(1.1)';
                
                showToast('🎉 Easter Egg!', 'Você encontrou um segredo!', 'success', 3000);
                addToConsoleLog('Easter Egg encontrado!');
                
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 300);
                
                clickCount = 0;
            }
            
            // Reset após 1 segundo
            setTimeout(() => {
                clickCount = 0;
            }, 1000);
        });
    }
}

// ============================================
// DETECÇÃO DE ONLINE/OFFLINE
// ============================================

/**
 * Monitora conexão
 */
function initConnectionMonitoring() {
    window.addEventListener('online', () => {
        console.log('✅ Conexão restaurada');
        showToast('Conexão', 'Conexão com internet restaurada', 'success', 3000);
        addToConsoleLog('Conexão restaurada');
        updateNetworkInfo();
    });
    
    window.addEventListener('offline', () => {
        console.log('❌ Conexão perdida');
        showToast('Sem Conexão', 'Conexão com internet perdida', 'error', 3000);
        addToConsoleLog('Conexão perdida');
        updateNetworkInfo();
    });
}

// Animação de slideout para testes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);
