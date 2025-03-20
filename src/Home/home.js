
import {borrarSesion, usuarioSesion} from '../Login/funciones';

import './home.css'

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


//carrusel 

const flatsFromStorage = JSON.parse(localStorage.getItem("flatList"));
let currentIndex = 0;

// Referencias a elementos del carrusel
const carouselContent = document.getElementById("carouselContent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Función para renderizar un flat
function renderFlat(index) {
    const flat = flatsFromStorage[index]; // Obtenemos el flat actual
    if (!flat) {
        console.error("No se encontró el objeto Flat en el índice:", index);
        return;
    }

    carouselContent.innerHTML = `
        <div class="card">
            <img src="${flat.imageSource}" alt="Imagen de la propiedad">
            <h3>${flat.city}</h3>
            <p>Dirección: ${flat.streetName} ${flat.streetNumber}</p>
            <p>Área: ${flat.areaSize}  </p>
            <p>Año: ${flat.yearBuilt}</p>
            <p><strong>Precio de renta: ${flat.rentPrice}$</strong></p>
            <p>Disponible: ${flat.dateAvailable}</p>
            
            <!-- Iconos en la parte inferior -->
            <div class="card-icons">
                <i class="fa-solid fa-thumbs-up"></i> 
                <i class="fa-solid fa-comment"></i> 
            </div>
        </div>
    `;
}

// Event listeners para los botones
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + flatsFromStorage.length) % flatsFromStorage.length;
    renderFlat(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % flatsFromStorage.length;
    renderFlat(currentIndex);
});

// Renderiza el primer flat
renderFlat(currentIndex);








