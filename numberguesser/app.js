// GAME FUNCTION
// - Player must guess a number between a min and max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Notify the player of the correct answer if loose
// - Let Player choose to play again

// Game Values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate the input
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum) {
    // Game Over - Won
    gameOver(true, `${guess} is correct, You Win!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    
    if(guessesLeft === 0) {
      // Game Over - lost
      gameOver(false, `Game Over, you lost. Correct Number is ${winningNum}`);
    } else {
      // Game continues - answer wrong
      // Change border color
      guessInput.style.borderColor = 'red'
      // Clear input
      guessInput.value = '';
      // Tell user it is the wrong number and try again
      setMessage( `Number ${guess} is wrong, ${guessesLeft} guesses left.`, 'red');
    }
  }
});

// Function for Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Change text color
  message.style.color = color;
  // Tell user it is the correct number
  setMessage(msg);
  // Clear input
  guessInput.value = '';

  // Play again option
  guessBtn.value = 'Play Again?';
  guessBtn.className = 'play-again';
}

// Function to get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

// Function to set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}