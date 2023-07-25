
let activo = false;
let menu = document.querySelector('.tab-container');
let iconoContraido = document.querySelector('#img-icon-contraido');
let tituloContraido = document.querySelector('#titulo-logo-contraido');
const vistaMenu = document.querySelector('#vista-menu');

export function Hide(e){
    e.preventDefault();
    e.stopPropagation();
    if(activo === false){
        
        vistaMenu.classList = 'menu';
        iconoContraido.style.display = 'none';
        tituloContraido.style.display = 'none';
        menu.style.gridTemplateColumns = '200px 1fr';
        console.log('ESTADO MENU:: ',activo);
        activo = true;
        console.log('ESTADO ACTUALIZADO A :: ',activo);
        
    }else if(activo === true){
        console.log('ESTADO MENU:: ',activo);
        activo = false;
        console.log('ESTADO ACTUALIZADO A :: ',activo);

        vistaMenu.classList = 'contraido';
        iconoContraido.style.display = 'block';
        tituloContraido.style.display = 'block';
        menu.style.gridTemplateColumns = '60px 1fr';
    }
    
};

function evaluarTamañoVentana() {
    if (window.innerWidth >= 640) {
        activo = false;
    }
  }//funcion
  
  // cargar la página cada vez que la ventana cambie de tamaño
  window.addEventListener('load', evaluarTamañoVentana);
  window.addEventListener('resize', evaluarTamañoVentana);

