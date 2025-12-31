// ============================================
// TEST NOTIFIER - Notificador de Novos Testes
// ============================================

/**
 * CONFIGURAÇÃO
 * Altere os valores abaixo conforme necessário
 */
const TEST_NOTIFIER_CONFIG = {
    // ⚙️ Ative ou desative o notificador (true = ativado, false = desativado)
    enabled: true,
    
    // 🔗 Caminho do teste (pode ser URL relativa ou absoleta)
    testPath: 'teste-testado/index.html',
    
    // 📝 Nome do teste (opcional - aparece no tooltip)
    testName: 'Novo Teste Disponível',
    
    // 🎨 Personalização (opcional)
    buttonPosition: 'bottom-left', // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
    buttonColor: '#f59e0b', // Cor do botão (amber/laranja por padrão)
    pulseAnimation: true, // Animação de pulso no botão
    showBadge: true, // Mostrar badge de "NOVO"
    autoOpen: false, // Abrir automaticamente ao carregar a página (não recomendado)
    spinnerDuration: 1500, // Duração do spinner em ms (1500ms = 1.5s)
};

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa o Test Notifier
 */
function initTestNotifier() {
    // Verifica se está habilitado
    if (!TEST_NOTIFIER_CONFIG.enabled) {
        console.log('📴 Test Notifier desabilitado');
        return;
    }
    
    console.log('🔔 Test Notifier ativado!');
    console.log(`📍 Caminho do teste: ${TEST_NOTIFIER_CONFIG.testPath}`);
    
    // Cria o botão
    createNotifierButton();
    
    // Adiciona estilos
    injectNotifierStyles();
    
    // Auto-abrir se configurado (não recomendado)
    if (TEST_NOTIFIER_CONFIG.autoOpen) {
        setTimeout(() => {
            openTest();
        }, 1000);
    }
    
    // Notificação de boas-vindas
    if (typeof showToast === 'function') {
        showToast(
            '🔔 Novo Teste!',
            TEST_NOTIFIER_CONFIG.testName,
            'info',
            5000
        );
    }
}

// ============================================
// CRIAÇÃO DO BOTÃO
// ============================================

/**
 * Cria o botão notificador
 */
function createNotifierButton() {
    const button = document.createElement('button');
    button.id = 'testNotifierButton';
    button.className = 'test-notifier-button';
    button.setAttribute('aria-label', TEST_NOTIFIER_CONFIG.testName);
    button.setAttribute('title', TEST_NOTIFIER_CONFIG.testName);
    
    // Define posição
    button.classList.add(`position-${TEST_NOTIFIER_CONFIG.buttonPosition}`);
    
    // Ícone de lâmpada (light bulb)
    button.innerHTML = `
        <div class="notifier-icon-wrapper">
            <svg class="notifier-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="9" y1="18" x2="15" y2="18"></line>
                <line x1="10" y1="22" x2="14" y2="22"></line>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
            </svg>
            ${TEST_NOTIFIER_CONFIG.showBadge ? '<span class="notifier-badge">NOVO</span>' : ''}
        </div>
        
        <!-- Spinner (inicialmente oculto) -->
        <div class="notifier-spinner-wrapper" style="display: none;">
            <div class="notifier-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <svg class="spinner-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        </div>
    `;
    
    // Evento de clique
    button.addEventListener('click', handleNotifierClick);
    
    // Adiciona ao DOM
    document.body.appendChild(button);
    
    // Animação de entrada
    setTimeout(() => {
        button.classList.add('visible');
    }, 100);
    
    console.log('✅ Botão notificador criado');
}

// ============================================
// MANIPULAÇÃO DE EVENTOS
// ============================================

/**
 * Manipula o clique no botão notificador
 */
function handleNotifierClick(e) {
    e.preventDefault();
    
    const button = document.getElementById('testNotifierButton');
    if (button.classList.contains('loading')) {
        return; // Evita múltiplos cliques
    }
    
    console.log('🔔 Abrindo novo teste...');
    
    // Adiciona classe de loading
    button.classList.add('loading');
    
    // Esconde ícone, mostra spinner
    const iconWrapper = button.querySelector('.notifier-icon-wrapper');
    const spinnerWrapper = button.querySelector('.notifier-spinner-wrapper');
    
    iconWrapper.style.display = 'none';
    spinnerWrapper.style.display = 'flex';
    
    // Mostra toast de carregamento
    if (typeof showToast === 'function') {
        showToast(
            'Carregando...',
            'Abrindo teste em nova aba',
            'info',
            TEST_NOTIFIER_CONFIG.spinnerDuration
        );
    }
    
    // Adiciona ao console do debug
    if (typeof addToConsoleLog === 'function') {
        addToConsoleLog(`Abrindo teste: ${TEST_NOTIFIER_CONFIG.testPath}`);
    }
    
    // Simula carregamento e abre teste
    setTimeout(() => {
        openTest();
        
        // Animação de sucesso no spinner
        setTimeout(() => {
            spinnerWrapper.classList.add('success');
            
            // Após animação, remove botão ou restaura
            setTimeout(() => {
                // Opção 1: Remove o botão após abrir (teste foi visto)
                // button.classList.add('removing');
                // setTimeout(() => button.remove(), 300);
                
                // Opção 2: Restaura o botão (mantém visível)
                button.classList.remove('loading');
                spinnerWrapper.classList.remove('success');
                iconWrapper.style.display = 'flex';
                spinnerWrapper.style.display = 'none';
            }, 800);
        }, 400);
    }, TEST_NOTIFIER_CONFIG.spinnerDuration);
}

