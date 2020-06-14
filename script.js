const display = document.getElementById("display");
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', e => updateDisplay(e.target.textContent));
});

document.addEventListener('keydown', e => {
    let key;
    //Prevent quick search pop up when pressing / or *
    e.preventDefault();
    //Backspace
    if (e.keyCode == 8) key = "DEL";
    //Delete Button (germany: entf) 
    else if (e.keyCode == 46) key = "C";
    //Enter - Return
    else if (e.keyCode == 13) key = "="; 
    // * button on normal keyboard and numpad
    else if (e.keyCode == 171 || e.keyCode == 106) key = "×";
    // "/" button on normal keyboard and ÷ button on numpad
    else if (e.keyCode == 55 || e.keyCode == 111) key = "÷";
    //All numbers and the dot
    else key = e.key;

    updateDisplay(key);
});

function updateDisplay(operator) {
    //Check if pressed button is a Valid Number or "."
    if (/[0-9.]/.test(operator)) display.textContent += operator;
    else if (operator == "÷" || operator == "×" || operator == "-" || operator == "+") {
        //If an operator is pressed before any number input a "0" is put before the operator to make math possible
        if (display.textContent == "") display.textContent = `0 ${operator} `;
        else display.textContent += ` ${operator} `;
    }
    else if (operator == "C") display.textContent = "";
    else if (operator == "DEL") {
        //If the last character was a operator remove him and the 2 outter spaces, else just the number
        if (display.textContent.slice(-1) == " ") display.textContent = display.textContent.slice(0,-3);
        else display.textContent = display.textContent.slice(0,-1);
    }
    //This function was made last, if i would programm everything again i would put the string immidiately
    //into an array, i didnt do that so ill make a arr right now
    else if (operator == "+-") {
        const arr = display.textContent.split(" ")
        lastElement = arr.length - 1;
        //if the last element includes - remove it, else add it
        if (arr[lastElement].includes("-")) arr[lastElement] = arr[lastElement].slice(1);
        else arr[lastElement] = `-${arr[lastElement]}`;
        display.textContent = arr.join(" ");
    }
    //Transforms the display string into an array and puts the numbers into the operate function    
    contentArr = display.textContent.split(" ");
    console.log(contentArr);
    //length must be 5 not 4 because a space is also included as last array item (-> console.log)
    if (contentArr.length == 5 || operator == "=") {
        operate(contentArr[1],contentArr[0],contentArr[2],contentArr[3]);
    }
}



function operate(operator, a, b, lastChar) {
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
          //the + before a and b is to transform the string into a number else it would just concat
          // example 5 + 5: just a + a  would concat a b, result would be 55
          result = +a + +b;
          break;
        default:
          display.textContent = "ERROR";
          break;
    }
    //slice does prevent the display from overflow, toFixed()does not work here because
    //the digits before . can also overflow the display
    display.textContent = result.toString().slice(0,14);
    //if the operate function was not triggered by "=" but by a operator concat that operator after the result
    if (/[÷×\-+]/.test(lastChar)) display.textContent += ` ${lastChar} `
}
