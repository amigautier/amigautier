async function includeHTML(filePath, elementId) {
    const placeholder = document.getElementById(elementId);

    if (!placeholder) {
        console.error(`Error: Contenedor con ID '${elementId}' no encontrado.`);
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Fallo al cargar ${filePath}: ${response.status}`);
        }

        const htmlContent = await response.text();

        // Inyectar el HTML
        placeholder.innerHTML = htmlContent;

        // Activar lógica del menú y link activo
        if (elementId === 'header-placeholder') {
            if (typeof initializeMenuLogic === 'function') {
                initializeMenuLogic();
            }
            if (typeof highlightActiveLink === 'function') {
                highlightActiveLink(); // <--- LLAMADA DE LA NUEVA FUNCIÓN
                console.log("Header inyectado, lógica de menú y link activo activados.");
            } else {
                console.log("Header inyectado y lógica del menú activada.");
            }
        }

        // Activar lógica del footer
        if (elementId === 'footer-placeholder' && typeof updateFooterDate === 'function') {
            updateFooterDate();
            console.log("Footer inyectado y fecha actualizada.");
        }

    } catch (error) {
        console.error(`Error de inclusión para ${filePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada para el Header
    await includeHTML('header.html', 'header-placeholder');

    // Llamada para el Footer!
    await includeHTML('footer.html', 'footer-placeholder');

    console.log("Inyección de Header y Footer completada.");
});

// Función que inserta la fecha
function updateFooterDate() {
    const yearContainer = document.getElementById('footer-current-year');

    if (yearContainer && typeof actualizarfecha !== 'undefined') {
        yearContainer.textContent = actualizarfecha;
    } else {
        console.error("Error: No se pudo actualizar la fecha del footer. Revisa el ID o la variable 'actualizarfecha'.");
    }
}

// Función que desactiva TODOS los enlaces dentro del elemento de menú activo
function highlightActiveLink() {
    const path = window.location.pathname;
    let currentPageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').replace('.php', '');

    if (currentPageName === '' || currentPageName === '/') {
        currentPageName = 'index';
    }

    const menuItems = document.querySelectorAll('.menu-main li[data-page]');

    menuItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');

        if (itemPage === currentPageName) {
            const allLinks = item.querySelectorAll('a');

            console.log(`Página activa detectada: '${currentPageName}'. Bloqueando ${allLinks.length} enlaces del menú principal.`);

            allLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.warn(`Clic bloqueado en enlace de menú. Ya estás en: ${currentPageName}`);
                });
            });
        }
    });

    if (currentPageName === 'index') {
        const logoLink = document.querySelector('.logotipo a[href="index"]');

        if (logoLink) {
            console.log("Página de inicio detectada. Bloqueando el enlace del logotipo.");
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.warn("Clic bloqueado en el logotipo. Ya estás en la página de inicio (index).");
            });
        }
    }
}



// Función para calcular y establecer la altura real del viewport
function setVhProperty() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('load', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);

