import { Flat } from "./Flat";

let flatSet = new Set();
let flats = JSON.parse(localStorage.getItem('flatList')) || []; // Recupera datos del localStorage

export const saveFlat = () => {
    const city = document.getElementById("city").value.trim();
    const streetName = document.getElementById("streetName").value.trim();
    const streetNumber = parseInt(document.getElementById("streetNumber").value);
    const areaSize = parseFloat(document.getElementById("areaSize").value);
    const hasAC = document.getElementById("hasAC").checked;
    const yearBuilt = parseInt(document.getElementById("yearBuilt").value);
    const rentPrice = parseFloat(document.getElementById("rentPrice").value);
    const dateAvailable = document.getElementById("dateAvailable").value;
    
    // Obtener imagen (Por ahora será la imagen por defecto)
    const imageSource = "/defaultFlat.jpg";

    // Validaciones
    if (!city || !streetName || isNaN(streetNumber) || isNaN(areaSize) || isNaN(yearBuilt) || isNaN(rentPrice) || !dateAvailable) {
        cleaner();
        document.getElementById('warningLabel').innerHTML = 'Se deben llenar todos los campos del departamento para guardar';
        document.getElementById('warningLabel').style.color = 'red';
        return;
    }

    // Validar ciudad (solo letras y espacios)
    const cityRegex = /^[a-zA-Z\s]+$/;
    if (!cityRegex.test(city)) {
        cleaner();
        warningCity.innerHTML = 'La ciudad solo puede contener letras y espacios.';
        warningCity.style.color = 'red';
        return;
    }

    if (yearBuilt < 1534 || yearBuilt > new Date().getFullYear()) {
        cleaner();
        warningYearBuilt.innerHTML = 'El año de construcción debe estar entre 1534 y el año actual.';
        warningYearBuilt.style.color = 'red';
        return;
    }

    if (streetNumber <= 0) {
        cleaner();
        warningStreetNumber.innerHTML = 'El número de calle debe ser un número positivo.';
        warningStreetNumber.style.color = 'red';
        return;
    }

    if (rentPrice <= 0) {
        cleaner();
        warningRentPrice.innerHTML = 'El precio de renta debe ser un número positivo.';
        warningRentPrice.style.color = 'red';
        return;
    }

    if (areaSize <= 0) {
        cleaner();
        warningAreaSize.innerHTML = 'El área de construcción debe ser un número positivo.';
        warningAreaSize.style.color = 'red';
        return;
    }

    if (new Date(dateAvailable) < new Date()) {
        cleaner();
        warningDateAvailable.innerHTML = 'La fecha de disponibilidad debe ser mayor a la fecha actual';
        warningDateAvailable.style.color = 'red';
        return;
    }

    // Crear objeto Flat con la imagen por defecto
    const flat = new Flat(city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable, imageSource);

    // Validar duplicados
    const isDuplicate = flats.some(f =>
        f.city === flat.city &&
        f.streetName === flat.streetName &&
        f.streetNumber === flat.streetNumber &&
        f.areaSize === flat.areaSize &&
        f.hasAC === flat.hasAC &&
        f.yearBuilt === flat.yearBuilt &&
        f.rentPrice === flat.rentPrice &&
        f.dateAvailable === flat.dateAvailable &&
        f.imageSource === flat.imageSource
    );

    if (isDuplicate) {
        cleaner();
        document.getElementById('warningLabel').innerHTML = 'Este departamento ya existe, por favor modificar los datos';
        document.getElementById('warningLabel').style.color = 'red';
        return;
    } else {
        // Guardar en localStorage
        flatSet = new Set([...flats, flat]);  
        flats = [...flatSet];
        localStorage.setItem('flatList', JSON.stringify(flats));

        cleaner();
        cleanerInputs();
        document.getElementById('warningLabel').innerHTML = 'El departamento ha sido ingresado exitosamente';
        document.getElementById('warningLabel').style.color = 'green';
    }

    console.log(flats);
};

const cleaner = () => {
    warningCity.innerHTML = '';
    warningYearBuilt.innerHTML = '';
    warningStreetNumber.innerHTML = '';
    warningRentPrice.innerHTML = '';
    warningAreaSize.innerHTML = '';
    warningDateAvailable.innerHTML = '';
    document.getElementById('warningLabel').innerHTML = '';
}

const cleanerInputs =()=>{
    document.getElementById('city').value=null;
    document.getElementById('streetName').value=null;
    document.getElementById('streetNumber').value=null;
    document.getElementById('areaSize').value=null;
    document.getElementById('hasAC').checked=false;
    document.getElementById('yearBuilt').value=null;
    document.getElementById('rentPrice').value=null;
    document.getElementById('dateAvailable').value=null;
}
window.saveFlat = saveFlat;
