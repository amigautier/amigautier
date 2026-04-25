//Header Scroll
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    var redes_sociales = document.querySelector(".redes_sociales1");
    header.classList.toggle("headerscroll", window.scrollY > 0);
    redes_sociales.classList.toggle("redes_sociales1_scroll1", window.scrollY > 0);
})

//Menú
function showmenu() {
    document.getElementById("mostrarmenu").classList.toggle("show");
    document.getElementById("redes_sociales1").classList.toggle("redes_sociales1_scroll");
    document.getElementById("centrarlogotipo").classList.toggle("centrarlogotipo_scroll");
}

//Animación Menú
let menu = document.getElementById("contenedormenu");

function myFunction(x) {
    menu.classList.toggle("change-contenedormenu");
    x.classList.toggle("change");
}

let noscroll = document.getElementById('contenedormenu');
noscroll.addEventListener('click', () => {

    document.body.classList.toggle('noscroll');
});