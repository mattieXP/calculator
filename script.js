const output = document.querySelector("#output-frame");
const inputs = document.querySelectorAll("button");
let firstNumber = "";
let operator = "";
let secondNumber = "";
let isFirstNumber = true;
let clearAfter = false;
let activeNumber = firstNumber;

//operations
const add = ((a,b) => a + b);
const substract = ((a,b)=> a - b);
const multiply = ((a,b) => a * b);
const divide = ((a,b) => a / b);
const percent = ((a) => a / 100);

//operator array
const operatorArray = ["+", "-", "*", "/"];

//calculate
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

const limitChar = function(output) {
    output = String(output);
    if (output.length > 9) {
        output = Number(output);
    return output.toExponential(2);
    } else return output;
}

const triggerCalc = function(key) {   

//clearAfter
    if (clearAfter === true) {
        output.textContent = "";
        firstNumber = "";
        secondNumber ="";
        operator = "";
        isFirstNumber = true;
    }

    //isOperator
    if (operatorArray.includes(key)) {
        clearAfter = false;
        
        if (secondNumber != "") {
        firstNumber = calculate(firstNumber, operator, secondNumber);
        secondNumber = "";
        operator = "";

            if(isNaN(firstNumber)) {
                output.textContent = firstNumber;
                clearAfter = true;
            }

            if (!isNaN(firstNumber) && !Number.isInteger(firstNumber)) {
            output.textContent = Number.parseFloat(firstNumber).toFixed(2);
            } else output.textContent = limitChar(firstNumber);
        }

        if (isFirstNumber === false && operator !="") {
            output.textContent = output.textContent.slice(0, -1);
        } else if (isFirstNumber === true && operator !="") {
            output.textContent += key;
        }

        operator = key;
        output.textContent += operator;
        isFirstNumber = false;

    }

    // isNumber
    if (!isNaN(Number(key)) && isFirstNumber === true) {
        clearAfter = false;
        let numberLength = output.textContent.length;
        if (numberLength <9) {
            firstNumber += key;   
            output.textContent += key;
        } else {
            output.textContent +="";
            firstNumber += "";   
        }
    } else if (!isNaN(Number(key)) && isFirstNumber === false)  {
            clearAfter = false; 
            let numberLength = output.textContent.length;
            if (numberLength <9) {
            output.textContent += key;
            secondNumber += key;
            } else {
                output.textContent +="";
                secondNumber += "";
            }
    }
    
    //Equal
    if (key === "equal") {
        if (firstNumber != "" && operator !="" && secondNumber != "") {
            let total = calculate(firstNumber, operator, secondNumber);
            if(isNaN(total)) {
                output.textContent = total;
                clearAfter = true;
            }
            if (!isNaN(total) && !Number.isInteger(total)) {
                total = Number.parseFloat(total).toFixed(2);
                output.textContent = total; 
            } else output.textContent = limitChar(total);
            firstNumber = "";
            secondNumber = "";
            isFirstNumber = true;
            clearAfter = true;
        } else {
            output.textContent ="Error";
            clearAfter = true;
        }
    }
    //Clear
    if (key === "clr") {
        output.textContent = "";
        clearAfter = true;
    }

    //del function
    if (key === "del") {
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

    //Percent
    if (key === "percent") {
        firstNumber = percent(firstNumber);
        firstNumber = String(firstNumber);
        output.textContent = firstNumber;
    }

    //Point (doublons)
    if (key === "point") {
        if (isFirstNumber === true) {
            activeNumber = firstNumber;
        } else activeNumber = secondNumber;

        if (activeNumber.includes(".") === false) {
            output.textContent += ".";
            activeNumber += ".";
                if (isFirstNumber === true) {
                    firstNumber = activeNumber;
                } else secondNumber = activeNumber;
        }
    }
}
 
//Events listener
inputs.forEach((input) => {

    input.addEventListener('click', (event) => {
    console.log(event.target.textContent);

    if (event.target.id !== "") {
    event = event.target.id;
    } else event = event.target.textContent;

    triggerCalc(event);
    });

});

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    let command = "";
    if ((!isNaN(Number)(event.key)) || operatorArray.includes(event.key)) {
        command = event.key;
    } else {
        switch (event.key) {
            case "Enter":
                command = "equal";
                break;
            case "Backspace" :
                command = "del";
                break;
            case "Escape":
                command = "clr";
                break;
            case "%":
                command = "percent";
                break;
            case ".":
                command = "point";
                break;
            default:
                command = "";

        }
    }
    if (command !=="" && command !==" ") {
        triggerCalc(command);
    }
    
});