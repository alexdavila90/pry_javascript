export class Flat {
    #city;
    #streetName;
    #streetNumber;
    #areaSize;
    #hasAC;
    #yearBuilt;
    #rentPrice;
    #dateAvailable;
    #imageSource;

    constructor(city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable, imageSource) {
        this.#city = city;
        this.#streetName = streetName;
        this.#streetNumber = streetNumber;
        this.#areaSize = areaSize;
        this.#hasAC = hasAC;
        this.#yearBuilt = yearBuilt;
        this.#rentPrice = rentPrice;
        this.#dateAvailable = dateAvailable;
        this.#imageSource=imageSource;
    }

    get city() {
        return this.#city;
    }
    
    get streetName() {
        return this.#streetName;
    }
    
    get streetNumber() {
        return this.#streetNumber;
    }
    
    get areaSize() {
        return this.#areaSize;
    }
    
    get hasAC() {
        return this.#hasAC;
    }
    
    get yearBuilt() {
        return this.#yearBuilt;
    }
    
    get rentPrice() {
        return this.#rentPrice;
    }
    
    get dateAvailable() {
        return this.#dateAvailable;
    }
    
    get imageSource() {
        return this.#imageSource;
    }
    
    toJSON() {
        return {
            city: this.#city,
            streetName: this.#streetName,
            streetNumber: this.#streetNumber,
            areaSize: this.#areaSize,
            hasAC: this.#hasAC,
            yearBuilt: this.#yearBuilt,
            rentPrice: this.#rentPrice,
            dateAvailable: this.#dateAvailable,
            imageSource: this.#imageSource
        };
    }

}

//para que funcione el header
import {borrarSesion, usuarioSesion} from '../Login/funciones';


document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("usuarioSesion"));

    if (!user) {
        alert("Se requiere iniciar sesión");
        window.location.href = "/src/Login/login.html";
        return;
    }


    document.querySelectorAll('.logout').forEach(function (element) {
        element.addEventListener('click', function (event) {
            borrarSesion();
        });
    });

    const usuarioS = usuarioSesion();
    console.log("UsuarioS", usuarioS);
    document.getElementById("uSesion").textContent = usuarioS;

});


//imagenes del fondo
const imagenes = [
    "url('/public/reg1.jpg')",
    "url('/public/reg2.jpg')",
    "url('/public/reg3.jpg')"
];

let indiceActual = 0;

function cambiarFondo() {
    document.body.style.backgroundImage = imagenes[indiceActual];
    indiceActual = (indiceActual + 1) % imagenes.length; // Bucle entre imágenes
}


setInterval(cambiarFondo, 4000);
