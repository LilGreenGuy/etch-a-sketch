const sizeValue = document.getElementById('rangeOutput');
const sizeSlider = document.getElementById('slider');
const gridContainer = document.querySelector('.sketchContainer');
const fillBtn = document.querySelector('.fill');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const gridBtn = document.getElementById('gridLines');
const colorPicker = document.getElementById('colorPicker')

let currentColor = '#333333';
let gridMode = false;
let currentSize = 16;
let currentMode = 'fill';

fillBtn.onclick = () => swapModes('fill');
rainbowBtn.onclick = () => swapModes('rainbow');
eraserBtn.onclick = () => swapModes('eraser');
clearBtn.onclick = () => clearGrid();
gridBtn.onclick = () => toggleGridLines(gridMode);
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorPicker.oninput = (e) => newColor(e.target.value)

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;


  for (let i = 0; i < size * size; i++) {
    gridBox = document.createElement('div');
    gridBox.classList.add('grid');
    gridBox.addEventListener('mouseover', changeColor);
    gridBox.addEventListener('mousedown', changeColor);
    gridContainer.appendChild(gridBox);
  }
}

function newColor(value) {
  currentColor = value
}

function changeSize(value) {
  currentSize = value
  updateSizeDisplay(value);
  clearGrid();
  makeGrid(value);
}

function updateSizeDisplay(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function clearGrid() {
  gridContainer.innerHTML = '';
  let currentGrid = parseInt(sizeValue.innerHTML)
  makeGrid(currentGrid);
}


function toggleGridLines(gridMode) {

  if (gridMode === true) {
    gridBox.classList.remove('linesOn');
    gridBtn.classList.remove('button-active');
    gridMode = false;
  } else if (gridMode === false) {
    gridBox.classList.add('linesOn');
    gridBtn.classList.add('button-active');
    gridMode = true;
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'fill') {
    e.target.style.backgroundColor = currentColor;
  }
  else if (currentMode === 'rainbow') {
    function randomColor() { return Math.floor(Math.random() * 256) }
    e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
  }
  else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function swapModes(newMode) {

  if (currentMode === 'fill') {
    fillBtn.classList.remove('button-active');
  } else if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('button-active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('button-active');
  }

  currentMode = newMode;

  if (newMode === 'fill') {
    fillBtn.classList.add('button-active')
  } else if (newMode === 'rainbow') {
    rainbowBtn.classList.add('button-active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('button-active')
  }
}

swapModes(currentMode);
makeGrid(currentSize);