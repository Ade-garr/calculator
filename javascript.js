function updateScreen(number) {
	display.textContent = number;
}

function addNumber(e) {
	if (operator === undefined) { // add number to first member
		if (first.length === 9) // don't add number if length > 9
			return ;
		else {
			first += e.target.textContent;
			updateScreen(first);
		}
	}
	else { // add number to second member
		if (second.length === 9) // don't add number if length > 9
			return ;
		else {
			second += e.target.textContent;
			updateScreen(second);
		}
	}
}

function eraseNumber() {
	if (operator === undefined) { // erase number of first member
		if (first.length === 0) // don't erase number if length = 0
			return ;
		else {
			first = first.slice(0, -1);
			updateScreen(first);
		}
	}
	else { // erase number to second member
		if (second.length === 0) // don't erase number if length = 0
			return ;
		else {
			second = second.slice(0, -1);
			updateScreen(second);
		}
	}
}

function reset() {
	newNumber = true;
	first = "";
	second = "";
	operator = undefined;
	display.textContent = "0";
}

// get selectors for screen
let display = document.querySelector('#display');
let ac = document.querySelector('#ac');
let numbers = document.querySelectorAll('.number');
let erase = document.querySelector('.erase');

// set event listener on clear button and inputs
ac.addEventListener('click', reset);
numbers.forEach(number => {
	number.addEventListener('click', addNumber);
});
erase.addEventListener('click', eraseNumber);

// variables initialization
let newNumber = false; // à garder ?
let first = "";
let second = "";
let operator = undefined;
display.textContent = "4984";


// reset();




// regler le pb du plusieurs points dans mm nombre