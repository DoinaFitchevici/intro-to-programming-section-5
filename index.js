const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("num-of-guesses"); //Changed the ID in index.html
const correctMessage = document.getElementById("correct");
const numberLessThanZero = document.getElementById("num-less-than-0");

let targetNumber;
let attempts = 0; //Changed "const" to "let" to reassign
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  let guess = parseInt(guessInput.value, 10);

  if (guess < 1) {
    numberLessThanZero.style.display = "";
    return;
  }
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ""; //Fixed the display message
    } else {
      tooHighMessage.style.display = ""; //Fixed the display message
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    //Deleted extra '='  comparison operator
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = ""; //Added the display message
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    //Deleted '=' from loop function
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // Corrected the variable name

  // Enable the input and submit button
  submitButton.disabled = false; //Fixed spelling property name
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
