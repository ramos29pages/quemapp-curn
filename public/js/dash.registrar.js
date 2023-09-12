
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
const titulo_c1 = d.querySelector('#titulo-c1');
const respuesta = d.querySelector('.respuesta');
const contRespuestas = d.querySelector('.respuestas');
const regHome = d.getElementById('regHome');

const botonGenerar = d.getElementById('boton');

const loaderPage = d.querySelector('.loader-section')


//ACCION BOTON SIGUIENTE 1
btnColumn1.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    column1.style.display = 'none';
    column2.style.display = 'grid';
    column3.style.display = 'none';
    titulo_c1.style.display = 'none';
});

//ACCION BOTON RETROCESO 1

btnColumn2Anterior.addEventListener('click', (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    column2.style.display = 'none'
    column3.style.display = 'none'
    column1.style.display = 'block'
    titulo_c1.style.display = 'block';
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

btnColumn3Siguiente.addEventListener('click', async (dr) => {
    dr.preventDefault();
    dr.stopPropagation();

    let datos = await validarDatos();
    if (datos && datos.valid) {
        let botonAccion = dr.target;
        // form.reset();
        botonAccion.style.visibility = 'hidden';
        console.log(' DATOS ', datos);
        sendData(botonAccion, datos);
    }

}); //accion env end

botonGenerar.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let datos = await validarDatos();
    if (datos && datos.valid) {
        // form.reset();
        /* let botonAccion = e.target;
        botonAccion.style.visibility = 'hidden'; */
        console.log(botonAccion);
        // sendData(botonAccion, datos);
    }


});

async function validarDatos() {
    /*

    
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
    */

    let edad = form.edad.value || false;
    let peso = form.peso.value || false;
    let talla = form.talla.value || false;
    let agenteFisico = (document.querySelector('#Agente-fisico').value == 'Selecciona...') ? '' : document.querySelector('#Agente-fisico').value;
    let agenteQuimico = (document.querySelector('#Agente-quimico').value == 'Selecciona...') ? '' : document.querySelector('#Agente-quimico').value;
    let agenteBiologico = (document.querySelector('#Agente-biologico').value == 'Selecciona...') ? '' : document.querySelector('#Agente-biologico').value;
    let grado = parseInt(form.grado.value) || false;
    let parteCuerpo = (form.parteCuerpo.value == 'Selecciona...') ? false : form.parteCuerpo.value;
    let informacion = '';

    if (!(edad && (edad > 0) && edad < 100)) {
        informacion += '<p class="infoPop" >Debes ingresar una edad valida.</p>';
    }
    if (!(peso && (peso > 10) && peso < 100)) {
        informacion += '<p class="infoPop" >Debes ingresar un peso valido.</p>';
    }
    if (!(talla && (talla >= 50) && talla < 250)) {
        informacion += '<p class="infoPop" >Debes ingresar una talla valida.</p>';
    }

    if (agenteFisico.length > 1 && agenteBiologico.length > 1 && agenteQuimico.length > 1) {
        await Swal.fire(
            {
                html: `<p class="infoPop" > Para poder brindarte una atención personalizada solo se admite un agente etiologico para cada generacion.</p>`,
                icon: 'info',
                showConfirmButton: true,
                confirmButtonText: 'Revisemos !',
                confirmButtonColor: '#243b55',
                width: '400'
            }
        );

        return {
            valid: false,
        }
    } else
        if (agenteFisico.length > 1 && agenteBiologico.length > 1) {
            await Swal.fire(
                {
                    html: `<p class="infoPop" > Para poder brindarte una atención personalizada solo se admite un agente etiologico para cada generacion.</p>`,
                    icon: 'info',
                    showConfirmButton: true,
                    confirmButtonText: 'Revisemos !',
                    confirmButtonColor: '#243b55',
                    width: '400'
                }
            );

            return {
                valid: false,
            }
        } else
            if (agenteFisico.length > 1 && agenteQuimico.length > 1) {
                await Swal.fire(
                    {
                        html: `<p class="infoPop" > Para poder brindarte una atención personalizada solo se admite un agente etiologico para cada generacion.</p>`,
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonText: 'Revisemos !',
                        confirmButtonColor: '#243b55',
                        width: '400'
                    }
                );
                return {
                    valid: false,
                }
            } else
                if (agenteQuimico.length > 1 && agenteBiologico.length > 1) {
                    await Swal.fire(
                        {
                            html: `<p class="infoPop" > Para poder brindarte una atención personalizada solo se admite un agente etiologico para cada generacion.</p>`,
                            icon: 'info',
                            showConfirmButton: true,
                            confirmButtonText: 'Revisemos !',
                            confirmButtonColor: '#243b55',
                            width: '400'
                        }
                    );
                    return {
                        valid: false,
                    }
                } else
                    if (agenteFisico == '' && agenteQuimico == '' && agenteBiologico == '') {
                        informacion += '<p class="infoPop" >Selecciona el tipo de agente que causó tu quemadura.</p>';
                    }

    if (grado <= 0) {
        informacion += '<p class="infoPop" >Selecciona el grado de la quemadura. Si no sabes que opcion elegir, puedes revisar la seccion - RECOMENDACIONES -</p>'
    }

    if (!parteCuerpo) {
        informacion += '<p class="infoPop" >Selecciona la parte del cuerpo afectada</p>'
    }


    if (informacion.length > 1) {

        await Swal.fire(
            {
                html: ` ${informacion}`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'Revisemos !',
                confirmButtonColor: '#243b55',
                width: '400'
            }
        );
        return {
            valid: false
        };
    } else {
        return {
            valid: true,
            agent: agenteFisico || agenteBiologico || agenteQuimico || ''
        };
    }

    // loaderPage.classList.remove('loaded');

    // let user = await getData();
    // let body = await JSON.stringify(user);


}

