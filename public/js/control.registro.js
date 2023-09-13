console.log('running control.registro.js')

const btnControlRegistro = document.querySelector('#btn-ctrl-registro');
const data = document.querySelector('#data');

let oldUser = {}
//const btnEditar = document.querySelector('#boton-prueba')
const contFormEdit = document.querySelector('.cont-editar');
const formEdit = document.querySelector('.form-editar');
const btnCancelar = document.querySelector('.del')
const btnActualizar = document.querySelector('.act')
let informacion = '';

btnControlRegistro.addEventListener('click', async (e) => {
    e.preventDefault()
    e.stopPropagation()
    let usuarios = await cargarUsuarios()
    mostrarUsuarios(usuarios)
    cargarAcciones()
})


async function loader() {
    const div = document.createElement('div')
    div.id = 'loader'
    div.innerHTML = '<h1>Cargando...</h1>'
    div.style.width = '100vw'
    div.style.height = '100vh'
    div.style.background = '#303642'
    div.style.position = 'absolute'
    div.style.top = '0'
    document.body.appendChild(div)
    await window.onload
    document.body.removeChild(div)
}

async function borrar(event, btn) {
    event.preventDefault()
    event.stopPropagation()
    let item = btn.parentElement.parentElement
    const userId = item.firstElementChild.innerHTML
    console.log(userId)

    Swal.fire({
        title: 'Estas seguro ?',
        html: "<p class='infoDelete'>Esta accion no se puede revertir...</p>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#243b55',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Bórralo!',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'custom-sweetalert',
          }
    }).then(async (result) => {
        if (result.isConfirmed) {
            bdremover(userId)
            let usuarios = await cargarUsuarios()
            mostrarUsuarios(usuarios)
            cargarAcciones()
            console.log(usuarios)
            Swal.fire(
                {
                    title: 'Exito',
                    html: "<p class='infoDelete'>El usuario se eliminó con exito</p>",
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-sweetalert',
                      },
                }
            )
        }
    })


}

async function editarUser(event, btn) {
    event.preventDefault()
    event.stopPropagation()
    let item = btn.parentElement.parentElement
    const userId = item.firstElementChild.innerHTML
    let userToEdit = await fetch(`/usuarios/${userId}`)
    //almacenamos el usuario seleccionado
    let user = await userToEdit.json()
    //console.log('User:::: ',user)

    //datos a formulario de edicion
    let oldUser = await cargarDatosForm(user)
    contFormEdit.style.display = 'grid'

}

async function cargarUsuarios() {
    const query = await fetch('/usuarios')
    const usuarios = await query.json()
    data.innerHTML = ''
    return usuarios
}

function mostrarUsuarios(usuarios = []) {
    usuarios.forEach(user => {

        let idType = '';
        if(user.tipoId == "1"){
            idType = 'C.C';
        } else if(user.tipoId == "2"){
            idType = 'C.E';
        } else if(user.tipoId == "3"){
            idType = 'T.I';
        }

        const html = `<tr class="row animate__animated animate__bounceIn">
                            <td class="__id">${user._id}</td>
                            <td>${user.name}</td>
                            <td>${user.nickname}</td>
                            <td class="toHide">${user.email}</td>
                            <td class="toHide">${idType}</td>
                            <td class="toHide">${user.id}</td>
                            <td>${user.isMedic === 0 ? 'User' : 'Medic'}</td>
                            <td id="cont-actions">
                                <a class="delete" href="#" title="Eliminar"><i class="fi fi-ss-trash"></i></a>
                                <a class="edit" href="#" title="Editar"><i class="fi fi-ss-pencil"></i></a>
                            </td>
                        </tr>`
        data.insertAdjacentHTML('beforeend', html)
    });
}

