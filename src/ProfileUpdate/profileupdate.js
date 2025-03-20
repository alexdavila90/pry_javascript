//parte del Home
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






document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("usuarioSesion"));
    let usersList = JSON.parse(localStorage.getItem("usuariosList")) || [];

    if (!user) {
        alert("Se requiere iniciar sesión");
        window.location.href = "/src/Login/login.html";
        return;
    }

    // Precargar datos en los inputs
    document.getElementById("userName").value = user.username || ""; // No editable
    document.getElementById("firstName").value = user.firstName || ""; 
    document.getElementById("lastName").value = user.lastName || "";
    document.getElementById("email").value = user.email || "";

    // Convertir birthday de "DD-MM-YY" a "YYYY-MM-DD"
    if (user.birthday) {
        const [day, month, year] = user.birthday.split("-");
        const formattedDate = `20${year}-${month}-${day}`; // Ajustamos el año correctamente
        document.getElementById("date").value = formattedDate;
    } else {
        document.getElementById("date").value = "";
    }

    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let email = document.getElementById("email").value.trim();
        let currentPassword = document.getElementById("currentPassword").value.trim();
        let newPassword = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();
        let date = document.getElementById("date").value.trim();
        let errorMessage = document.getElementById("errorMessage");

        errorMessage.textContent = "";

        // Validación: Todos los campos obligatorios excepto la contraseña
        if (!firstName || !lastName || !email || !date) {
            errorMessage.textContent = "Todos los campos son obligatorios.";
            return;
        }

        // Validación de contraseña solo si los tres campos están llenos
        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                errorMessage.textContent = "Debes completar todos los campos de contraseña.";
                return;
            }

            // Verificar si la contraseña actual ingresada es correcta
            if (currentPassword !== user.password) {
                errorMessage.textContent = "La contraseña actual es incorrecta.";
                return;
            }

            // Verificar que la nueva contraseña sea válida
            if (newPassword.length < 8) {
                errorMessage.textContent = "La nueva contraseña debe tener al menos 8 caracteres.";
                return;
            }

            // Verificar que la confirmación sea igual a la nueva contraseña
            if (newPassword !== confirmPassword) {
                errorMessage.textContent = "Las contraseñas no coinciden.";
                return;
            }

            // Si todas las validaciones pasan, actualizar la contraseña
            user.password = newPassword;
        }

        // Convertir fecha al formato original "DD-MM-YY" antes de guardarla
        const [year, month, day] = date.split("-");
        const formattedBirthday = `${day}-${month}-${year.slice(2)}`;

        // Actualizar los demás datos del usuario
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.birthday = formattedBirthday; // Guardar en formato original

        // 🔥 Actualizar usuario en la lista de usuarios
        const userIndex = usersList.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            usersList[userIndex] = user;
            localStorage.setItem("usuariosList", JSON.stringify(usersList));
        }

        // 🔥 Guardar en usuarioSesion
        localStorage.setItem("usuarioSesion", JSON.stringify(user));

        alert("Perfil actualizado correctamente.");
        window.location.href = "/src/Home/home.html";
    });
});