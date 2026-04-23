/*Variables*/
const btnCierra = document.querySelector('#btn-cierra');
const btnAdelanta = document.querySelector('#btn-adelanta');
const btnRetrocede = document.querySelector('#btn-retrocede');
const imagenes = document.querySelectorAll('.cont_carrusel_scroll img, .cardspresets img, .fotosbackstage img');
const lightbox = document.querySelector('#lightbox');
const imagenActiva = document.querySelector('#img-activa');
//////
const checkbox = document.querySelectorAll('.slider input[name="sradio"]');
const checkbox1 = document.querySelector('input[id="sbutton1"]');
const checkbox2 = document.querySelector('input[id="sbutton2"]');
const checkbox3 = document.querySelector('input[id="sbutton3"]');
const checkbox4 = document.querySelector('input[id="sbutton4"]');
/////
let indicecheckbox = 0;
let indiceImagen = 0;

/*Abre el Lightbox*/

const abreLightbox = (event) => {
  imagenActiva.src = event.target.src;
  lightbox.style.display = 'flex';
  indiceImagen = Array.from(imagenes).indexOf(event.target);
  document.body.classList.toggle('noscroll2');


  document.querySelectorAll(".cont_carrusel_scroll, .fotosbackstage").forEach(el => {
    el.addEventListener("click", e => {
      const id = e.target.getAttribute("id");
      // console.log("Se ha clickeado el id "+id);

      // document.querySelector('input[name="sradio"]:checked')

      btnRetrocede.style.display = 'block';
      btnAdelanta.style.display = 'block';

      if (indiceImagen == imagenes.length - 1) {
        btnAdelanta.style.display = 'none';
      }

    });
  });

};

imagenes.forEach((imagen) => {
  imagen.addEventListener('click', abreLightbox);
});

/*Cierra el Lightbox */

btnCierra.addEventListener('click', () => {
  document.body.classList.remove('noscroll2');
  lightbox.style.display = 'none';
});

window.addEventListener('keyup', function (e) {
  if (e.keyCode == 27) {
    document.body.classList.remove('noscroll2');
    lightbox.style.display = 'none';
  }
});

imagenActiva.addEventListener('click', () => {
  document.body.classList.remove('noscroll2');
  lightbox.style.display = 'none';
});

/* Adelanta la imagen*/

const adelantaImagen = () => {
  if (indiceImagen == imagenes.length - 2) {
    // indiceImagen = -1;
    btnAdelanta.style.display = 'none';
  }
  if (indiceImagen < imagenes.length) {
    btnRetrocede.style.display = 'block';
  }
  imagenActiva.src = imagenes[indiceImagen + 1].src;
  indiceImagen++;

  if (indicecheckbox == 0) {
    checkbox1.checked = false;
    checkbox2.checked = true;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 1) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = true;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 2) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = false;
    checkbox4.checked = true;
  }

  indicecheckbox++;
};

btnAdelanta.addEventListener('click', adelantaImagen);

window.addEventListener('keyup', function (e) {
  if (e.keyCode == 39) {
    if (indiceImagen == imagenes.length - 2) {
      // indiceImagen = -1;
      btnAdelanta.style.display = 'none';
    }
    if (indiceImagen < imagenes.length) {
      btnRetrocede.style.display = 'block';
    }

    imagenActiva.src = imagenes[indiceImagen + 1].src;
    indiceImagen++;

    if (indicecheckbox == 0) {
      checkbox1.checked = false;
      checkbox2.checked = true;
      checkbox3.checked = false;
      checkbox4.checked = false;
    }
    if (indicecheckbox == 1) {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = true;
      checkbox4.checked = false;
    }
    if (indicecheckbox == 2) {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = false;
      checkbox4.checked = true;
    }

    indicecheckbox++;
  }
});


document.addEventListener('swiped-left', function (e) {
  console.log(e.target); // the element that was swiped
  if (indiceImagen == imagenes.length - 2) {
    // indiceImagen = -1;
    btnAdelanta.style.display = 'none';
  }
  if (indiceImagen < imagenes.length) {
    btnRetrocede.style.display = 'block';
  }

  imagenActiva.src = imagenes[indiceImagen + 1].src;
  indiceImagen++;

  if (indicecheckbox == 0) {
    checkbox1.checked = false;
    checkbox2.checked = true;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 1) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = true;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 2) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = false;
    checkbox4.checked = true;
  }

  indicecheckbox++;
});

/*Retrocede la Imagen*/

const retrocederImagen = () => {
  if (indiceImagen === 1) {
    //indiceImagen = imagenes.length;
    btnRetrocede.style.display = 'none';
  }
  if (indiceImagen < imagenes.length) {
    btnAdelanta.style.display = 'block';
  }
  imagenActiva.src = imagenes[indiceImagen - 1].src;
  indiceImagen--;


  if (indicecheckbox == 1) {
    checkbox1.checked = true;
    checkbox2.checked = false;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 2) {
    checkbox1.checked = false;
    checkbox2.checked = true;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 3) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = true;
    checkbox4.checked = false;
  }

  indicecheckbox--;
};

btnRetrocede.addEventListener('click', retrocederImagen);

window.addEventListener('keyup', function (e) {
  if (e.keyCode == 37) {
    if (indiceImagen === 1) {
      //indiceImagen = imagenes.length;
      btnRetrocede.style.display = 'none';
    }
    if (indiceImagen < imagenes.length) {
      btnAdelanta.style.display = 'block';
    }
    imagenActiva.src = imagenes[indiceImagen - 1].src;
    indiceImagen--;

    if (indicecheckbox == 1) {
      checkbox1.checked = true;
      checkbox2.checked = false;
      checkbox3.checked = false;
      checkbox4.checked = false;
    }
    if (indicecheckbox == 2) {
      checkbox1.checked = false;
      checkbox2.checked = true;
      checkbox3.checked = false;
      checkbox4.checked = false;
    }
    if (indicecheckbox == 3) {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = true;
      checkbox4.checked = false;
    }

    indicecheckbox--;
  }
});

document.addEventListener('swiped-right', function (e) {
  console.log(e.target); // the element that was swiped
  if (indiceImagen === 1) {
    //indiceImagen = imagenes.length;
    btnRetrocede.style.display = 'none';
  }
  if (indiceImagen < imagenes.length) {
    btnAdelanta.style.display = 'block';
  }
  imagenActiva.src = imagenes[indiceImagen - 1].src;
  indiceImagen--;

  if (indicecheckbox == 1) {
    checkbox1.checked = true;
    checkbox2.checked = false;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 2) {
    checkbox1.checked = false;
    checkbox2.checked = true;
    checkbox3.checked = false;
    checkbox4.checked = false;
  }
  if (indicecheckbox == 3) {
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = true;
    checkbox4.checked = false;
  }

  indicecheckbox--;
});