function bdremover(userId) {
    fetch(`/usuarios/${userId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log(`Usuario ${userId} eliminado correctamente`);
            } else {
                throw new Error('Error al eliminar el usuario');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

//listener boton cancelar
btnCancelar.addEventListener('click', (e) => {
    e.preventDefault()
    formEdit.classList.remove('animate__fadeInDown')
    formEdit.classList.add('animate__fadeOutUp')

    setTimeout(() => {
        contFormEdit.style.display = 'none'
        let inputs = document.querySelectorAll('.input-edit')
        inputs.forEach((input) => {
            input.classList.remove('err')
        })
        formEdit.reset()
        formEdit.classList.add('animate__fadeInDown')
        formEdit.classList.remove('animate__fadeOutUp')
    }, 500)
})

//listener boton actualizar
btnActualizar.addEventListener('click', async (e) => {
    e.preventDefault()
    e.stopPropagation()
    let estadoValidacion = await validarDatos()

    if (!estadoValidacion) {
        Swal.fire({
            confirmButtonColor: '#243b55',
            confirmButtonText: 'Corregir',
            width: '400',
            html: `
            
            ${informacion}
            
            `
        });
    }

    if (estadoValidacion) {
        let newUser = estadoValidacion

        fetch('/actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Usuario actualizado correctamente --Ramos--');
                    Swal.fire({
                        icon: 'success',
                        html: `<p class="infoPop">Usuario actualizado correctamente.</p>`,
                        timer: 2000,
                        showConfirmButton: false,
                        confirmButtonColor: '#243b55',
                        width: '400'
                    });

                } else {
                    throw new Error('Error al actualizar el usuario');
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    html: `<p class="infoPop">Error al actualizar el usuario. Intenta nuevamente...</p>`,
                    timer: 2000,
                    showConfirmButton: false,
                    confirmButtonColor: '#243b55',
                    width: '400'
                });
                
            });

        formEdit.reset()
        formEdit.classList.remove('animate__fadeInDown')
        formEdit.classList.add('animate__fadeOutUp')
        setTimeout(async () => {
            contFormEdit.style.display = 'none'
            formEdit.reset()
            formEdit.classList.add('animate__fadeInDown')
            formEdit.classList.remove('animate__fadeOutUp')
            let usuarios = await cargarUsuarios()
            mostrarUsuarios(usuarios)
            cargarAcciones()
        }, 500)
    }

}) // fin del boton actualizar

function cargarDatosForm(user) {

    let editNameInput = document.getElementById('editName')
    editNameInput.value = user.name;

    let editNicknameInput = document.getElementById('editNickname')
    editNicknameInput.value = user.nickname;

    let editTipoIdInput = document.getElementById('editTipoId')
    editTipoIdInput.value = user.tipoId || 'Sin datos';

    let editIdInput = document.getElementById('editId')
    editIdInput.value = user.id || 'Sin datos';

    let editEmailInput = document.getElementById('editEmail')
    editEmailInput.value = user.email || 'Sin datos';

    let editCelularInput = document.getElementById('editCelular')
    editCelularInput.value = user.celular || 'Sin datos';

    let editIsmedicInput = document.getElementById('editIsmedic')
    editIsmedicInput.value = user.isMedic;

    let editCodeInput = document.getElementById('editCode')
    editCodeInput.value = user.code || 'Sin datos';

    let editSexoInput = document.getElementById('editSexo')
    editSexoInput.value = user.sexo || 'Sin datos';

    let editContraseniaInput = document.getElementById('editContrasenia')
    editContraseniaInput.value = user.contrasenia || 'Sin datos';

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "Sin datos") {
            // Cambia el color del texto al ser "Sin Datos"  
            inputs[i].style.color = "gray";
            inputs[i].style.fontWeight = "200";
            inputs[i].disabled = true; // Desactiva el input
            inputs[i].blur(); // Hace que el input pierda el foco
        }
    }

    return {
        name: editNameInput.value.trim(),
        nickname: editNicknameInput.value.trim(),
        tipoId: editTipoIdInput.value.trim(),
        id: editIdInput.value.trim(),
        email: editEmailInput.value.trim(),
        celular: editCelularInput.value.trim(),
        isMedic: editIsmedicInput.value.trim(),
        code: editCodeInput.value.trim(),
        sexo: editSexoInput.value.trim(),
        contrasenia: editContraseniaInput.value.trim()
    }

}

function validarDatos(oldUser) {
    let editNameInput = document.getElementById('editName')
    let editNicknameInput = document.getElementById('editNickname')
    let editTipoIdInput = document.getElementById('editTipoId')
    let editIdInput = document.getElementById('editId')
    let editEmailInput = document.getElementById('editEmail')
    let editCelularInput = document.getElementById('editCelular')
    let editIsmedicInput = document.getElementById('editIsmedic')
    let editCodeInput = document.getElementById('editCode')
    let editSexoInput = document.getElementById('editSexo')
    let editContraseniaInput = document.getElementById('editContrasenia')

    informacion = ''

    function validarCampos() {

        let validated = false;

        //validar nombre
        if (editNameInput.value.trim() == '') {
            informacion += '<p class="info">El campo Nombre es obligatorio.</p>';
            editNameInput.classList.add('err');
        } else {
            editNameInput.classList.remove('err');
        }

        //validar apellido
        if (editNicknameInput.value.trim() == '') {
            informacion += '<p class="info">El campo Apellido es obligatorio.</p>';
            editNicknameInput.classList.add('err');
        } else {
            editNicknameInput.classList.remove('err');
        }

        //validar TIPO Id
        if (editTipoIdInput.value.trim() == '' || parseInt(editTipoIdInput.value.trim()) === 0 || parseInt(editTipoIdInput.value.trim()) >= 3) {
            informacion += '<p class="info">Debe ingresar un tipo ID valido [1 = CC || 2 = CE || 3 = TI ].</p>';
            editTipoIdInput.classList.add('err');
        } else {
            editTipoIdInput.classList.remove('err');
        }

        //validar Id
        if (parseInt(editIdInput.value.trim()) === 0) {
            informacion += '<p class="info">El campo Identificación es obligatorio.</p>';
            editIdInput.classList.add('err');
        } else {
            editIdInput.classList.remove('err');
        }

        //validar Email
        if (editEmailInput.value.trim() == '') {
            informacion += '<p class="info">El campo Email es obligatorio.</p>';
            editEmailInput.classList.add('err');
        } else {
            editEmailInput.classList.remove('err');
        }

        //validar celular
        if (editCelularInput.value.trim() == '') {
            informacion += '<p class="info">El campo Celular es obligatorio.</p>';
            editCelularInput.classList.add('err');
        } else {
            editCelularInput.classList.remove('err');
        }

        //validar si es medico
        if (editIsmedicInput.value.trim() == "" || parseInt(editIsmedicInput.value.trim()) > 1 || parseInt(editIsmedicInput.value.trim()) < 0) {
            informacion += '<p class="info">Rol debe contener 1 para medicos o cero(0) para usuarios generales.</p>';
            editIsmedicInput.classList.add('err');
        } else {
            editIsmedicInput.classList.remove('err');
        }

        //validar sexo
        if (editSexoInput.value.trim() == '' || parseInt(editSexoInput.value.trim()) > 2 || parseInt(editSexoInput.value.trim()) < 1) {
            informacion += '<p class="info">Campo SEXO: 1 = M || 2 = F.</p>';
            editSexoInput.classList.add('err');
        } else {
            editSexoInput.classList.remove('err');
        }

        // validar contrasenia: 

        if (editContraseniaInput.value.trim() == '') {
            informacion += '<p class="info">El campo <b>Contraseña</b> es obligatorio.</p>';
            editContraseniaInput.classList.add('err');
        } else {
            editContraseniaInput.classList.remove('err');
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;
            if (regex.test(editContraseniaInput.value.trim())) {
                console.log("La contraseña cumple con los requisitos.");
            } else if (regex.test(editContraseniaInput.value.trim()) == false) {
                console.log("La contraseña no cumple con los requisitos.");
                informacion += '<p class="info">La contraseña debe contener al menos una letra mayuscula, una minuscula y un número. Ademas no debe exceder 8 caracteres. por ejemplo "Rnunez23".</p>';
                editContraseniaInput.classList.add('err');
            } else {
                editContraseniaInput.classList.remove('err');
            }
        }

        if (informacion != '') {
            validated = false
            return validated;
        } else {
            validated = true;
            return validated;
        }

    }

    let validar = validarCampos()

    if (!validar) {
        return false;
    }

    if (validar) {
        return {
            name: editNameInput.value.trim() == 'Sin datos' ? "" : editNameInput.value.trim(),
            nickname: editNicknameInput.value.trim() == 'Sin datos' ? "" : editNicknameInput.value.trim(),
            tipoId: editTipoIdInput.value.trim() == 'Sin datos' ? "1" : editTipoIdInput.value.trim(),
            id: editIdInput.value.trim() == 'Sin datos' ? "" : editIdInput.value.trim(),
            email: editEmailInput.value.trim() == 'Sin datos' ? "" : editEmailInput.value.trim(),
            celular: editCelularInput.value.trim() == 'Sin datos' ? "" : editCelularInput.value.trim(),
            isMedic: editIsmedicInput.value.trim() == 'Sin datos' ? "" : editIsmedicInput.value.trim(),
            code: editCodeInput.value.trim() == 'Sin datos' ? "" : editCodeInput.value.trim(),
            sexo: editSexoInput.value.trim() == 'Sin datos' ? "" : editSexoInput.value.trim(),
            contrasenia: editContraseniaInput.value.trim() == 'Sin datos' ? "" : editContraseniaInput.value.trim()
        }
    }

}

function cargarAcciones() {
    let btnsBorrar = document.querySelectorAll('.delete');
    btnsBorrar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            borrar(e, btn)
        })
    })
    let btnsEditar = document.querySelectorAll('.edit');
    btnsEditar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            editarUser(e, btn)
        })
    })
}

