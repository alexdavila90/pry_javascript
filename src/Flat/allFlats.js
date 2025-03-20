import { Flat } from "./Flat.js";

let flats = [];
let filteredFlats = [];
let sortedColumn = null;
let sortDirection = 1;
let showOnlyFavorites = false; // Estado del filtro de favoritos

document.addEventListener("DOMContentLoaded", () => loadFlats());

const loadFlats = () => {
    const tableBody = document.querySelector("#flatsTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de cargar

    const savedFlats = JSON.parse(localStorage.getItem("flatList")) || [];
    if (savedFlats.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='9'>No existen departamentos disponibles</td></tr>";
        return;
    }

    flats = savedFlats.map(flatData => new Flat(
        flatData.city,
        flatData.streetName,
        flatData.streetNumber,
        flatData.areaSize,
        flatData.hasAC,
        flatData.yearBuilt,
        flatData.rentPrice,
        flatData.dateAvailable
    ));

    applyFilters();
};

const renderTable = (flatsToRender) => {
    const tableBody = document.querySelector("#flatsTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla

    if (flatsToRender.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='10'>No existen departamentos</td></tr>";
        return;
    }

    const favorites = JSON.parse(localStorage.getItem("favoriteFlats")) || [];

    flatsToRender.forEach(flat => {
        const row = document.createElement("tr");
        const flatId = `${flat.city}-${flat.streetName}-${flat.streetNumber}`;
        const isFavorite = favorites.includes(flatId);

        const imgHTML = `<img src="/defaultFlat.jpg" style="width: 100px; height: auto; display: block; margin: auto; cursor: pointer;" onclick="showImageModal('/defaultFlat.jpg')">`;
        row.innerHTML = `
            <td>${imgHTML}</td> <!-- Nueva columna para la imagen -->
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize} m²</td>
            <td>${flat.hasAC ? "✅" : "❌"}</td>
            <td>${flat.yearBuilt}</td>
            <td>$${flat.rentPrice}</td>
            <td>${flat.dateAvailable}</td>
            <td>
                <button class="favorite-btn" data-id="${flatId}" style="background: none; border: none; color: ${isFavorite ? 'red' : 'white'}; font-size: 22px; cursor: pointer;">
                    ❤
                </button>
            </td>
        `;

        const favButton = row.querySelector(".favorite-btn");
        favButton.addEventListener("click", () => toggleFavorite(flatId));

        tableBody.appendChild(row);
    });
};

const applyFilters = () => {
    let cityFilter = document.getElementById("filterCity").value.trim().toLowerCase();
    let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    let maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    let minArea = parseFloat(document.getElementById("minArea").value) || 0;
    let maxArea = parseFloat(document.getElementById("maxArea").value) || Infinity;
    let favorites = JSON.parse(localStorage.getItem("favoriteFlats")) || [];

    filteredFlats = flats.filter(flat =>
        (cityFilter === "" || flat.city.toLowerCase().includes(cityFilter)) &&
        (flat.rentPrice >= minPrice && flat.rentPrice <= maxPrice) &&
        (flat.areaSize >= minArea && flat.areaSize <= maxArea)
    );

    if (showOnlyFavorites) {
        filteredFlats = filteredFlats.filter(flat => favorites.includes(`${flat.city}-${flat.streetName}-${flat.streetNumber}`));
    }

    renderTable(filteredFlats);
};

const resetFilters = () => {
    document.getElementById("filterCity").value = "";
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    document.getElementById("minArea").value = "";
    document.getElementById("maxArea").value = "";

    showOnlyFavorites = false;
    document.getElementById("favoriteFilterBtn").style.color = "white";

    applyFilters();
};

const toggleFavorite = (flatId) => {
    let favorites = JSON.parse(localStorage.getItem("favoriteFlats")) || [];

    if (favorites.includes(flatId)) {
        favorites = favorites.filter(id => id !== flatId);
    } else {
        favorites.push(flatId);
    }

    localStorage.setItem("favoriteFlats", JSON.stringify(favorites));
    applyFilters();
};

const toggleFavoriteFilter = () => {
    showOnlyFavorites = !showOnlyFavorites;
    document.getElementById("favoriteFilterBtn").style.color = showOnlyFavorites ? "red" : "white";
    applyFilters();
};

const sortFlats = (column) => {
    if (sortedColumn === column) {
        sortDirection *= -1;
    } else {
        sortedColumn = column;
        sortDirection = 1;
    }

    filteredFlats.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        if (typeof valueA === "string") {
            return valueA.localeCompare(valueB) * sortDirection;
        } else {
            return (valueA - valueB) * sortDirection;
        }
    });

    renderTable(filteredFlats);
};

// Función para abrir el modal y mostrar la imagen ampliada
window.showImageModal = (src) => {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex"; // Mostrar el modal
    modalImage.src = src;
};

// Función para cerrar el modal
window.closeModal = () => {
    document.getElementById("imageModal").style.display = "none";
};

// ** Asignar funciones al ámbito global **
window.sortFlats = sortFlats;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.toggleFavoriteFilter = toggleFavoriteFilter;


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
