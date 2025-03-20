import { login, miUsuario, register } from './funciones';
import './login.css'


//cambio imagenes

let currentImageIndex = 0;
const images = document.querySelectorAll('.imagenes img');
const totalImages = images.length;

function changeImage() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    images[currentImageIndex].classList.add('active');
}

setInterval(changeImage, 3000); 



let user = JSON.parse(localStorage.getItem("usuariosList"));
if (!user) {
    miUsuario(); 
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.querySelector('input[name="user"]').value;
    const password = document.querySelector('input[name="password"]').value;
    console.log(username);
    console.log(password);
    login(username,password);
});

