const output = document.querySelector("#output-frame");
const inputs = document.querySelectorAll("button");
let firstNumber = "";
let operator = "";
let secondNumber = "";
let isFirstNumber = true;
let clearAfter = false;
let activeNumber = firstNumber;

//operations ok
const add = ((a,b) => a + b);
const substract = ((a,b)=> a - b);
const multiply = ((a,b) => a * b);
const divide = ((a,b) => a / b);
const percent = ((a) => a / 100);

//calculate ok
const calculate = ((a,b,c) => {
    a = Number(a);
    c = Number(c);
    if (b === "/" && c == 0) {
        return "Error /O";
    }
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
            alert('Error');
    }
    
});

//Event listener
inputs.forEach((input) => {
    input.addEventListener('click', (event) => {
    console.log(event.target.textContent);
    
    //clearAfter ok
    if (event.target.classList.contains("number") && clearAfter === true) {
        output.textContent = "";
        firstNumber = "";
        secondNumber ="";
        operator = "";
        isFirstNumber = true;
    } else if (event.target.classList.contains("operator") && clearAfter === true) {
        clearAfter = false;
    }

    //isOperator ok
    if (event.target.classList.contains("operator")) {
        clearAfter = false;

        if (secondNumber != "") {
        firstNumber = calculate(firstNumber, operator, secondNumber);
        secondNumber = "";

            if(isNaN(firstNumber)) {
                output.textContent = firstNumber;
                clearAfter = true;
            }

            if (!isNaN(firstNumber) && !Number.isInteger(firstNumber)) {
            output.textContent = Number.parseFloat(firstNumber).toFixed(2);
            } else output.textContent = firstNumber;
        }

        if (isFirstNumber === false && operator !="") {
            output.textContent = output.textContent.slice(0, -1);
        } else if (isFirstNumber === true && operator !="") {
            output.textContent += event.target.textContent;
        }

        operator = event.target.textContent;
        output.textContent += event.target.textContent;
        isFirstNumber = false;

    }

    // isNumber ok
    if (event.target.classList.contains("number") && isFirstNumber === true) {
        clearAfter = false;    
        firstNumber += event.target.textContent;
        output.textContent += event.target.textContent;
        } else if (event.target.classList.contains("number") && isFirstNumber === false)  {
            clearAfter = false; 
            secondNumber += event.target.textContent;
            output.textContent += event.target.textContent;
        }
    
    //Equal ok
    if (event.target.id === "equal") {
        if (firstNumber != "" && operator !="" && secondNumber != "") {
            let total = calculate(firstNumber, operator, secondNumber);
            if(isNaN(total)) {
                output.textContent = total;
                clearAfter = true;
            }
            if (!isNaN(total) && !Number.isInteger(total)) {
                total = Number.parseFloat(total).toFixed(2);
                output.textContent = total; 
            } else output.textContent = total;
            firstNumber = "";
            secondNumber = "";
            isFirstNumber = true;
            clearAfter = true;
        } else {
            output.textContent ="Error";
            clearAfter = true;
        }
    }
    //Clear ok
    if (event.target.id === "clr") {
        output.textContent = "";
        clearAfter = true;
    }

    //Coder del
    if (event.target.id === "del") {
        output.textContent = output.textContent.slice(0,-1);
        if (isFirstNumber === true) {
            firstNumber = firstNumber.slice(0,-1);
        } else {
            if (secondNumber === "") {
                operator = "";
                isFirstNumber = true;
                firstNumber = output.textContent;
            }
            if (secondNumber != "") {
            secondNumber = secondNumber.slice(0, -1);
            }
            
        }

    }

    // + limiter le nombre de charactères à 9 dans l'output bar en mettant des exposants
    // pour les résultats plus longs

    //Percent ok
    if (event.target.id === "percent") {
        output.textContent += event.target.textContent;
        firstNumber = percent(firstNumber);
        output.textContent = firstNumber;
    }

    //Coder point (doublons)
    if (event.target.id === "point") {
        if (isFirstNumber === true) {
            activeNumber = firstNumber;
        } else activeNumber = secondNumber;

        if (activeNumber.includes(".") === false) {
            output.textContent += event.target.textContent;
            activeNumber += event.target.textContent;
                if (isFirstNumber === true) {
                    firstNumber = activeNumber;
                } else secondNumber = activeNumber;
        }
    }

    //Coder doublons d'opérateurs
    

    //Coder keyboard support



    });
});