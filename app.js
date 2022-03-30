'use strict';
const formulario = document.querySelector('form');
const botonSubmit = document.querySelector('form button');
const marcoHobbies =  document.querySelector('#marcoHobbies');
const inputNombre = document.querySelector('#nombre');
const inputContrasenia = document.querySelector('#pass');
const inputTelefono = document.querySelector('#tel');
const checkBoxes = document.querySelectorAll('[name=hobbies]');
// const checkboxes = document.getElementsByName('hobbies');
const radioButons = document.querySelectorAll('[name=nacionalidad]');

const mensajeNombre = document.querySelector('#mensajeNombre');

// objeto auxiliar para datos
const datosUsuario = {
    nombre: "",
    contrasenia: "",
    telefono: "",
    hobbies: [],
    nacionalidad: ""
};

//Nombre

function validarNombre(nombre) {
    let criterio = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(.{1,8}$)");

    if(criterio.test(nombre)){
        mensajeNombre.classList.add('oculto');
        inputNombre.classList.remove('error');
        return true;
    }

    mensajeNombre.classList.remove('oculto');
    inputNombre.classList.add('error');

    return false;
}

inputNombre.addEventListener('input', function () {
    datosUsuario.nombre="";
    if (validarNombre(inputNombre.value)) {
        datosUsuario.nombre = inputNombre.value
    }

});


//Contraseña

function validarContrasenia(contrasenia) {
    let criterio = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{10,15}$)");

    if(criterio.test(contrasenia)){
        mensajeContrasenia.classList.add('oculto');
        inputContrasenia.classList.remove('error');
        return true;
    }

    mensajeContrasenia.classList.remove('oculto');
    inputContrasenia.classList.add('error');

    return false;
}



inputContrasenia.addEventListener('input', function () {
    datosUsuario.contrasenia = "";
    if (validarContrasenia(inputContrasenia.value)) {
        datosUsuario.contrasenia = inputContrasenia.value
    }

});

//Telefono

inputTelefono.addEventListener('keydown',function(e) { 
    datosUsuario.telefono = "";
    e.preventDefault();
    if(e.key=='Backspace') inputTelefono.value = String(inputTelefono.value).slice(0,-1);
    if([0,1,2,3,4,5,6,7,8,9].includes(Number(e.key)) && inputTelefono.value.length<11){
        if([3,7].includes(inputTelefono.value.length)) inputTelefono.value += ' ';
        inputTelefono.value += e.key;
    }
    if(inputTelefono.value.length == 11) datosUsuario.telefono = inputTelefono.value; 
    
    });

inputTelefono.addEventListener('blur',() => {
    if(datosUsuario.telefono == ""){
        mensajeTelefono.classList.remove('oculto');
        inputTelefono.classList.add('error');
    }
    else {
        mensajeTelefono.classList.add('oculto');
        inputTelefono.classList.remove('error');
    }
})




// Hobbies

//Si no pasa la validación devuelve false y agrega un mensaje de error. Si la pasa devuelve true
function validarHobbie(hobbie){
    let hobbiesInvalidos = ['VideoJuegosCocina','GuitarraLectura','NetflixTejer']; //Combinaciones invalidas
    let aux = hobbiesInvalidos.find(cond => cond.includes(hobbie));
    if(!aux) return true;
    let hobbie2 = datosUsuario.hobbies.find(e => aux.includes(e));
    if(hobbie2){
        mensajeHobbies.innerText = `La combinación de ${hobbie} y ${hobbie2} no es válida`
        mensajeHobbies.classList.remove('oculto');
        marcoHobbies.classList.add('error');
        return false
    }
    return true;
}

function toggleHobbies(){ //Activa o desactiva los checkbox que no están marcados
    for (const elemento of marcoHobbies.elements) {
        let valor = elemento.id.slice(7);
        if(!datosUsuario.hobbies.includes(valor)) elemento.disabled = !elemento.disabled;
    }
}

marcoHobbies.addEventListener('input',function (e){
    let elemento = e.target;
    let hobbie = e.target.id.slice(7);
    let arrH = datosUsuario.hobbies;
    if (elemento.checked == false){
        if(arrH.length==4) toggleHobbies();
        arrH.splice(arrH.indexOf(hobbie),1)
        return;
    }
    if(!validarHobbie(hobbie)){
        elemento.checked=false;
        return;
    };
    arrH.push(hobbie)
    if(arrH.length==4) toggleHobbies();
})




//Nacionalidad

marcoNacionalidad.addEventListener('input',(e) => {
    if(e.target.id == "nacionalidadArgentina"){
        mensajeNacionalidad.innerText = "Lo sentimos, aún no estamos reclutando magos en Argentina, pero pronto llegaremos";
        mensajeNacionalidad.classList.remove('oculto');
        marcoNacionalidad.classList.add('error');
        e.target.checked = false;
        e.target.disabled = true;
        datosUsuario.nacionalidad="";
    }
    else {
        mensajeNacionalidad.classList.add('oculto');
        marcoNacionalidad.classList.remove('error');
        datosUsuario.nacionalidad = e.target.id;
    }
})

// DETALLES
formulario.addEventListener('click',() => { // Elimina los mensajes de error de  hobbies al interactuar con otro elemento
    mensajeHobbies.classList.add('oculto');
    marcoHobbies.classList.remove('error');
    mensajeNacionalidad.innerText = "Debes seleccionar tu nacionalidad"; //Si ya se mostró un error en nacionalidad, cambia el mensaje
})

formulario.addEventListener('input',() => { //Activa o desactiva el botón del formulario
    botonSubmit.disabled = true;
    let {nombre, contrasenia, telefono, nacionalidad} = datosUsuario;
    if(nombre!="" && contrasenia!="" && telefono!="" && nacionalidad!=""){
        botonSubmit.disabled = false;
    }
})