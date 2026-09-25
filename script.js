const output = document.querySelector("#output-frame");
const inputs = document.querySelectorAll("button");
let firstNumber = "";
let operator = "+";
let secondNumber = "";
let isFirstNumber = true;

const add = ((a,b) => a + b);

const substract = ((a,b)=> a - b);

const multiply = ((a,b) => a * b);

const divide = ((a,b) => a / b);

const percent = ((a) => a / 100);

const calculate = ((a,b,c) => {
    a = Number(a);
    c = Number(c);
    switch (b) {
        case "+":
            return add(a,c);
        case "-": 
            return substract(a,c);
        case "*": 
            return multiply(a,c);
        case "/": 
            return divide(a,c);
        default:
            alert('Expression Error');
    }
});

inputs.forEach((input) => {
    input.addEventListener('click', (event) => {
    console.log(event.target.textContent);
    

    if (event.target.classList.contains("operator")) {
        if (secondNumber != "") {
        firstNumber = calculate(firstNumber, operator, secondNumber);
        secondNumber = "";
        output.textContent = firstNumber;
        }
        operator = event.target.textContent;
        output.textContent += event.target.textContent;
        isFirstNumber = false;

    }

    
    if (event.target.classList.contains("number") && isFirstNumber === true) {
            firstNumber += event.target.textContent;
            output.textContent += event.target.textContent;
        } else if (event.target.classList.contains("number") && isFirstNumber === false)  {
            secondNumber += event.target.textContent;
            output.textContent += event.target.textContent;
        }
    
    /*if (event.target.classList.contains("equal")) {
        let total = calculate(firstNumber, operator, secondNumber);
        output.textContent = total;
    }*/



    });
});