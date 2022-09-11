const input = document.querySelector(".user-input");
const creditCardNumber = document.querySelector("#cc");
const ccvNumber = document.querySelector("#ccv");
const button = document
  .querySelector(".checkout")
  .addEventListener("click", () => {
    input.value = "";
    creditCardNumber.value = "";
    ccvNumber.value = "";
    alert("Order placed successfully!");
  });
