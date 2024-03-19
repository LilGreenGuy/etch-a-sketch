let currentColor = '#333333';
let gridMode = 0;
let currentSize = 16;
let currentMode = 'fill';

function changeCurrentSize(newSize) {
  currentSize = newSize;
}

function changeCurrentMode(newMode) {
  swapModes(newMode);
  currentMode = newMode;
}


const sizeValue = document.getElementById('rangeOutput');
const sizeSlider = document.getElementById('slider');
const gridContainer = document.querySelector('.sketchContainer');
const fillBtn = document.querySelector('.fill');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const gridBtn = document.querySelector('#gridLines');

fillBtn.onclick = () => changeCurrentMode('fill');
rainbowBtn.onclick = () => changeCurrentMode('rainbow');
eraserBtn.onclick = () => changeCurrentMode('eraser');
clearBtn.onclick = () => remakeGrid();
gridBtn.onclick = () => toggleGridLines(gridMode);
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


function toggleGridLines(gridMode) {

  if (gridMode === 1) {
    gridItem.classList.remove('linesOn');
    gridBtn.classList.remove('button-active');
    gridMode = 0;
  }
  if (gridMode === 0) {
    gridItem.classList.add('linesOn');
    gridBtn.classList.add('button-active');
    gridMode = 1;
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'fill') {
    e.target.style.backgroundColor = currentColor;
  }
  else if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  }
  else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function swapModes(newMode) {
  if (currentMode === 'fill') {
    fillBtn.classList.remove('button-active');
  }
  else if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('button-active');
  }
  else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('button-active');
  }

  if (newMode === 'fill') {
    fillBtn.classList.add('button-active')
  }
  else if (newMode === 'rainbow') {
    rainbowBtn.classList.add('button-active')
  }
  else if (newMode === 'eraser') {
    eraserBtn.classList.add('button-active')
  }
}

swapModes(currentMode);
makeGrid(currentSize);