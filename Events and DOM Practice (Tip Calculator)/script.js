// Variables

const checkTotal = document.getElementById("checkTotal");
const calcTipBtn5 = document.getElementById("calcTipBtn5%");
const calcTipBtn75 = document.getElementById("calcTipBtn7.5%");
const calcTipBtn10 = document.getElementById("calcTipBtn10%");
const tipAmount = document.getElementById("tipAmount");
let tipTotal = "";
const splitPeople = document.getElementById("splitPeople");
const splitBill = document.getElementById("splitBill");
const splitAmount = document.getElementById("splitAmount");
let splitTotal = "";
console.log(checkTotal);

// Calculate tip for 5% of total check amount

// Register button press
calcTipBtn5.addEventListener("click", () => {
    // Create a variable "bill" that parses checkTotal to see if it is a Float or Int
    let bill = parseFloat(checkTotal.value);

    // Throw error to user if they do not enter a integer or float value
    if(isNaN(bill)) {
        tipAmount.innerText = "Please enter a integer or float value"
    }
    // Multiply check total by 5% and assign as tipTotal
    else {
        tipTotal = bill * 0.05;
        tipAmount.innerText = `Tip Total: $${tipTotal.toFixed(2)}.`
    }
});


// Calculate tip for 7.5% of total check amount

// Register button press
calcTipBtn75.addEventListener("click", () => {
    // Create a variable "bill" that parses checkTotal to see if it is a Float or Int
    let bill = parseFloat(checkTotal.value);

    // Throw error to user if they do not enter a integer or float value
    if(isNaN(bill)) {
        tipAmount.innerText = "Please enter a integer or float value"
    }
    // Multiply check total by 5% and assign as tipTotal
    else {
        tipTotal = bill * 0.075;
        tipAmount.innerText = `Tip Total: $${tipTotal.toFixed(2)}.`
    }
});


// Calculate tip for 10% of total check amount

// Register button press
calcTipBtn10.addEventListener("click", () => {
    // Create a variable "bill" that parses checkTotal to see if it is a Float or Int
    let bill = parseFloat(checkTotal.value);

    // Throw error to user if they do not enter a integer or float value
    if(isNaN(bill)) {
        tipAmount.innerText = "Please enter a integer or float value"
    }
    // Multiply check total by 5% and assign as tipTotal
    else {
        tipTotal = bill * 0.1;
        tipAmount.innerText = `Tip Total: $${tipTotal.toFixed(2)}.`
    }
});


// Calculate split total
splitBill.addEventListener("click", () => {
    let bill = parseFloat(checkTotal.value);
    let people = parseInt(splitPeople.value);
    // Divide check total + tip amount by splitPeople
    splitTotal = (bill + tipTotal) / people;
    splitAmount.innerText = `Total bill after being split between ${people} people is ${splitTotal.toFixed(2)}.`
})