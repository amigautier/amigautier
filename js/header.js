// 1. Lógica del Scroll del Header (Se mantiene igual)
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    var redes_sociales = document.querySelector(".redes_sociales1");
    if (header) header.classList.toggle("headerscroll", window.scrollY > 0);
    if (redes_sociales) redes_sociales.classList.toggle("redes_sociales1_scroll1", window.scrollY > 0);
});

// 2. Función del Menú (Abre el menú y bloquea el scroll)
function showmenu() {
    const menuUl = document.getElementById("mostrarmenu");
    const redes = document.getElementById("redes_sociales1");
    const logo = document.getElementById("centrarlogotipo");

    if (menuUl) menuUl.classList.toggle("show");
    if (redes) redes.classList.toggle("redes_sociales1_scroll");
    if (logo) logo.classList.toggle("centrarlogotipo_scroll");

    // BLOQUEO DE SCROLL: Aquí es donde debe ir
    document.body.classList.toggle('noscroll');
}

// 3. Animación del Botón Hamburguesa
function myFunction(x) {
    // 'x' es el elemento 'this' que pasas desde el HTML
    x.classList.toggle("change-contenedormenu");
    x.classList.toggle("change");
}