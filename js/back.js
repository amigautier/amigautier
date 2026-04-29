//Botón Back
document.addEventListener("DOMContentLoaded", function(){

    const botonBack = document.getElementById("boton_back");

    if(!botonBack) return;

    botonBack.addEventListener("click", function(e){

        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const from = params.get("from");

        const rutas = {

            index: "/#tarjetas",
            editorial: "/editorial",
            product: "/product",
        };

        window.location.href = rutas[from] || "/";

    });

});