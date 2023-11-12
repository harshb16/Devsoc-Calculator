const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const display = document.querySelector('p');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    const calculatorDisplayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      calculatorDisplayValue === '0' ? number : calculatorDisplayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    // if no decimal, add one
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
    // display.textContent += operator;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    display.textContent = '';
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => {
      sendNumberValue(inputBtn.value);
      display.textContent += inputBtn.value;
    });
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => {
      useOperator(inputBtn.value);
      if (inputBtn.value !== '=') display.textContent += inputBtn.value;
    });
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// reset all values
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
  display.textContent = '';
}

// event listener
clearBtn.addEventListener('click', resetAll);
