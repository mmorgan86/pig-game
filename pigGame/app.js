/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
let scores, roundScore, activePlayer, gamePlaying;

// set scores to zero
init();

// Event when roll button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Need a random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Update the round score IF the rolled number was NOT a 1.
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
})


document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add the current score to players global score
    scores[activePlayer] += roundScore

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    // Check if player won the game
    if(scores[activePlayer] >= 100){
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!'
      document.querySelector('.dice').style.display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

      // change gamePlaying to false
      gamePlaying = false;
    } else {
      // Go to next player
      nextPlayer();
    }
  }
})


function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // set round score back to zero
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  // document.querySelector('.player-0-panel').classList.remove('active')
  // document.querySelector('.player-1-panel').classList.add('active')

  // hides the dice after 1 is rolled
  document.querySelector('.dice').style.display = 'none';
}

// new game button on click
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;

  // variable to keep track of the game (set to true at beginning)
  gamePlaying = true;

  // Hide dice on start
  document.querySelector('.dice').style.display = "none";

  // Init scores to 0 on start
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Changes names back to start names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // remove winner class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // remove active class
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // add active class
  document.querySelector('.player-0-panel').classList.add('active');
}








