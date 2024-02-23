const BASESIZE = 16;
const BASECOLOR = '#333333';
const BASEMODE = 'color';

let currentSize = BASESIZE;
let currentMode = BASEMODE;

function changeCurrentSize(newSize) {
  currentSize = newSize;
}

function changeCurrentMode(newMode) {

}


const sizeValue = document.getElementById('rangeOutput');
const sizeSlider = document.getElementById('slider');
const gridContainer = document.querySelector('.sketchContainer');
const fillBtn = document.querySelector('.fill');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const gridBtn = document.querySelector('#gridLines');

fillBtn.onclick = () => changeCurrentMode();
clearBtn.onclick = () => remakeGrid();
gridBtn.onclick = () => toggleGridLines(currentSize);
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;


  for (let i = 0; i < size * size; i++) {
    gridItem = document.createElement('div');
    gridItem.classList.add('grid');
    gridItem.addEventListener('mouseover', changeColor);
    gridItem.addEventListener('mousedown', changeColor);
    gridContainer.appendChild(gridItem);
  }
}

function remakeGrid() {
  clearGrid();
  makeGrid(currentSize);
}

function changeSize(value) {
  changeCurrentSize(value);
  updateSizeDisplay(value);
  remakeGrid();
}

function updateSizeDisplay(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function clearGrid() {
  gridContainer.innerHTML = '';
}


function toggleGridLines(size) {
  for (let i = 0; i < size; i++)
    gridItem.classList.add('linesOn');
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  e.target.style.backgroundColor = BASECOLOR;
}

makeGrid(BASESIZE);