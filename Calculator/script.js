const app = document.getElementById('app');
const display = document.getElementById('display');
const operation = document.getElementById('operation');
const darkModeToggle = document.getElementById('darkModeToggle');
const buttonsContainer = document.querySelector('.grid');

let darkMode = false;
let currentDisplay = "0";
let currentOperation = "";
let prevValue = "";

const buttons = ["C", "+/-", "%", "/", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

buttons.forEach((btn, index) => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.className = `calculator-button ${
        index % 4 === 3 || btn === "="
            ? "bg-orange-400 hover:bg-orange-500"
            : "bg-white hover:bg-gray-100"
    } ${btn === "0" ? "col-span-2" : ""}`;
    button.onclick = () => handleButtonClick(btn);
    buttonsContainer.appendChild(button);
});

function handleButtonClick(value) {
    if (value === "C") {
        handleClear();
    } else if (value === "=") {
        handleEqualsClick();
    } else if (["+", "-", "x", "/"].includes(value)) {
        handleOperationClick(value);
    } else {
        handleNumberClick(value);
    }
}

function handleNumberClick(num) {
    currentDisplay = currentDisplay === "0" ? num : currentDisplay + num;
    updateDisplay();
}

function handleOperationClick(op) {
    if (prevValue) {
        handleEqualsClick();
    } else {
        prevValue = currentDisplay;
        currentDisplay = "0";
    }
    currentOperation = op;
    updateDisplay();
}

function handleEqualsClick() {
    if (!prevValue || !currentOperation) return;
    const prev = parseFloat(prevValue);
    const current = parseFloat(currentDisplay);
    let result = 0;
    switch (currentOperation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "x":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
    }
    currentDisplay = result.toString();
    prevValue = "";
    currentOperation = "";
    updateDisplay();
}

function handleClear() {
    currentDisplay = "0";
    prevValue = "";
    currentOperation = "";
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentDisplay;
    operation.textContent = `${prevValue} ${currentOperation}`;
}

function toggleDarkMode() {
    darkMode = !darkMode;
    app.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = darkMode
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// Initialize Lucide icons
lucide.createIcons();