/**
 * Abre o teste em nova aba
 */
function openTest() {
    const path = TEST_NOTIFIER_CONFIG.testPath;
    
    // Verifica se é URL externa ou relativa
    if (path.startsWith('http://') || path.startsWith('https://')) {
        // URL externa
        window.open(path, '_blank', 'noopener,noreferrer');
    } else {
        // URL relativa - tenta abrir
        const testWindow = window.open(path, '_blank');
        
        if (!testWindow) {
            // Popup bloqueado
            console.warn('⚠️ Popup bloqueado! Tentando abrir na mesma aba...');
            
            if (typeof showToast === 'function') {
                showToast(
                    'Popup Bloqueado',
                    'Abrindo teste nesta aba...',
                    'warning',
                    2000
                );
            }
            
            setTimeout(() => {
                window.location.href = path;
            }, 1000);
        }
    }
    
    console.log(`✅ Teste aberto: ${path}`);
}

// ============================================
// ESTILOS
// ============================================

/**
 * Injeta os estilos do notificador
 */
function injectNotifierStyles() {
    const styleId = 'test-notifier-styles';
    
    // Verifica se já existe
    if (document.getElementById(styleId)) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* ============================================
           TEST NOTIFIER - ESTILOS
           ============================================ */
        
        .test-notifier-button {
            position: fixed;
            width: 70px;
            height: 70px;
            background: ${TEST_NOTIFIER_CONFIG.buttonColor};
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4),
                        0 0 0 0 rgba(245, 158, 11, 0.5);
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: scale(0);
            overflow: hidden;
        }
        
        .test-notifier-button.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Posicionamento */
        .test-notifier-button.position-bottom-left {
            bottom: 120px;
            left: 32px;
        }
        
        .test-notifier-button.position-bottom-right {
            bottom: 120px;
            right: 32px;
        }
        
        .test-notifier-button.position-top-left {
            top: 120px;
            left: 32px;
        }
        
        .test-notifier-button.position-top-right {
            top: 120px;
            right: 32px;
        }
        
        /* Animação de pulso */
        ${TEST_NOTIFIER_CONFIG.pulseAnimation ? `
        .test-notifier-button:not(.loading) {
            animation: notifier-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes notifier-pulse {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4),
                            0 0 0 0 rgba(245, 158, 11, 0.5);
            }
            50% {
                box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4),
                            0 0 0 15px rgba(245, 158, 11, 0);
            }
        }
        ` : ''}
        
        /* Hover */
        .test-notifier-button:not(.loading):hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(245, 158, 11, 0.5),
                        0 0 0 0 rgba(245, 158, 11, 0.5);
        }
        
        /* Estado de loading */
        .test-notifier-button.loading {
            animation: none;
            cursor: wait;
        }
        
        /* Wrapper do ícone */
        .notifier-icon-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        /* Ícone da lâmpada */
        .notifier-icon {
            width: 32px;
            height: 32px;
            color: white;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            animation: lightbulb-glow 2s ease-in-out infinite;
        }
        
        @keyframes lightbulb-glow {
            0%, 100% {
                opacity: 1;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
            50% {
                opacity: 0.8;
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))
                        drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
        }
        
        /* Badge "NOVO" */
        .notifier-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ef4444;
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 3px 6px;
            border-radius: 10px;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
            animation: badge-bounce 1s ease-in-out infinite;
        }
        
        @keyframes badge-bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-3px);
            }
        }
        
        /* ============================================
           SPINNER SOFISTICADO
           ============================================ */
        
        .notifier-spinner-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${TEST_NOTIFIER_CONFIG.buttonColor};
            border-radius: 50%;
        }
        
        .notifier-spinner {
            position: relative;
            width: 48px;
            height: 48px;
        }
        
        /* Anéis do spinner */
        .spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top-color: white;
            border-radius: 50%;
            animation: spinner-rotate 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        
        .spinner-ring:nth-child(1) {
            animation-delay: -0.45s;
            opacity: 1;
        }
        
        .spinner-ring:nth-child(2) {
            animation-delay: -0.3s;
            opacity: 0.7;
            width: 85%;
            height: 85%;
            top: 7.5%;
            left: 7.5%;
        }
        
        .spinner-ring:nth-child(3) {
            animation-delay: -0.15s;
            opacity: 0.4;
            width: 70%;
            height: 70%;
            top: 15%;
            left: 15%;
        }
        
        @keyframes spinner-rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        /* Check mark (aparece no sucesso) */
        .spinner-check {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 28px;
            height: 28px;
            color: white;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notifier-spinner-wrapper.success .spinner-ring {
            animation: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .notifier-spinner-wrapper.success .spinner-check {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            animation: checkmark-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes checkmark-pop {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(-45deg);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
        
        /* Animação de remoção */
        .test-notifier-button.removing {
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
        }
        
        /* ============================================
           RESPONSIVIDADE
           ============================================ */
        
        @media (max-width: 768px) {
            .test-notifier-button {
                width: 60px;
                height: 60px;
            }
            
            .test-notifier-button.position-bottom-left,
            .test-notifier-button.position-top-left {
                left: 20px;
            }
            
            .test-notifier-button.position-bottom-right,
            .test-notifier-button.position-top-right {
                right: 20px;
            }
            
            .test-notifier-button.position-bottom-left,
            .test-notifier-button.position-bottom-right {
                bottom: 100px;
            }
            
            .test-notifier-button.position-top-left,
            .test-notifier-button.position-top-right {
                top: 100px;
            }
            
            .notifier-icon {
                width: 28px;
                height: 28px;
            }
            
            .notifier-badge {
                font-size: 8px;
                padding: 2px 5px;
            }
        }
        
        @media (max-width: 480px) {
            .test-notifier-button {
                width: 56px;
                height: 56px;
            }
            
            .test-notifier-button.position-bottom-left,
            .test-notifier-button.position-top-left {
                left: 16px;
            }
            
            .test-notifier-button.position-bottom-right,
            .test-notifier-button.position-top-right {
                right: 16px;
            }
            
            .test-notifier-button.position-bottom-left,
            .test-notifier-button.position-bottom-right {
                bottom: 90px;
            }
            
            .notifier-icon {
                width: 24px;
                height: 24px;
            }
        }
        
        /* ============================================
           ACESSIBILIDADE
           ============================================ */
        
        @media (prefers-reduced-motion: reduce) {
            .test-notifier-button,
            .notifier-icon,
            .notifier-badge,
            .spinner-ring {
                animation: none !important;
            }
        }
        
        .test-notifier-button:focus-visible {
            outline: 3px solid white;
            outline-offset: 4px;
        }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Estilos do notificador injetados');
}

// ============================================
// UTILITÁRIOS PÚBLICOS
// ============================================

/**
 * Ativa o notificador programaticamente
 * @param {string} testPath - Caminho do teste
 * @param {string} testName - Nome do teste (opcional)
 */
function enableTestNotifier(testPath, testName = 'Novo Teste Disponível') {
    TEST_NOTIFIER_CONFIG.enabled = true;
    TEST_NOTIFIER_CONFIG.testPath = testPath;
    TEST_NOTIFIER_CONFIG.testName = testName;
    
    // Remove botão existente se houver
    const existingButton = document.getElementById('testNotifierButton');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Recria
    initTestNotifier();
    
    console.log(`✅ Test Notifier habilitado: ${testPath}`);
}

/**
 * Desativa o notificador programaticamente
 */
function disableTestNotifier() {
    TEST_NOTIFIER_CONFIG.enabled = false;
    
    const button = document.getElementById('testNotifierButton');
    if (button) {
        button.classList.add('removing');
        setTimeout(() => button.remove(), 300);
    }
    
    console.log('📴 Test Notifier desabilitado');
}

/**
 * Verifica se o notificador está ativo
 * @returns {boolean}
 */
function isTestNotifierEnabled() {
    return TEST_NOTIFIER_CONFIG.enabled;
}

// ============================================
// AUTO-INICIALIZAÇÃO
// ============================================

// Aguarda DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestNotifier);
} else {
    // DOM já carregado
    initTestNotifier();
}

// Exporta funções para uso global (opcional)
window.TestNotifier = {
    enable: enableTestNotifier,
    disable: disableTestNotifier,
    isEnabled: isTestNotifierEnabled,
    config: TEST_NOTIFIER_CONFIG
};
