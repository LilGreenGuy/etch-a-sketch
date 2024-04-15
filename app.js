const sizeValue = document.getElementById('rangeOutput');
const sizeSlider = document.getElementById('slider');
const gridContainer = document.querySelector('.sketchContainer');
const fillBtn = document.querySelector('.fill');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const gridBtn = document.getElementById('gridLines');
const colorPicker = document.getElementById('colorPicker')
const incShadeBtn = document.querySelector('.incShade');
const decShadeBtn = document.querySelector('.decShade');

let currentColor = '#333333';
let gridMode = false;
let gridSize = 16;
let currentMode = 'fill';

fillBtn.onclick = () => swapModes('fill');
rainbowBtn.onclick = () => swapModes('rainbow');
incShadeBtn.onclick = () => swapModes('incShade');
decShadeBtn.onclick = () => swapModes('decShade');
eraserBtn.onclick = () => swapModes('eraser');
clearBtn.onclick = () => function reset() {
  clearGrid()
  let currentGrid = parseInt(sizeValue.innerHTML)
  makeGrid(currentGrid);
};
gridBtn.onclick = () => toggleGridLines();
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorPicker.oninput = (e) => newColor(e.target.value)

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;


  for (let i = 0; i < size * size; i++){
    let gridBox = document.createElement('div');
    gridBox.classList.add('grid');
    gridBox.addEventListener('mouseover', changeColor);
    gridBox.addEventListener('mousedown', changeColor);
    gridContainer.appendChild(gridBox);
    gridBox.style.opacity = .1;
  }
}

function newColor(newColor) {
  currentColor = newColor
}

function changeSize(newSize) {
  gridSize = newSize
  updateSizeDisplay(newSize);
  clearGrid();
  makeGrid(gridSize);
}

function updateSizeDisplay(gridSize) {
  sizeValue.innerHTML = `${gridSize} x ${gridSize}`;
}

function clearGrid() {
  gridContainer.innerHTML = '';
}

function toggleGridLines() {
  let gridBoxes = document.querySelectorAll('div.grid');

  if (gridMode === true) {
    gridBoxes.forEach((div) => {
      div.classList.remove('linesOn');
    })
    gridBtn.classList.remove('button-active');
    gridMode = false;
  } else if (gridMode === false) {

    gridBoxes.forEach((div) => {
      div.classList.add('linesOn');
    })
    gridBtn.classList.add('button-active');
    gridMode = true;
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'fill') {
    e.target.style.backgroundColor = currentColor;
    e.target.style.opacity = 1;
  } else if (currentMode === 'rainbow') {
    const randomColor = () => Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
    e.target.style.opacity = 1;
  } else if (currentMode === 'incShade') {
    if (e.target.style.opacity < 1) {
      e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
    }
  } else if (currentMode === 'decShade') {
    if (e.target.style.opacity > 0) {
      e.target.style.opacity -= 0.1;
    }
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function swapModes(newMode) {

  if (currentMode === 'fill') {
    fillBtn.classList.remove('button-active');
  } else if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('button-active');
  } else if (currentMode === 'incShade') {
    incShadeBtn.classList.remove('button-active');
  } else if (currentMode === 'decShade') {
    decShadeBtn.classList.remove('button-active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('button-active');
  }

  currentMode = newMode;

  if (newMode === 'fill') {
    fillBtn.classList.add('button-active')
  } else if (newMode === 'rainbow') {
    rainbowBtn.classList.add('button-active')
  } else if (newMode === 'incShade') {
    incShadeBtn.classList.add('button-active')
  } else if (newMode === 'decShade') {
    decShadeBtn.classList.add('button-active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('button-active')
  }
}

swapModes(currentMode);
makeGrid(gridSize);