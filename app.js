/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, dice, gamePlaying;

init();

/*
scores = [0, 0];
roundScore = 0;
activePlayer = 0;


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
*/

//document.querySelector('#current-' + activePlayer).textContent = dice;

//var x = document.querySelector('#current-' + activePlayer).textContent;



document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        
            //1. Get the random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2.  Display the results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //Update the score IF the rolled number is not 1 <- it is the condition of the game
    
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        //display to page
        document.querySelector('#current-'+activePlayer).textContent = roundScore; 
       // console.log('Current player '+activePlayer +' scores are '+ roundScore);
        if (roundScore >= 10) {
             document.getElementById('score-'+activePlayer).textContent = roundScore;
           // console.log('Inside winner If');
             winner();
        }
    } else {
        //Next player
       nextPlayer();
        
        }
        
    }
    

    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    //console.log('Inside the hold function :');
    if (gamePlaying) {
      //  console.log('Game playing is true');
         scores[activePlayer] += roundScore;
       // console.log('Current player '+activePlayer +' scores are '+ scores[activePlayer]);
        //update the UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 10) {
                winner();
               // newGame();
            } else {
               nextPlayer(); 
            }
        
    }
    // Update the global score
   
    
    //document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
 
    
});


function nextPlayer() {
    
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0 ;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
        //set scores to zero
        gamePlaying = true;
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
       
        document.querySelector('.dice').style.display = 'none';
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';  
    
        //set the Player titles, as Player 1 and Player 2
        document.getElementById('name-0').textContent = 'Player 1';    
        document.getElementById('name-1').textContent = 'Player 2';
    
        //Remove the winner class, will be useful when hitting 'New Game'
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
    
        //Remove active class from both panels
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        
        //Add active class to player 1 to always
        document.querySelector('.player-0-panel').classList.add('active');
    
}


function winner() {
    document.querySelector('#name-'+activePlayer).textContent = 'Winner';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
}