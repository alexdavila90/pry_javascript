
import { User } from './users';

//crear usuarios
let usuariosSet = new Set();
let usuarios = [];

export const miUsuario = () => {
    const usuario = new User('admin', 'admin@gmail.com', 'admin123', 'admin', 'superadmin', '1994-11-02');
    usuariosSet.add(usuario);
    usuarios = [...usuariosSet];
    console.log(usuarios);
    localStorage.setItem('usuariosList', JSON.stringify(usuarios));
}

// Agregar usuarios
export const register = (username,email,password,firstName,lastName,birthday) => {
    const newUser = new User(username,email,password,firstName,lastName,birthday);
    let usuarios= JSON.parse(localStorage.getItem('usuariosList'));
    usuarios = [...usuarios,newUser];
    localStorage.setItem('usuariosList', JSON.stringify(usuarios));
    
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

export const login=(username,password)=>{

    const usuarios= JSON.parse(localStorage.getItem('usuariosList'));
    const usuario=usuarios.find((usuario)=>usuario.username===username);
    if(usuario && usuario.username===username&&usuario.password===password){
        //window.location.href="home.html"
        window.location.href = "/src/Home/home.html";
        localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
    }else{
        document.getElementById('error').style.display='block';
    }
}

export const borrarSesion =()=>{
    localStorage.removeItem('usuarioSesion');
}

export const usuarioSesion=()=>{
    const usuarioSesion= JSON.parse(localStorage.getItem('usuarioSesion'));
    // console.log(usuarioSesion);
    const usuariosArray = Object.values(usuarioSesion);
    console.log(usuariosArray);
    const username = usuariosArray[3];
    console.log(username);
    return username;
}

