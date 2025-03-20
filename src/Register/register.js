import { User } from "../Login/users";

const register = (username,email,password,firstName,lastName,birthday) => {
    const newUser = new User(username,email,password,firstName,lastName,birthday);
    let usuarios= JSON.parse(localStorage.getItem('usuariosList'));
    usuarios = [...usuarios,newUser];
    localStorage.setItem('usuariosList', JSON.stringify(usuarios))
    
    /*function userExists(set, username) {
        for (let user of set) {
            if (user.username === username) {
                return true;
            }
        }
        return false;
    }
    
    if (userExists(usuariosSet, newUser.username)) {
        alert("Usuario duplicado");
        console.log("El usuario ya existe en el set");
    } else {
        usuariosSet.add(newUser);
        usuarios = [...usuariosSet];
        localStorage.setItem('usuariosList', JSON.stringify(usuarios));
        console.log(usuarios);
    } */
}




document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("userName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let date = document.getElementById("date").value.trim();
    let errorMessage = document.getElementById("errorMessage");

    if (!userName || !email || !password || !confirmPassword || !firstName || !lastName || !date ) {
        errorMessage.textContent = "Todos los campos son obligatorios.";
        return;
    }

    if (password.length < 8) {
        errorMessage.textContent = "La contraseña debe tener al menos 8 caracteres.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        return;
    }

    register( userName,
        email,
        password,
        firstName,
        lastName,
        date);
    alert("Usuario creado con exito");

    window.location.href = "/src/Home/home.html";

});


// imagenes de fondo 

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
