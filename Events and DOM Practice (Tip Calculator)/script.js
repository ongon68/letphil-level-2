// Variables

const checkTotal = document.getElementById("checkTotal");
const calcTipBtn5 = document.getElementById("calcTipBtn5%");
const calcTipBtn75 = document.getElementById("calcTipBtn7.5%");
const calcTipBtn10 = document.getElementById("calcTipBtn10%");
const tipAmount = document.getElementById("tipAmount");
let tipTotal = "";
console.log(checkTotal);

// Calculate tip for 5% of total check amount

// Register button press
calcTipBtn5.addEventListener("click", () => {
    // Multiply check total by 5% and assign as tipTotal
    tipTotal = checkTotal.value * 0.05;
    console.log(tipTotal);
    tipAmount.innerText = `Tip Total: $${tipTotal}.`
});


// Calculate tip for 7.5% of total check amount

// Register button press
calcTipBtn75.addEventListener("click", () => {
    // Multiply check total by 5% and assign as tipTotal
    tipTotal = checkTotal.value * 0.075;
    tipAmount.innerText = `Tip Total: $${tipTotal}.`
});


// Calculate tip for 10% of total check amount

// Register button press
calcTipBtn10.addEventListener("click", () => {
    // Multiply check total by 5% and assign as tipTotal
    tipTotal = checkTotal.value * 0.1;
    tipAmount.innerText = `Tip Total: $${tipTotal}.`
});