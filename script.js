let panel = document.querySelector('.panel');
let buttons = document.querySelector('.buttons');
let operands = ["0","0"];
let currentOperand = 0;
let operation = null;
buttons.addEventListener('click',buttonClickHandler,{capture:true});
function buttonClickHandler(event) {
    event.stopPropagation();
    let classNames = event.target.classList;
    let firstClass = classNames.item(0);
    let secondClass = classNames.item(1);
    switch (secondClass) {
        case 'operation':
            if (currentOperand===1 && operation!=null) {
                evaluate();
            } else {
                currentOperand = 1;
            }
            switch (firstClass) {
                case 'division':
                    operation = divide;
                    break;
                case 'multiplication':
                    operation = multiply;
                    break;
                case 'addition':
                    operation = add;
                    break;
                case 'subtraction':
                    operation = subtract;
                    break;
            }
            break;
        case 'transformation':
            let entry = Number.parseFloat(operands[currentOperand]);
            switch (firstClass) {
                case 'convert-input-from-percent':
                    setOperand(currentOperand,divide(entry,100));
                    break;
                case 'clear-entry':
                    setOperand(currentOperand,0);
                    break;
                case 'backspace':
                    setOperand(currentOperand,operands[currentOperand].slice(0,-1));
                    break;
                case 'reciprocal':
                    setOperand(currentOperand,divide(1,entry));
                    break;
                case 'square':
                    setOperand(currentOperand,entry**2);
                    break;
                case 'square-root':
                    setOperand(currentOperand,entry**0.5);
                    break;
                case 'flip-sign':
                    setOperand(currentOperand,entry*-1);
                    break;
            }
            break;
        case null:
            let operandText = operands[currentOperand];
            switch (firstClass) {
                case 'clear':
                    operation = null;
                    currentOperand = 0;
                    setOperand(0,"0");
                    setOperand(1,"0");
                    break;
                case 'number':
                    if (currentOperand===1 && operation===null) {
                        currentOperand = 0;
                        setOperand(0,'0');
                    }
                    let passIn;
                    if (operandText==='0') {
                        passIn = event.target.innerText;
                    } else {
                        passIn = operands[currentOperand] + event.target.innerText;
                    }
                    setOperand(currentOperand,passIn);
                    break;
                case 'dot':
                    if (operands[currentOperand].includes('.')) return;
                    setOperand(currentOperand,operands[currentOperand] + '.');
                    break;
                case 'equal':
                    evaluate();
                    currentOperand = 0;
                    break;
            }
            break;
    }
}
function multiply(a,b) {
    return (a*b).toFixed(2);
}
function divide(a,b) {
    if (b===0) {
        return "not today big dawg";
    }
    return (a/b).toFixed(2);
}
function add(a,b) {
    return (a+b).toFixed(2);
}
function subtract(a,b) {
 return (a-b).toFixed(2);
}
function evaluate() {
    let firstOp = Number.parseFloat(operands[0]);
    let secondOp = Number.parseFloat(operands[1]);
    let answer = operation(firstOp,secondOp);
    operation = null;
    setOperand(1,'0');
    setOperand(0,answer);
}
function setOperand(index,value) {
    console.log(value);
    let asString = value.toString();
    operands[index] = asString;
    panel.innerText = asString;
}