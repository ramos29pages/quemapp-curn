
console.log('REGISTRAR-JS');
const form = document.forms[0];
const caja1 = document.querySelector('.show-first');
const caja2 = document.querySelector('.show-second');
const botonBack = document.querySelector('.boton-back');
const botonRegistro = document.querySelector('.boton-registro');
const botonNext = document.querySelector('.boton-next');
const goHome = document.getElementById('goHome');

let ancho = window.innerWidth;
let informacion = '';
let user;

form.addEventListener('click', (ramos) => {
    ramos.preventDefault();
    ramos.stopPropagation();

    let btn = ramos.target.value;

    if (btn == 'Siguiente') {
        siguiente();
    }

    if (btn == 'Regresar') {
        regresar();
    }

    if (btn == 'Registrarme') {
        registrar();
    }
});


function siguiente() {
    caja1.style.display = 'none';
    caja2.style.display = 'block';
    botonBack.style.display = 'block';
    botonRegistro.style.display = 'block';
    botonNext.style.display = 'none';
}

function regresar() {
    caja1.style.display = 'block';
    caja2.style.display = 'none';
    botonNext.style.display = 'block';
    botonRegistro.style.display = 'none';
    botonBack.style.display = 'none';
}

function registrar() {

    user = crearusuario();

    let estadoValidacion = validarCampos();

    if(!estadoValidacion){
        Swal.fire({
            confirmButtonColor: '#243b55',
            confirmButtonText: 'Corregir',
            width: '400',
            html: `
            
            ${informacion}
            
            `
        });
    };

    if(estadoValidacion){
        registrarUsuario(user);
        console.log(user);
    }

}

function crearusuario(){ 
    return user = {
        name: form.name.value.trim(),
        nickname: form.nickname.value.trim(),
        tipoId: parseInt(form.type.value),
        id: parseInt(form.id.value) || 0,
        email: form.email.value,
        celular: parseInt(form.phone.value) || 0,
        isMedic: parseInt(form.isMedic.value) || 0,
        code: form.code.value.trim(),
        sexo: parseInt(form.sexo.value),
        contrasenia: form.pass.value.trim(),
    }
};

function validarCampos(){

    informacion = '';

    let validated = false;

    if (user.name == '') {
        informacion += '<p class="info">El campo Nombre es obligatorio.</p>';
        form.name.classList.add('err');
    }else{
        form.name.classList.remove('err');
    }

    if (user.nickname == '') {
        informacion += '<p class="info">El campo Apellido es obligatorio.</p>';
        form.nickname.classList.add('err');
    }else{
        form.nickname.classList.remove('err');
    }

    if (user.id == 0) {
        informacion += '<p class="info">El campo Identificación es obligatorio.</p>';
        form.id.classList.add('err');
    }else{
        form.id.classList.remove('err');
    }

    if (user.email == '') {
        informacion += '<p class="info">El campo Email es obligatorio.</p>';
        form.email.classList.add('err');
    }else{
        form.email.classList.remove('err');
    }

    if (user.celular == 0) {
        informacion += '<p class="info">El campo Celular es obligatorio.</p>';
        form.phone.classList.add('err');
    }else{
        form.phone.classList.remove('err');
    }

    if (user.isMedic == 1) {
        if (user.code == '') {
            informacion += '<p class="info">Se requiere el codigo de verificacion para usuarios con el <b>Rol de médico</b>.</p>';
            form.isMedic.classList.add('err');
            form.code.classList.add('err');
        } else {
            form.isMedic.classList.remove('err');
            form.code.classList.remove('err');
            // Crear objeto de datos
            const data = {
                codigo: user.code,
            };

            // Configurar opciones para la solicitud
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            // Hacer la solicitud a la ruta /usarcodigo
            fetch('/usarcodigo', options)
                .then(response => response.json())
                .then(data => {
                    // Hacer algo con los datos de respuesta
                    console.log(data.status);
                    if(data.status == false){
                        informacion += '<p class="info">El código ingresado no es valido.</b>.</p>';
                        form.isMedic.classList.add('err');
                        form.code.classList.add('err');
                    } else{
                        form.isMedic.classList.remove('err');
                        form.code.classList.remove('err');
                    }
                })
                .catch(error => {
                    // Manejar errores de solicitud
                    console.error(error);
                });
        }
    }else{
        form.code.classList.remove('err');
        form.isMedic.classList.remove('err');
    }

    if(user.contrasenia == '' ){
        informacion+= '<p class="info">El campo <b>Contraseña</b> es obligatorio.</p>';
        form.pass.classList.add('err');
    }else{
        form.pass.classList.remove('err');
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;
        if (regex.test(user.contrasenia)) {
            console.log("La contraseña cumple con los requisitos.");
          } else if (regex.test(user.contrasenia) == false) {
            console.log("La contraseña no cumple con los requisitos.");
            informacion+= '<p class="info">La contraseña debe contener al menos una letra mayuscula, una minuscula y un número. por ejemplo "Rnuñez23".</p>';
            form.pass.classList.add('err');
          }else{
            form.pass.classList.remove('err');
          }
    }

    if(informacion != ''){
        validated = false
        return validated;
    }else{
        validated = true;
        return validated;
    }

}

function registrarUsuario(usuario) {

    fetch('/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
     // console.log('RESPUESTA DE QUEMAP::: ',data);
      if(data.status == false){
        Swal.fire({
            html: `<p class="info">${data.message}</p>`,
            icon: 'error',
            confirmButtonText: 'Iniciar Sesion',
            confirmButtonColor: '#243b55',
            width: '400',
            timer: 2000,
            timerProgressBar: true,
        }).then( res =>{
            if(res.isConfirmed){
                location.href = '/';
            };
        });
       
      }else if(data.status == true){
        form.reset();
        Swal.fire({
            html: `<p class="info">${data.message}</p>`,
            icon: 'success',
            confirmButtonText: 'Iniciar Sesion',
            confirmButtonColor: '#243b55',
            width: '400',
            timer: 2000,
            timerProgressBar: true,
        }).then( res =>{
            if(res.isConfirmed){
                location.href = '/home';
            };
        });

      }
    })
    .catch(error => console.error('Error al registrar usuario:', error));
  }

goHome.addEventListener('click', (e)=>{
 e.preventDefault();
 e.stopPropagation();
 location.replace('./');
});
  

function evaluarTamañoVentana() {
    if (window.innerWidth >= 600) {
        console.log('Mas de 600px', 'RegistrarJS is running');
        botonBack.style.display = 'none';
        botonNext.style.display = 'none';
        botonRegistro.style.display = 'block';
        caja1.style.display = 'block';
        caja2.style.display = 'block';

    } else {
        console.log('Pantalla con menos de 600px de ancho');
        botonBack.style.display = 'none';
        botonNext.style.display = 'block';
        botonRegistro.style.display = 'none';
        caja1.style.display = 'block';
        caja2.style.display = 'none';
    }
};

// cargar la página cada vez que la ventana cambie de tamaño
window.addEventListener('load', evaluarTamañoVentana);
window.addEventListener('resize', evaluarTamañoVentana);
