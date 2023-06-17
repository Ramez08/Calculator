class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // Initialize the calculator by clearing the operands and operation
    }

    clear() {
        this.currentOperand = "" // Clear the current operand
        this.previousOperand = "" // Clear the previous operand
        this.operation = undefined // Clear the operation
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // Delete the last character of the current operand

    }

    appendNumber(number) {
        if (number == "." && this.currentOperand.includes(".")) return // Prevent adding multiple decimal points
        this.currentOperand = this.currentOperand.toString() + number.toString() // Append the number to the current operand

    }

    chooseOperation(operation) {
        if (this.currentOperand == "") return // Do nothing if there is no current operand
        if (this.previousOperand !== "") {
            this.compute() // Perform the calculation if there is a previous operand
        }
        this.operation = operation // Set the chosen operation
        this.previousOperand = this.currentOperand // Store the current operand as the previous operand
        this.currentOperand = "" // Clear the current operand for the next input

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) // Convert the previous operand to a number
        const current = parseFloat(this.currentOperand) // Convert the current operand to a number
        if(isNaN(prev) || isNaN(current)) return // Return if the operands are not valid numbers
        switch (this.operation) { // Perform the calculation based on the operation
        case "+":
            computation = prev + current
            break
        case '*':
            computation = prev * current
            break
        case "-":
            computation = prev - current
            break
        case "÷":
            computation  = prev / current
            break
        default: 
            return
        }
        this.currentOperand = computation // Store the result in the current operand
        this.operation = undefined // Clear the operation
        this.previousOperand = "" // Clear the previous operand
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // Get the integer part of the number
        const decimalDigits = stringNumber.split('.')[1] // Get the decimal part of the number
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = " " // Display a space if the integer part is NaN (not a number)
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) // Add comma separators for thousands in the integer part
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}` // Return the formatted number with decimal part
        } else {
            return integerDisplay // Return the formatted number without decimal part
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) // Update the current operand text element
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // Update the previous operand text element with the operation
        } else {
            this.previousOperandTextElement.innerText = "" // Clear the previous operand text element
        }

    }


}

const numberButtons = document.querySelectorAll('[data-number]') // Get all number buttons
const operationsButtons = document.querySelectorAll('[data-operation]') // Get all operation buttons
const equalButton = document.querySelector('[data-equals]') // Get the equals button
const deleteButton = document.querySelector('[data-delete]') // Get the delete button
const allClearButton = document.querySelector('[data-all-clear]') // Get the all clear button
const previousOperandTextElement = document.querySelector('[data-previous-operand]') // Get the previous operand text element
const currentOperandTextElement = document.querySelector('[data-current-operand]') // Get the current operand text element

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) // Create a new instance of the Calculator class

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) // Append the clicked number to the calculator's current operand
        calculator.updateDisplay() // Update the display
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) // Set the chosen operation in the calculator
        calculator.updateDisplay() // Update the display
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute() // Perform the calculation
    calculator.updateDisplay() // Update the display
})

allClearButton.addEventListener('click', () => {
    calculator.clear() // Clear the calculator
    calculator.updateDisplay() // Update the display
})

deleteButton.addEventListener('click', () => {
    calculator.delete() // Delete the last character of the current operand
    calculator.updateDisplay() // Update the display
})
