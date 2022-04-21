function updateScreen() {

}

function reset() {
	newNumber = true;
	first = undefined;
	second = undefined;
	display.textContent = "0";
}

// get selectors for screen
let display = document.querySelector('#display');
let ac = document.querySelector('#ac');

// set event listener on clear button and inputs
ac.addEventListener('click', reset);

// variables initialization
let newNumber = false;
let first = undefined;
let second = undefined;
display.textContent = "4984";


// reset();