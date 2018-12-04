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
 
// save previous dice roll
let lastDice1;
let lastDice2

// Event when roll button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Need a random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result (dice picture)
    document.querySelector(`#dice-1`).style.display = "block";
    document.querySelector(`#dice-1`).src = `dice-${dice1}.png`;

    document.querySelector(`#dice-2`).style.display = "block";
    document.querySelector(`#dice-2`).src = `dice-${dice2}.png`;

    // 3. Update the round score IF the rolled number was NOT a 1.

    if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += (dice1 + dice2);
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    lastDice1 = dice1;
    lastDice2 = dice2
  }
})



document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add the current score to players global score
    scores[activePlayer] += roundScore

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    // final score input
    let input = document.querySelector('.final-score').value;
    let winningScore;

    // check if input field is empty
    if (input){
      winningScore = input;
      document.querySelector('.final-score').disabled = true;
    } else {
      winningScore = 100;
    }
    // Check if player won the game
    
    if(scores[activePlayer] >= winningScore){
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!'
      
      hideDice();
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

  zeroCurrentScore();

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  // document.querySelector('.player-0-panel').classList.remove('active')
  // document.querySelector('.player-1-panel').classList.add('active')

  // hides the dice after 1 is rolled
  hideDice();

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
  hideDice();
  // Init scores to 0 on start
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  zeroCurrentScore();

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

  // reset winning score input
  document.querySelector('.final-score').disabled = false;
}

function hideDice() {
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
}

function zeroCurrentScore() {
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';  
}



