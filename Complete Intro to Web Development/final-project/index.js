const letter = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".scoreboard");
const ANSWER_LENGTH = 5;
async function init() {
  const currentGuess = "";
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
  }
  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    console.log(action);
    if (action === "Enter") {
      commitGuess();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}
function isLetter(action) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
