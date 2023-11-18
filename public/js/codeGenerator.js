console.log('running generarCodigos.js');
const generarNuevoCodigo = document.querySelector('.btn-newcode');
const btnGenerarCodigos = document.getElementById('btn-generar-codigos');
let tablaToInsert = document.getElementById('contenedor-codigos-generados');


btnGenerarCodigos.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    tablaToInsert.innerHTML = '';
    let codigos = await cargarCodigos();
    console.log(codigos);
    await mostrarCodigos(codigos);
});

async function cargarCodigos() {
    const query = await fetch('/codigos');
    const codigos = await query.json();
    return codigos;
}

async function mostrarCodigos(codigos = []) {
    codigos.forEach(code => {

        let statusCode = '';
        code.status == 'Active' ? statusCode = 'codigo-nuevo' : statusCode = 'codigo-antiguo';
        const html = `<tr class="code-row ${statusCode} animate__animated animate__bounceIn">
                            <td class="codigo">${code.code}</td>
                            <td>${code.status}</td>
                            <td>${code.date}</td>
                            <td class="username">${code.username}</td>
                        </tr>`
        tablaToInsert.insertAdjacentHTML('afterbegin', html)
    });
}

generarNuevoCodigo.addEventListener('click', async function (e) {
    e.preventDefault();
    e.stopPropagation();
    let user = document.getElementById('nameUser').innerText || 'no-user';
    let code = generarCodigo();
    let date = new Date().toLocaleString();
    let status = 'Active';
    guardarCodigo(user, code, date, status);
    tablaToInsert.innerHTML = '';
    let codigos = await cargarCodigos();
    await mostrarCodigos(codigos);
});


function generarCodigo() {
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&/';
    let codigo = '';
    const longitudCodigo = 10;

    for (let i = 0; i < longitudCodigo; i++) {
        const indiceCaracter = Math.floor(Math.random() * caracteresPermitidos.length);
        codigo += caracteresPermitidos.charAt(indiceCaracter);
    }

    return codigo;
}

async function guardarCodigo(username, code, date, status) {
    inactivarCodigosActivos();
    try {
        let response = await fetch('http://localhost:3000/saveCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, status, date, username }),
        });
        let data = await response.text();
        console.log(data);
        
        let pop = Swal.fire({
            icon: 'success',
            title: `${data}. 😊`,
            showConfirmButton: false,
            toast : true,
            position : 'top-end',
            timer: 1500,
            timerProgressBar: true
        });
    } catch (error) {
        let pop = Swal.fire({
            icon: 'error',
            title: `${data}. 🫤`,
            showConfirmButton: false,
            toast : true
        });
    }
}

async function inactivarCodigosActivos() {
    try {
        let response = await fetch('/updateStatus', {
            method: 'PUT',
        });
        let data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
