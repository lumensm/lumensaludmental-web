// Almacena preferencias en localStorage
function setCookiePreferences(prefs) {
    localStorage.setItem('cookiePrefs', JSON.stringify(prefs));
}

// Recupera preferencias desde localStorage
function getCookiePreferences() {
    const prefs = localStorage.getItem('cookiePrefs');
    return prefs ? JSON.parse(prefs) : null;
}

// Mostrar u ocultar el banner según las preferencias
function initCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    const settingsModal = document.getElementById('cookie-settings-modal');
    const acceptBtn = document.getElementById('accept-cookies');
    const customizeBtn = document.getElementById('customize-cookies');
    const cancelSettings = document.getElementById('cancel-settings');
    const settingsForm = document.getElementById('cookie-settings-form');

    // Si no hay preferencias guardadas, mostrar banner
    if (!getCookiePreferences()) {
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }

    // Aceptar todas las cookies
    acceptBtn.addEventListener('click', () => {
        setCookiePreferences({
            necessary: true,
            analytics: true,
            advertising: true
        });
        banner.style.display = 'none';
        settingsModal.style.display = 'none';
    });

    // Abrir modal de personalización
    customizeBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // Cancelar personalización
    cancelSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Guardar preferencias desde el modal
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const analytics = settingsForm.analytics.checked;
        const advertising = settingsForm.advertising.checked;
        setCookiePreferences({
            necessary: true,
            analytics: analytics,
            advertising: advertising
        });
        banner.style.display = 'none';
        settingsModal.style.display = 'none';
    });
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', initCookieBanner);
