console.log('Dash-Desktop Running...');
let resizing = false;

function renameSeccions(seccions = []){
    seccions[0].innerHTML = 'Registrar sintomas';
    seccions[1].innerHTML = 'Tratamientos';
    seccions[2].innerHTML = 'Control registro';
    seccions[3].innerHTML = 'Generar codigos';
    seccions[4].innerHTML = 'Recomendaciones';
}

function cropSeccions(seccions = []){
    seccions.forEach( (elem)=>{
        if(elem.innerHTML.length > 9){
          let text = elem.innerHTML;
          let newText = text.substring(0,9)+'...';
          elem.innerHTML = newText;
        };
      });
}

function replaceStyles(){
    if (window.innerWidth >= 640) {
        document.getElementById('__vista').href = './css/dash.desktop.css';
        document.getElementById('__registrar').href = '';
        __tratamiento.href = './css/dash.tratamientos.css';
        __registro.href = '';
      } else {
        //console.log('Pantalla con menos de 600px de ancho');
        document.getElementById('__vista').href = './css/dash.mobile.css';
        __registrar.href = './css/dash.registrar.css';
        __tratamiento.href = './css/dash.tratamientos.css';
        __registro.href = './css/dash.reg.mobile.css';
      }//else
}

function showColumns(){
  let column1 = document.querySelector('.column1');
  let column2 = document.querySelector('.column2');
  let column3 = document.querySelector('.column3');

  column1.style.display = 'grid';
  column2.style.display = 'grid';
  column3.style.display = 'grid';
}
function HideColumns(){
  let column1 = document.querySelector('.column1');
  let column2 = document.querySelector('.column2');
  let column3 = document.querySelector('.column3');

  column1.style.display = 'block';
  column2.style.display = 'none';
  column3.style.display = 'none';
}

function evaluarTamañoVentana() {
    if (window.innerWidth >= 640) {
      const vistaMenu = document.querySelector('#vista-menu');
      let iconoContraido = document.querySelector('#img-icon-contraido');
      let tituloContraido = document.querySelector('#titulo-logo-contraido');
      vistaMenu.classList = 'contraido';
      let menu = document.querySelector('.tab-container');
      menu.style.gridTemplateColumns = '60px 1fr';
      iconoContraido.style.display = 'block';
        tituloContraido.style.display = 'block';
      
      const span = document.querySelectorAll('span.titulo-seccion');
      renameSeccions(span);
      replaceStyles();
      showColumns();

    } else {
      //console.log('Pantalla con menos de 600px de ancho');
      const vistaMenu = document.querySelector('#vista-menu');
      vistaMenu.classList = 'menu';
      const span = document.querySelectorAll('span.titulo-seccion');
      let iconoContraido = document.querySelector('#img-icon-contraido');
      let tituloContraido = document.querySelector('#titulo-logo-contraido');
      iconoContraido.style.display = 'none';
        tituloContraido.style.display = 'none';
      cropSeccions(span);
      replaceStyles();
      HideColumns();
    }//each
  }//funcion
  
function blurWindow(elemento){
  
  elemento.style.filter = 'blur(5px)';
}

function normalWindow(elemento){
  elemento.style.filter = 'blur(0px)';
}
  // cargar la página cada vez que la ventana cambie de tamaño
  window.addEventListener('load', evaluarTamañoVentana);
  window.addEventListener('resize', evaluarTamañoVentana);
  window.addEventListener('resize', ()=>{
    let contenedor = document.querySelector('.tab-container');
    if (!resizing) {
      resizing = true;
      blurWindow(contenedor);
      setTimeout(() => {
        resizing = false;
        normalWindow(contenedor);
      }, 400);
    }
  });
  
