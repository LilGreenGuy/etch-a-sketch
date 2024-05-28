const inputForm = document.querySelector('.inputContainer');
const inputs = {
  clearBtn: inputForm.elements.clear,
  colorPicker: inputForm.elements.colorPicker,
  eraserBtn: inputForm.elements.erase,
  fillBtn: inputForm.elements.fill,
  incShadeBtn: inputForm.elements.incShade,
  decShadeBtn: inputForm.elements.decShade,
  rainbowBtn: inputForm.elements.rainbow,
  sizeSlider: inputForm.elements.slider,
  hexBox: inputForm.elements.hex,
  rgbBox: inputForm.elements.rgb
}

const displays = {
  colorDisplay: document.querySelector("#colorDisplay"),
  hexLabel: document.querySelector("#hexLabel"),
  rgbLabel: document.querySelector("#rgbLabel")
}

const containers = {
  grid: document.querySelector('.sketchContainer'),
  sizeDisplay: document.getElementById('rangeOutput')
}

const current = {
  color: inputs.colorPicker.value,
  gridSize: inputs.sizeSlider.value
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const eventListeners = [
  inputForm.addEventListener("submit", (e) => e.preventDefault()),
  inputs.fillBtn.addEventListener('click', (e) => {
    swapModes(e);
  }),
  inputs.rainbowBtn.addEventListener('click', (e) => {
    swapModes(e);
  }),
  inputs.incShadeBtn.addEventListener('click', (e) => {
    swapModes(e);
  }),
  inputs.decShadeBtn.addEventListener('click', (e) => {
    swapModes(e);
  }),
  inputs.eraserBtn.addEventListener('click', (e) => {
    swapModes(e);
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
    updateColorDisplay();
  }),
  inputs.hexBox.addEventListener("click", function() {
    updateColorDisplay();
  }),
  inputs.rgbBox.addEventListener("click", function() {
    updateColorDisplay();
  }),
]

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
}

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
  if (inputs.fillBtn.classList.contains("button-active")) {
    e.target.style.backgroundColor = current.color;
    e.target.style.opacity = 1;
  } else if (inputs.rainbowBtn.classList.contains("button-active")) {
    const randomColor = () => Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    e.target.style.opacity = 1;
  } else if (inputs.incShadeBtn.classList.contains("button-active")) {
    if (e.target.style.opacity < 1) {
      e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
    }
  } else if (inputs.decShadeBtn.classList.contains("button-active")) {
    if (e.target.style.opacity > 0) {
      e.target.style.opacity -= 0.1;
    }
  } else if (inputs.eraserBtn.classList.contains("button-active")) {
    e.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    e.target.style.opacity = 0.0;
  }
}

function swapModes(e) {
  if (!e.target.classList.contains("button-active")) {
    for (const input of inputForm) {
      input.classList.remove("button-active");
    }
    e.target.classList.toggle("button-active");
  }
}

function hex_to_RGB(hex) {
  let m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }
  innerRGB() {
    const { r, g, b } = this;
    return `${r}, ${g}, ${b}`;
  }
  rgb() {
    return `rgb(${this.innerRGB()})`;
  }
  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  hsl() {
    const { h, s, l } = this;
    return `hsl(${h},${s}%, ${l}%)`;
  }
  fullSaturation() {
    const { h, l } = this;
    return `hsl(${h},100%, ${l}%)`;
  }
  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360
    return `hsl(${newHue},${s}%, ${l}%)`;
  }
  calcHSL() {
    let { r, g, b } = this;
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    else
      // Blue is max
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

function convertColor() {
  const convertedColor = hex_to_RGB(current.color);
  return secondColor = new Color(convertedColor.r, convertedColor.g, convertedColor.b);
}

function updateColorDisplay() {
  convertColor();
  if(inputs.hexBox.checked) {
  displays.colorDisplay.innerHTML = inputs.colorPicker.value;
  } else if(inputs.rgbBox.checked) {
    displays.colorDisplay.innerHTML = `${secondColor.rgb()}`;
  }
  displays.colorDisplay.style.color = inputs.colorPicker.value;
  displays.hexLabel.style.color = inputs.colorPicker.value;
  displays.rgbLabel.style.color = inputs.colorPicker.value;
}

updateColorDisplay();
makeGrid(current.gridSize);