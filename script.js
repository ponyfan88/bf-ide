const STACK_SIZE = 3000;
const MAX_COUNTER = 8192;

const inputHtml = document.getElementById("input");
const bfInputHtml = document.getElementById("bfinput");

const outputHtml = document.getElementById("display");
const stackOutputHtml = document.getElementById("stackdisplay");
const extraOutputHtml = document.getElementById("extradisplay");

outputHtml.innerHTML = "";
stackOutputHtml.innerHTML = "";
extraOutputHtml.innerHTML = "";

var input = inputHtml.value

var bfid;

bf(); // prints empty stack to screen

inputHtml.onchange = function () {
    bf();
};

bfInputHtml.oninput = function () {
    bf();
};

var index = 0;

var maxIndex = 0;

var stack = new Array(STACK_SIZE).fill(0);

var returnTo = new Array();

var counter = 0;

var valid;

var inputIndex = 0;

var finalIndex = 0;

var i = 0;

function bf() {

    extraOutputHtml.innerHTML = "";
    
    input = inputHtml.value

    if (!bfparse()) {
        extraOutputHtml.innerHTML = "program has unmatched loop"
        return;
    }

    outputHtml.innerHTML = "";
    extraOutputHtml.innerHTML = "";
    stackOutputHtml.innerHTML = "";
    index = 0;

    maxIndex = 0;

    if (!input.includes(".")) {
        outputHtml.innerHTML = "this program does not output anything";
    }

    stack = new Array(STACK_SIZE).fill(0);

    returnTo = new Array();

    counter = 0;

    valid;

    inputIndex = 0;

    finalIndex = 0;

    i = 0;

    window.cancelAnimationFrame(bfid);
    bfid = window.requestAnimationFrame(bfloop);
}


function bfparse() {
    let indent = 0;

    for (var i = 0; i < input.length; i++) {
        switch (input[i]) {
            case "[":
                indent++;
                break;
            case "]":
                indent--;
                break;
        }
    }

    return indent == 0;
}

function bfloop() {
    extraOutputHtml.innerHTML = ""

    var operator = input.charAt(i);

    valid = true;

    switch (operator) {
        case "+":
            stack[index]++;
            break;
        case "-":
            stack[index]--;
            break;
        case "<":
            index--;
            break;
        case ">":
            index++;
            break;
        case "[":
            returnTo.push(i);
            break;
        case "]":
            counter++;
            if (counter < MAX_COUNTER) {
                if (stack[index] == 0) {
                    returnTo.pop();
                    counter = 0;
                }
                else {
                    i = returnTo[returnTo.length - 1];
                }
            }
            else {
                extraOutputHtml.innerHTML += "program has too many loops (" + counter + " loops > MAX_COUNTER " + MAX_COUNTER + ")";
                i = input.length;
            }
            break;
        case ".":
            if (stack[index] == 0) {
                outputHtml.innerHTML += "<br>"
            }
            outputHtml.innerHTML += String.fromCharCode(stack[index]);
            break;
        case ",":
            stack[index] = parseInt(bfInputHtml.value.charAt(inputIndex));
            inputIndex++;
            break;
        default:
            break;
    }

    if (index > maxIndex) {
        maxIndex = index;
    }

    if (valid) {
        counter++;
    }

    finalIndex = index;

    if (i < input.length) {
        i++
        display()
        bfid = window.requestAnimationFrame(bfloop)
    }
}

function display() {
    stackOutputHtml.innerHTML = ""

    for (let i = 0; i <= maxIndex; i++) {

        if (i == finalIndex) {
            stackOutputHtml.innerHTML += "<span class=\"highlight\">" + stack[i].toString() + "</span>,";
        }
        else {
            stackOutputHtml.innerHTML += stack[i].toString() + ",";
        }
    }

    stackOutputHtml.innerHTML = stackOutputHtml.innerHTML.slice(0, -1);
}