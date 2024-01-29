// create a square grid using flexbox in container div 

function makeGrid(number) {
    const gridContainer = document.querySelector('.sketchContainer');
    for (let i = 0; i < number; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid');
        gridContainer.appendChild(gridItem);
    }
}

//      create a function that takes in a number via input from DOM
function adjustGridSize() {
    const gridSlider = document.querySelector('.slider');
    let gridVal = document.querySelector('.slider').value;
    document.getElementById('output').innerHTML = gridVal
}
document.querySelector('.slider').value = 16
makeGrid(16)
//      to determine density of grid
//      create an event handler that will color selected grid in with input color
//      make the event handler capable of clicking and holding so you can 'draw' across
//      the screen
//      make the filled color chooseable via an input