async function sendData(botonAccion, datos) {
    let btnAccion = botonAccion;
    let user = await getData(datos.agent);
    let body = await JSON.stringify(user);
    let animation = 1;
    console.log('BOTON DE ACCION :: ->',btnAccion.innerText);
    console.log('USER OBEJCT :: -> ', body);
    // console.log(body);
    const response = await sendMessageToChatGPT(body);
    console.log('respuesta de GPT :: ', response);



/*     //Creando div para seccion tratamientos
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

    setTimeout(() => {
        Swal.fire(
            {
                html: '<p class="infoPop" >Respuesta generada con exito. Puedes verla en la seccion de tratamientos.</p>',
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'ver en tratamientos',
                confirmButtonColor: '#243b55',
                width: '400'
            }
        ).then((res) => {
            console.log(res);
            if (res.isConfirmed) {
                btnAccion.style.visibility = 'visible';
                showTratamientos();
            }

        });
    }, 3000); */

}

async function getData(agente) {

    Swal.fire(
        {
            html: '<p class="infoPop" >Estamos analizando los datos... Espera un momento porfavor...</p>',
            icon: 'info',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            confirmButtonColor: '#243b55',
            width: '400'
        }
    );

    let edad = form.edad.value;
    let peso = form.peso.value;
    let talla = form.talla.value;
    let $agente = agente;
    let grado = parseInt(form.grado.value);
    let parteCuerpo = form.parteCuerpo.value;
    let userdata = {
        edad,
        peso,
        talla,
        $agente,
        grado,
        parteCuerpo
    };


    return userdata;
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


function crearTratamiento(response) {
    
}


const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-pane');
const color = '#304d6d';


function showTratamientos() {
    function showPanel(panelIndex, colorCode) {
        tabButtons.forEach(function (node) {
            node.style.backgroundColor = '';
            node.style.color = '';
            node.classList.remove('active');
        });
        tabButtons[panelIndex].style.backgroundColor = colorCode;
        tabButtons[panelIndex].classList.add('active');
        tabButtons[panelIndex].style.color = 'white'

        tabPanels.forEach(function (node) {
            node.classList.remove('active');
        });
        tabPanels[panelIndex].classList.add('active');
    }

    showPanel(1, color);

    tabButtons.forEach(function (node, index) {
        node.addEventListener('click', function () {
            showPanel(index, color);
        });
    });
}


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

if (window.innerWidth <= 600) {
    console.log('goHome is active');

    regHome.addEventListener('click', (dr) => {
        dr.stopPropagation();
        dr.preventDefault();

        column2.style.display = 'none'
        column3.style.display = 'none'
        column1.style.display = 'block'
        titulo_c1.style.display = 'block';
    });
}