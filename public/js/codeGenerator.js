console.log('running generarCodigos.js');
const generarCodigos = document.querySelector('.btn-newcode');
const tabla = document.querySelector('tbody');

function addEstatusClass(columnas){
    columnas.forEach( columna => {
        if (columna.classList.contains('codigo-nuevo')){
            columna.classList.remove('codigo-nuevo');
            columna.classList.add('codigo-antiguo');
        }
    });
}


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

async function crearElemento(usuario){
    const codigoGenerado = await generarCodigo();
    const nuevaFila = document.createElement('tr');
    const tdcode = document.createElement('td');
    tdcode.innerText = codigoGenerado;
    const tEstatus = document.createElement('td');
    tEstatus.innerText = 'Activo';
    const tdate = document.createElement('td');
    tdate.innerText = new Date().toLocaleString();
    const tuser = document.createElement('td');
    tuser.innerText = usuario;
    nuevaFila.classList.add('codigo-nuevo');
    nuevaFila.appendChild(tdcode);
    nuevaFila.appendChild(tEstatus);
    nuevaFila.appendChild(tdate);
    nuevaFila.appendChild(tuser);

   let fila1 = tabla.firstChild;
   tabla.insertBefore(nuevaFila, fila1);
}
  
generarCodigos.addEventListener('click', function() {
    let columna = document.querySelectorAll('tr');
    let user = {
        identificacion: 12345,
    }
    crearElemento(user.identificacion);
    addEstatusClass(columna);

  });
