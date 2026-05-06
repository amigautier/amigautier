const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Obtener valores y limpiar espacios
    const formData = new FormData(contactForm);
    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    // 2. Validaciones
    if (firstName.length < 2) {
        showFeedback("First name must be at least 2 characters long.", "error");
        contactForm.querySelector('[name="firstName"]').focus();
        return;
    }

    if (lastName.trim().length < 2) {
        showFeedback("Last name must be at least 2 characters long.", "error");
        contactForm.querySelector('[name="lastName"]').focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        contactForm.querySelector('[name="email"]').focus();
        return;
    }

    if (subject.trim().length < 10 || subject.length > 100) {
        showFeedback("subject must be at least 5 characters long.", "error");
        contactForm.querySelector('[name="subject"]').focus();
        return;
    }

    if (message.length < 10 || message.length > 1000) {
        showFeedback("Message must be at least 10 characters long.", "error");
        contactForm.querySelector('[name="message"]').focus();
        return;
    }

    // 3. Adaptar los datos al formato que espera tu Worker de Cloudflare
    const dataParaWorker = {
        name: `${firstName} ${lastName}`,
        email: email,
        subject: subject,
        message: message // Metemos el asunto dentro del cuerpo del mensaje
    };

    // 4. Envío al Worker Real
    showFeedback("Sending message... ☽︎◯☾", "info");

    try {
        const response = await fetch('https://server-contact.herramientas-italics325.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataParaWorker)
        });

        if (response.ok) {
            showFeedback("Thanks for writing! I'll get back to you real soon. ❤︎", "success");
            contactForm.reset();
        } else {
            throw new Error();
        }
    } catch (error) {
        showFeedback("There was an error sending. Please try again later. ⚠", "error");
    }
});

function showFeedback(msg, type) {
    formResponse.textContent = msg;
    formResponse.className = `message-${type}`; // Usa esto para darle estilo en CSS
}


// Función que limpia el texto y obliga a la primera mayúscula
function restrictInputToLetters(inputElement) {
    inputElement.addEventListener('input', (e) => {
        // 1. Borra números, espacios y símbolos (solo deja letras)
        let limpio = e.target.value.replace(/[^a-zA-Záéí6óúñÁÉÍÓÚÑ]/g, '');
        
        // 2. Si hay texto, obliga a que la primera sea Mayúscula y el resto minúsculas
        if (limpio.length > 0) {
            limpio = limpio.charAt(0).toUpperCase() + limpio.slice(1).toLowerCase();
        }
        
        // 3. Devuelve el texto modificado a la caja
        e.target.value = limpio;
    });
}

// Aplicar el bloqueo a las dos cajas de texto usando su atributo 'name'
const firstNameBox = document.querySelector('[name="firstName"]');
const lastNameBox = document.querySelector('[name="lastName"]');

if (firstNameBox) restrictInputToLetters(firstNameBox);
if (lastNameBox) restrictInputToLetters(lastNameBox);

// --- MAYÚSCULA AUTOMÁTICA EN LA PRIMERA LETRA (SUBJECT Y MESSAGE) ---

function capitalizeFirstLetterOnly(inputElement) {
    inputElement.addEventListener('input', (e) => {
        let texto = e.target.value;
        
        // Si el usuario escribió algo, obligamos a que el primer carácter sea Mayúscula
        if (texto.length > 0) {
            e.target.value = texto.charAt(0).toUpperCase() + texto.slice(1);
        }
    });
}

// Aplicar a las cajas de Subject y Message
const subjectBox = document.querySelector('[name="subject"]');
const messageBox = document.querySelector('[name="message"]');

if (subjectBox) capitalizeFirstLetterOnly(subjectBox);
if (messageBox) capitalizeFirstLetterOnly(messageBox);

// DETENER EL TECLADO EN SECO A LOS 50 CARACTERES EN EL EMAIL
const emailBox = document.querySelector('[name="email"]');
if (emailBox) {
    emailBox.addEventListener('keydown', (e) => {
        // Permitir siempre teclas de control (Borrar, Flechas, Tab, etc.)
        const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (teclasPermitidas.includes(e.key)) {
            return; 
        }

        // Si ya llegó a 50 y presiona cualquier otra tecla, se congela el teclado
        if (e.target.value.length >= 70) {
            e.preventDefault(); // Bloquea la pulsación por completo
        }
    });
}