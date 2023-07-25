import {Hide} from "./mostrar.ocultar.js";

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-pane');
const color = '#304d6d';

function showPanel(panelIndex, colorCode) {
  tabButtons.forEach(function(node) {
    node.style.backgroundColor = '';
    node.style.color = '';
    node.classList.remove('active');
  });
  tabButtons[panelIndex].style.backgroundColor = colorCode;
  tabButtons[panelIndex].classList.add('active');
  tabButtons[panelIndex].style.color = 'white'

  tabPanels.forEach(function(node) {
    node.classList.remove('active');
  });
  tabPanels[panelIndex].classList.add('active');
}

showPanel(0, color);

tabButtons.forEach(function(node, index) {
  node.addEventListener('click', function() {
    showPanel(index, color);
  });
});

const ham= document.querySelector('#hamburguesa');

ham.addEventListener('click', Hide);