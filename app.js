const inputs = {
  clearBtn: document.querySelector('.clear'),
  colorPicker: document.getElementById('colorPicker'),
  eraserBtn: document.querySelector('.erase'),
  fillBtn: document.querySelector('.fill'),
  incShadeBtn: document.querySelector('.incShade'),
  decShadeBtn: document.querySelector('.decShade'),
  rainbowBtn: document.querySelector('.rainbow'),
  sizeSlider: document.getElementById('slider'),
}

const containers = {
  grid: document.querySelector('.sketchContainer'),
  sizeDisplay: document.getElementById('rangeOutput')
}

const current = {
  color: inputs.colorPicker.value,
  gridSize: inputs.sizeSlider.value,
  mode: 'fill'
}

const eventListeners = [
  inputs.fillBtn.addEventListener('click', () => {
    swapModes('fill');
  }),
  inputs.rainbowBtn.addEventListener('click', () => {
    swapModes('rainbow');
  }),
  inputs.incShadeBtn.addEventListener('click', () => {
    swapModes('incShade');
  }),
  inputs.decShadeBtn.addEventListener('click', () => {
    swapModes('decShade');
  }),
  inputs.eraserBtn.addEventListener('click', () => {
    swapModes('eraser');
  }),
  inputs.clearBtn.addEventListener('click', resetGrid),
  inputs.sizeSlider.addEventListener('click', (e) => {
    updateSizeDisplay(e.target.value);
  }),
  inputs.sizeSlider.addEventListener('change', (e) => {
    changeSize(e.target.value);
  }),
  inputs.colorPicker.addEventListener('input', (e) => {
    newColor(e.target.value);
  })
]

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size) {
  containers.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  containers.grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;


  for (let i = 0; i < size * size; i++) {
    let gridBox = document.createElement('div');
    gridBox.classList.add('grid');
    gridBox.addEventListener('mouseover', changeColor);
    gridBox.addEventListener('mousedown', changeColor);
    containers.grid.appendChild(gridBox);
    gridBox.style.opacity = 0.0;
  }
}

function resetGrid() {
  clearGrid();
  makeGrid(current.gridSize);
};

function newColor(newColor) {
  current.color = newColor;
}

function changeSize(newSize) {
  current.gridSize = newSize;
  updateSizeDisplay(newSize);
  clearGrid();
  makeGrid(current.gridSize);
}

function updateSizeDisplay(gridSize) {
  containers.sizeDisplay.innerHTML = `${gridSize} x ${gridSize}`;
}

function clearGrid() {
  containers.grid.innerHTML = '';
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (current.mode === 'fill') {
    e.target.style.backgroundColor = current.color;
    e.target.style.opacity = 1;
  } else if (current.mode === 'rainbow') {
    const randomColor = () => Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    e.target.style.opacity = 1;
  } else if (current.mode === 'incShade') {
    if (e.target.style.opacity < 1) {
      e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
    }
  } else if (current.mode === 'decShade') {
    if (e.target.style.opacity > 0) {
      e.target.style.opacity -= 0.1;
    }
  } else if (current.mode === 'eraser') {
    e.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    e.target.style.opacity = 0.0;
  }
}

function swapModes(newMode) {

  if (current.mode === 'fill') {
    inputs.fillBtn.classList.remove('button-active');
  } else if (current.mode === 'rainbow') {
    inputs.rainbowBtn.classList.remove('button-active');
  } else if (current.mode === 'incShade') {
    inputs.incShadeBtn.classList.remove('button-active');
  } else if (current.mode === 'decShade') {
    inputs.decShadeBtn.classList.remove('button-active');
  } else if (current.mode === 'eraser') {
    inputs.eraserBtn.classList.remove('button-active');
  }

  current.mode = newMode;

  if (newMode === 'fill') {
    inputs.fillBtn.classList.add('button-active');
  } else if (newMode === 'rainbow') {
    inputs.rainbowBtn.classList.add('button-active');
  } else if (newMode === 'incShade') {
    inputs.incShadeBtn.classList.add('button-active');
  } else if (newMode === 'decShade') {
    inputs.decShadeBtn.classList.add('button-active');
  } else if (newMode === 'eraser') {
    inputs.eraserBtn.classList.add('button-active');
  }
}

swapModes(current.mode);
makeGrid(current.gridSize);