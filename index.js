const tablaEncriptacion = {
    "a" : "ai",
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "u" : "ufat"
};
const keys = Object.keys(tablaEncriptacion);
const values = Object.values(tablaEncriptacion);



function cambioDeEstadoDeLaBox(orden, aBlanquear){
    let cuerpoBox = document.querySelector(".cuerpo__desencriptador__box");
    let cuerpoTexto = document.querySelector(".cuerpo__desencriptador__texto");

    if (orden === "mostrarDesencriptar"){
        //Muestra el texto encriptado/desencriptado
        cuerpoBox.style.display = "none";
        cuerpoTexto.style.display = "flex";
        aBlanquear.value = "";
    } else if(orden === "ocultarDesencriptar") {
        //Resetea las pestañas a como estaban en un inicio
        cuerpoBox.style.display = "flex";
        cuerpoTexto.style.display = "none";
    }
}

function encriptar(texto){
    /* Reemplaza cada carácter del texto por el valor correspondiente en la tablaEncriptacion, 
    o lo deja igual si no hay un valor correspondiente*/
    return texto.split('').map(char => tablaEncriptacion[char] || char).join('');
}

function desencriptar(texto){
    for (let i = 0 ; i< keys.length ; i++){
        texto = texto.replaceAll(values[i], keys[i]);
    }
    return texto;
}

function manejadorAcciones(accion) {
  const textoEntradaUser = document.getElementById("textArea").value;
  const elementoBoxMostrar = document.querySelector(".cuerpo__desencriptador__texto__encriptado");

  if (textoEntradaUser) {
    switch (accion) {
        case "encriptar":
            elementoBoxMostrar.textContent = encriptar(textoEntradaUser);
            break;
        case "desencriptar":
            elementoBoxMostrar.textContent = desencriptar(textoEntradaUser);
            break;
    }
    cambioDeEstadoDeLaBox("mostrarDesencriptar", textoEntradaUser);
  } else {
    cambioDeEstadoDeLaBox("ocultarDesencriptar");
  }
}


const copiarContenido = async () => {
    const texto = document.querySelector(".cuerpo__desencriptador__texto__encriptado").textContent;
    console.log(texto);
    try {
        await navigator.clipboard.writeText(texto);
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
}

