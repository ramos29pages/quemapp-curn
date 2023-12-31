console.log('LoginJs is >running');
const form = document.forms[0];
const boton = document.querySelector('.boton-registro');
const infoName = document.querySelector(".infoName");
const infoPass = document.querySelector(".infoPass");

const popOk = document.querySelector(".pop-ok");
let statusName, statusPass = false;

/* window.addEventListener('load', ()=>{
    let icono = document.querySelector('.cont-icono');
    let iconoText = document.querySelector('.form_titulo');
    let textInicio = document.querySelector('.inicio');
    let inputName = document.querySelector('.form-div1');
    let inputPass = document.querySelector('.form-div2');
    let boton = document.querySelector('.cont-button');
    let foot = document.querySelector('footer');

    let array = [icono, iconoText, textInicio, inputName, inputPass, boton, foot];

    function animar(items = []){
        let delay = 100;
        for(let i = 0; i < items.length; i++){
            setTimeout(()=>{
                items[i].style.display = 'block';
                if(i==5){
                    items[5].style.display = 'flex';
                }
            }, delay);
        
            delay+=200;
        }
    }

    animar(array);
});
 */

boton.addEventListener('click', async (ramos)=>{
    ramos.stopPropagation();
    ramos.preventDefault();

    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();


    if(name.length < 1){
        infoName.textContent = 'El nombre de usuario es obligatorio.*';
        document.getElementById('name').classList.add('err');
    }else if(name.length >10 ){
        infoName.textContent = 'Limite de caracteres excedido.';
        document.getElementById('name').classList.add('err');
    }else{
        infoName.textContent = '';
        document.getElementById('name').classList.remove('err');
        statusName = true;
    }

    if(password.length < 1){
        infoPass.textContent = 'La contraseña es requerida.*';
        document.getElementById('password').classList.add('err');
    }else if(password.length >60 ){
        infoPass.textContent = 'Limite de caracteres excedido.';
        document.getElementById('password').classList.add('err');
    }else{
        infoPass.textContent = '';
        document.getElementById('password').classList.remove('err');
        statusPass = true;
    }

    if(statusName && statusPass){
        console.log(`user: ${name} \n pass: ${password}`);
        form.reset();

        let response = await iniciarsesion(name, password);
    }

});


async function iniciarsesion(usuario, contrasenia) {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, contrasenia }),
    });
  
    const data = await response.json();
    let sessionid = data.sessionid;
    console.log('DEBUG:: ',data);
    
    if(data.success){
        console.log('DATA SUCCESS ::: ',data.success);
        Swal.fire({
            icon: 'success',
            html: `<p class="infoPop">Inicio de sesion exitoso 😎</p>`,
            timer: 2000,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }).then( data =>{
            console.log(data.dismiss);
            if(data.dismiss == 'timer'){
                console.log('SESSION ID:: ', sessionid);

                location.href = `/dash`;
            }
        });
    }else{
        console.log(data.success);
        Swal.fire({
            icon: 'error',
            html: `<p class="infoPop">${data.error}</p>`,
            timer: 2000,
            confirmButtonText: 'Corregir',
            confirmButtonColor: '#243b55',
            width: '400'
        });
    };

  }