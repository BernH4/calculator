const display = document.getElementById("display");
const buttons = document.querySelectorAll('button');
let test;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => updateDisplay(e));
});

function updateDisplay(e) {
    let operator = e.target.textContent;
    //console.log(operator);
    //Check if pressed button is a Valid Number or "."
    if (/[0-9.]/.test(operator)) display.textContent += operator;
    else if (operator == "÷" || operator == "×" || operator == "-" || operator == "+") {
        display.textContent += ` ${operator} `;
    }
    else if (operator == "C") display.textContent = "";
    else if (operator == "DEL") display.textContent = display.textContent.slice(0, -1);
    //else if (operator == "=") calculate();
    
    opArr = display.textContent.match(/[÷×\-+]/g) || [];
    if (opArr.length == 2 || operator == "=") {
        const numbers = display.textContent.match(/\d+/g);
        const lastChar = display.textContent.slice(-2,-1);
        operate(opArr[0], numbers[0], numbers[1], lastChar); 
        //console.log(opArr);
    }
    //console.log(opArr);

}



function operate(operator, a, b, lastChar) {
    //TODO MATH
    let result;
    switch (operator) {
        case "÷":
          result = a / b;
          break;
        case "×":
          result = a * b;
          break;
        case "-":
          result = a - b;
          break;
        case "+":
          result = +a + +b;
          break;
        default:
          console.log("ERROR")
          break;
    }
    display.textContent = result;
    console.log(lastChar);
    if (/[÷×\-+]/.test(operator)) display.textContent += " " + lastChar + " "; 
}

//function calculate() {
//    const textArr = display.textContent.split("");
//    const solution = 9999;
//    console.log(textArr);
//    for(let i = 0; i < textArr.length; i++) {
//        if (textArr[i] == "÷" || textArr[i] == "×") {
//            //Bug: not working with 2 digits
//            console.log(textArr[i], textArr[i-2], textArr[i+2]);
//            //operate(textArr[i], textArr[i-2], textArr[i+2]);
//        }
//    }
//}
