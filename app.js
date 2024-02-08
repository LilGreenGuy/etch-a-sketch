// create a square grid using flexbox in container div 

const rangeValue = document.querySelector("#rangeOutput");
const input = document.querySelector("#slider");
rangeValue.textContent = input.value;
input.addEventListener("input", (event) => {
  rangeValue.textContent = event.target.value;
});

let gridInput = rangeValue.value;
function makeGrid(number) {
    const gridContainer = document.querySelector('.sketchContainer');
    for (let i = 0; i < number; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid');
        gridContainer.appendChild(gridItem);
    }
}

function sliderValue() {
    return gridInput;
}

//      create a function that takes in a number via input from DOM
makeGrid(gridInput);
//      to determine density of grid
//      create an event handler that will color selected grid in with input color
//      make the event handler capable of clicking and holding so you can 'draw' across
//      the screen
//      make the filled color chooseable via an input
