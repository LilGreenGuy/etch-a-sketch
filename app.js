// create a square grid using flexbox in container div 
function grid() {
  const INITIAL_SIZE = 16;

  const rangeValue = document.querySelector('#rangeOutput');
  const input = document.querySelector('#slider');
  const gridContainer = document.querySelector('.sketchContainer');

  rangeValue.textContent = input.value;
  input.addEventListener('input', (event) => {
    rangeValue.textContent = event.target.value;
  });
  let gridInput = rangeValue.value;

  let drag = false;
  let gridBox = document.querySelector('.grid');
  gridContainer.addEventListener(
    'mousedown', () => drag = false);

  gridContainer.addEventListener(
    'mousemove', () => drag = true);

  gridContainer.addEventListener(
    'mouseup', () => console.log(
      drag ? 'drag' : 'click'));

  if (drag == true) {
    gridBox.setAttribute('style', 'background-color: blue');
  }


  function makeGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`


    for (let i = 0; i < size * size; i++) {
      let gridItem = document.createElement('div');
      gridItem.classList.add('grid');
      gridContainer.appendChild(gridItem);
    }
  }

  function sliderValue() {
    return gridInput;
  }


  //      create a function that takes in a number via input from DOM
  makeGrid(INITIAL_SIZE);
  gridEventListener();
}
grid()
//      to determine density of grid
//      create an event handler that will color selected grid in with input color
//      make the event handler capable of clicking and holding so you can 'draw' across

//      the screen
//      make the filled color chooseable via an input
