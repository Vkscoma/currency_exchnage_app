// Variables
const currencySelectorOne = document.getElementById("currency-1");
const currencySelectorTwo = document.getElementById("currency-2");
const amountInputOne = document.getElementById("amount-one");
const amountInputTwo = document.getElementById("amount-two");

const swapButton = document.getElementById("swap");
const displayConversionRate = document.getElementById("rate");

// Function -> Call API and update DOM elements

function calculate() {
    const currencyOne = currencySelectorOne.value;
    const currencyTwo = currencySelectorTwo.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/b65e9fd9bf00d8e2c771cc31/latest/${currencyOne}`
    )
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            const rate = data.conversion_rates[currencyTwo];
            //console.log(rate);

            displayConversionRate.innerHTML = `
      1 ${currencySelectorOne.value} = ${rate.toFixed(2)} 
      ${currencySelectorTwo.value}
      `;
            amountInputTwo.value = (amountInputOne.value * rate).toFixed(2);
        });
}

// Event Listeners
currencySelectorOne.addEventListener("change", calculate);
currencySelectorTwo.addEventListener("change", calculate);
amountInputOne.addEventListener("input", calculate);
amountInputTwo.addEventListener("input", calculate);

swapButton.addEventListener("click", () => {
    const intialValue = currencySelectorOne.value;
    currencySelectorOne.value = currencySelectorTwo.value;
    currencySelectorTwo.value = intialValue;
    calculate();
});

calculate();

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode");

darkModeToggle.addEventListener("change", () => {
    const selectElements = document.querySelectorAll("select");
    const inputElements = document.querySelectorAll("input");

    document.body.classList.toggle("dark__mode");
    selectElements.forEach((select) => select.classList.toggle("dark__mode"));
    inputElements.forEach((input) => input.classList.toggle("dark__mode"));
});
