const input = document.querySelector(".user-input");
const creditCardNumber = document.querySelector("#cc");
const cvvNumber = document.querySelector("#cvv");
const button = document
  .querySelector(".checkout")
  .addEventListener("click", () => {
    input.value = "";
    creditCardNumber.value = "";
    cvvNumber.value = "";
    alert("Order placed successfully!");
  });
