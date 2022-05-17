function updateScreen(number) {
	display.textContent = number;
}

function hasDecimals(number) {
	return number.indexOf("."); // return -1 if no '.' found
}

function sliceLastChar(number) {
	return number.slice(0, number.length - 1);
}

function format(number) {
	for (; number.length > 9;) { // format as long as number.length > 9
		if (hasDecimals(number) !== -1) // format decimals
			number = sliceLastChar(number);
		else if (parseFloat(number) > 999999999)
			return "too high";
		else if (parseFloat(number) < -99999999)
			return "too low";
	}
	return number;
}

function addNumber(e) {
	if (newNumber === true) { // after equal or reset, in order to not add number pressed to precedent result
		first = e.target.textContent;
		updateScreen(first);
		newNumber = false;
	}
	else {
		if (operator === undefined) { // add number to first member
			if (first.length === 9) // don't add number if length > 9
				return ;
			else if (e.target.textContent === "." && first.indexOf(".") !== -1) // do nothing if "." pressed and already present in number
				return ;
			else {
				first += e.target.textContent;
				updateScreen(first);
			}
		}
		else { // add number to second member
			if (second.length === 9) // don't add number if length > 9
				return ;
			else if (e.target.textContent === "." && second.indexOf(".") !== -1) // do nothing if "." pressed and already present in number
				return ;
			else {
				second += e.target.textContent;
				updateScreen(second);
			}
		}
	}
}

function doEqual() {
	if (second !== "") { // do nothing if second member is empty
		first = doOperation(first, second, operator); // first member becomes result
		if (first.length > 9) // format if result is too long
			first = format(first);
		updateScreen(first);
		if (first === "ERROR" || first === "too high" || first === "too low" || first === "NaN") // error cases
			first = "";
		second = "";
		operator = undefined;
		operators.forEach(operator => { // reset shadows of other operators
			operator.style.boxShadow = '';
		});
		newNumber = true;
	}
}

function doOperation(first, second, operator) {
	if (operator === "1")
		return ((parseFloat(first) + parseFloat(second)).toString());
	if (operator === "2")
		return ((parseFloat(first) - parseFloat(second)).toString());
	if (operator === "3")
		return ((parseFloat(first) * parseFloat(second)).toString());
	if (operator === "4") {
		if (parseFloat(second) === 0)
			return ("ERROR");
		return ((parseFloat(first) / parseFloat(second)).toString());
	}
}

function addOperator(e) {
	if (second !== "") { // case of multiple operators without equal button pressed
		first = doOperation(first, second, operator); // first member becomes result
		if (first.length > 9) // format if result is too long
			first = format(first);
		updateScreen(first);
		if (first === "ERROR" || first === "too high" || first === "too low" || first === "NaN") // error cases
			first = "";
		second = "";
	}
	if (first === "") { // case of operator pressed without first member
		first = "0";
	}
	operator = e.target.dataset.op;
	operators.forEach(operator => { // reset shadows of other operators
		operator.style.boxShadow = '';
	});
	e.target.style.boxShadow = 'inset 0 0 0 10em rgba(255, 255, 255, 0.3)'; // highlight operator
	newNumber = false;
}

function eraseNumber() {
	if (newNumber !== true) { //don't erase if new number has to be displayed
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
}

function reset() {
	newNumber = true;
	first = "";
	second = "";
	operator = undefined;
	display.textContent = "0";
	operators.forEach(operator => {
		operator.style.boxShadow = '';
	});
}

// get selectors for screen
let display = document.querySelector('#display');
let ac = document.querySelector('#ac');
let numbers = document.querySelectorAll('.number');
let erase = document.querySelector('.erase');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal');

// set event listener on clear button and inputs
ac.addEventListener('click', reset);
numbers.forEach(number => {
	number.addEventListener('click', addNumber);
});
erase.addEventListener('click', eraseNumber);
operators.forEach(operator => {
	operator.addEventListener('click', addOperator);
});
equal.addEventListener('click', doEqual);

// variables initialization
let newNumber = true; // variable used to know if a new number has to be displayed (after an equal or reset for example)
let first = "";
let second = "";
let operator = undefined;
display.textContent = "0";