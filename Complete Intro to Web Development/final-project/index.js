const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".scoreboard");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  //state for the app
  let currentGuess = "";
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  //using api to grab word of the day
  const res = await fetch("https://words.dev-apis.com/word-of-the-day").then(
    (res) => res.json()
  );
  const word = res.word.toUpperCase();
  console.log(word);
  const wordParts = word.split("");
  setLoading(isLoading);
  isLoading = false;
  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  // user adds a letter to the current guess
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to the end
      currentGuess += letter;
    } else {
      // replace the last letter
      current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length < ANSWER_LENGTH) {
      //do nothing
      return;
    }
    //making array of guessedWord
    const guessParts = currentGuess.split("");

    const map = makeMap(wordParts);
    console.log(map);
    let allRight = true;

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }
    // second pass finds close and wrong letters
    // we use the map to make sure we mark the correct amount of
    // close letters
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        //do nothing
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        // mark as close
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        //wrong
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add(
          "wrong",
          "invalid"
        );
        // letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      }
    }
    currentRow++;
    let check = currentGuess.split(",");
    currentGuess = "";
    if (allRight) {
      // win
      alert("you win");
      document.querySelector(".spiral").classList.add("hidden");
      done = true;
    } else if (currentRow === ROUNDS) {
      // lose
      alert(`you lose, the word was ${word}`);
      // document.getElementById("letter-0").innerText = "";
      // document.getElementsByClassName("scoreboard-letter").innerText = "";
      Array.from(document.getElementsByClassName("scoreboard-letter")).forEach(
        (element) => (element.innerText = "")
      );
      // document
      //   .querySelector("scoreboard-letter")
      //   .forEach((element) => (element.innerText = ""));
      Array.from(document.getElementsByClassName("scoreboard-letter")).forEach(
        (element) => (element.style.backgroundColor = "white")
      );
      done = true;
    }
  }
  function setLoading(isLoading) {
    console.log(isLoading);
    loadingDiv.classList.toggle("hidden", !isLoading);
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) {
      //do nothing
      return;
    }
    const action = event.key;
    console.log(action);
    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}
init();
