// ============================================
// DEBUG - Script Principal
// ============================================

/**
 * Espera o DOM carregar completamente antes de executar
 */
document.addEventListener('DOMContentLoaded', () => {
    initContactButtons();
    initAnimations();
    initKeyboardShortcuts();
    logWelcomeMessage();
});

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
    
    // Animação de entrada escalonada para os botões de contato
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach((button, index) => {
        button.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        button.style.animation = 'fadeInScale 0.5s ease-out forwards';
    });
    
    // Adiciona CSS da animação
    if (!document.getElementById('dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
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
        }
        
        // Ctrl/Cmd + W = Abrir WhatsApp
        if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
            e.preventDefault();
            window.open('https://wa.me/5588988568911', '_blank');
            console.log('💬 Atalho: Abrindo WhatsApp');
        }
        
        // Ctrl/Cmd + I = Abrir Instagram
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            window.open('https://instagram.com/_gabriel.ob', '_blank');
            console.log('📸 Atalho: Abrindo Instagram');
        }
    });
    
    console.log('✅ Atalhos de teclado inicializados');
    console.log('   • Ctrl/Cmd + E = E-mail');
    console.log('   • Ctrl/Cmd + W = WhatsApp');
    console.log('   • Ctrl/Cmd + I = Instagram');
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
║                                        ║
╚════════════════════════════════════════╝
    `);
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
        console.log('🌙 Tema escuro detectado (perfeito!)');
    } else {
        console.log('☀️ Tema claro detectado');
    }
}

// Executa detecção de tema
detectSystemTheme();

// ============================================
// PERFORMANCE MONITOR
// ============================================

/**
 * Monitora performance da página
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
        
        // Métricas adicionais
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        console.log(`📊 DOM carregado em ${domContentLoaded}ms`);
    });
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
// EASTER EGG SIMPLES
// ============================================

/**
 * Easter egg: Clique triplo no badge
 */
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

// ============================================
// DETECÇÃO DE ONLINE/OFFLINE
// ============================================

window.addEventListener('online', () => {
    console.log('✅ Conexão restaurada');
});

window.addEventListener('offline', () => {
    console.log('❌ Conexão perdida');
});
