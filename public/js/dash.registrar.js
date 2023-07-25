

const d = document;
const form = d.forms[0];
const btnColumn1 = d.getElementById('btn-column1');
const column2 = d.querySelector('.column2');
const column1 = d.querySelector('.column1');
const column3 = d.querySelector('.column3');
const btnColumn2Anterior = d.querySelector('.anterior');
const btnColumn3Anterior = d.querySelector('.anteriorCuerpo');
const btnColumn2Siguiente = d.querySelector('.siguiente');
const btnColumn3Siguiente = d.querySelector('.siguienteCuerpo');
const respuesta = d.querySelector('.respuesta');
const contRespuestas = d.querySelector('.respuestas');

const botonFinal = d.querySelector('#boton');

const botonGenerar = d.getElementById('boton');

const loaderPage = d.querySelector('.loader-section')

//ACCION BOTON SIGUIENTE 1
btnColumn1.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    column1.style.display = 'none';
    column2.style.display = 'grid';
    column3.style.display = 'none';
});

//ACCION BOTON RETROCESO 1

btnColumn2Anterior.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    column2.style.display = 'none'
    column3.style.display = 'none'
    column1.style.display = 'block'

});

//ACCION SIGUIENTE 2

btnColumn2Siguiente.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    column1.style.display = 'none'
    column2.style.display = 'none'
    column3.style.display = 'grid'
});

//ACCION ANTERIOR 2
btnColumn3Anterior.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    console.log(btnColumn3Anterior);
    column1.style.display = 'none'
    column2.style.display = 'grid'
    column3.style.display = 'none'

});

//ACCION ENVIAR

btnColumn3Siguiente.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let user = await getData();
    let body = JSON.stringify(user);
    console.log(loaderPage)


    Swal.fire(
        {
            html: '<p class="infoPop" >Espera unos segundos mientras generamos una respuesta.</p>',
            icon: 'info',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }
    )

    loaderPage.classList.remove('loaded');
    const response = await sendMessageToChatGPT(body);
    console.log(response);


    let div = d.createElement('div');
    div.classList.add('respuesta');
    let p = d.createElement('p');
    p.classList.add('titulo');
    p.innerText = 'Respuesta generada - ' + new Date().toLocaleString();
    div.appendChild(p);
    let p2 = d.createElement('p');
    p2.classList.add('res');
    p2.innerText = response;
    div.appendChild(p2);

    contRespuestas.appendChild(div);

    loaderPage.classList.add('loaded');

    Swal.fire(
        {
            html: '<p class="infoPop" >Respuesta generada con exito. Puedes verla en la seccion de tratamientos.</p>',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }
    );

    evaluarTamañoVentana()
}); //accion env end

botonGenerar.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let user = await getData();
    let body = JSON.stringify(user);

    console.log('FORMULARIO RELLENADO CON EXITO', body);

    Swal.fire(
        {
            html: '<p class="infoPop" >Espera unos segundos mientras generamos una respuesta.</p>',
            icon: 'info',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }
    );

    const response = await sendMessageToChatGPT(body);
    console.log(response);

    let div = d.createElement('div');
    div.classList.add('respuesta');
    let p = d.createElement('p');
    p.classList.add('titulo');
    p.innerText = 'Respuesta generada - ' + new Date().toLocaleString();
    div.appendChild(p);
    let p2 = d.createElement('p');
    p2.classList.add('res');
    p2.innerText = response;
    div.appendChild(p2);

    contRespuestas.appendChild(div);

    Swal.fire(
        {
            html: '<p class="infoPop" >Respuesta generada con exito. Puedes verla en la seccion de tratamientos.</p>',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }
    );
});

const getData = async () => {

    let aFisico, aQuimico, aBiologico;

    if (form.AgenteFisico.value !== 'Selecciona...') {
        aFisico = form.AgenteFisico.value;
    } else {
        aFisico = 0;
    }

    if (form.AgenteQuimico.value !== 'Selecciona...') {
        aQuimico = form.AgenteQuimico.value;
    } else {
        aQuimico = 0;
    }

    if (form.AgenteBiologico.value !== 'Selecciona...') {
        aBiologico = form.AgenteBiologico.value;
    } else {
        aBiologico = 0;
    }

    let user = {
        edad: form.edad.value || null,
        peso: form.peso.value || null,
        talla: form.talla.value || null,
        agenteFisico: aFisico || null,
        agenteQuimico: aQuimico || null,
        agenteBiologico: aBiologico || null,
        grado: form.grado.value || null,
        parteCuerpo: form.parteCuerpo.value || null,
    }

    return user;
};


async function sendMessageToChatGPT(user) {
    let response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: user,
    });

    let data = await response.json();
    return data.response;
};

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