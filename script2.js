console.log("ready to convert");

//let base_url = "https://api.frankfurter.app/latest?from=USD&to=INR ";
let base_url = "https://api.frankfurter.app/latest? "; // working url

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    //newOption.innerText = `${currCode} - ${countryList[currCode]}`;
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".Amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 0) {
    amountVal = 1;
    amount.value = "1";
  }

  const URL = `${base_url}amount=${amountVal}&from=${fromCurr.value}&to=${toCurr.value}`;

  let response = await fetch(URL);

  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmount = amountVal * rate;
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSRc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSRc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
