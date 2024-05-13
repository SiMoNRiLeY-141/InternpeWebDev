let display = document.getElementById('display');
let expression = '';

function appendToDisplay(value) {
  expression += value;
  display.value = expression;
}

function calculate() {
    try {
      expression = eval(expression);
      // Round the result to 10 decimal places
      expression = parseFloat(expression.toFixed(10));
      display.value = expression;
    } catch (error) {
      display.value = 'Error';
    }
  }
  

function clearDisplay() {
  expression = '';
  display.value = '';
}

function backspace() {
  expression = expression.slice(0, -1);
  display.value = expression;
}

function calculate() {
  try {
      // Check for division by zero
      if (expression.includes('/0')) {
          throw new Error('Undefined (Division by 0)');
      }
      expression = eval(expression);
      // Round the result to 10 decimal places
      expression = parseFloat(expression.toFixed(10));
      display.value = expression;
  } catch (error) {
      if (error instanceof SyntaxError) {
          display.value = 'Invalid expression';
      } else {
          display.value = error.message;
      }
  }
}
