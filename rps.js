let gameMode = '';
let totalRounds = 3;
let currentRound = 1;
let player1Score = 0;
let player2Score = 0;
let player1Choice = '';
let player2Choice = '';
let isPlayer1Turn = true;
let roundActive = false;

const choices = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

function selectMode(mode) {
    gameMode = mode;
    document.getElementById('gameModeSelection').classList.remove('active');
    document.getElementById('roundSelection').classList.add('active');
    
    if (mode === 'computer') {
        document.getElementById('player2Name').textContent = 'Computer';
        document.getElementById('player2Title').textContent = 'Computer 🤖';
        document.getElementById('finalPlayer2Name').textContent = 'Computer';
    } else {
        document.getElementById('player2Name').textContent = 'Player 2';
        document.getElementById('player2Title').textContent = 'Player 2';
        document.getElementById('finalPlayer2Name').textContent = 'Player 2';
    }
}

function selectRounds(rounds) {
    totalRounds = rounds;
    document.getElementById('totalRounds').textContent = rounds;
    document.getElementById('roundSelection').classList.remove('active');
    document.getElementById('gameArea').classList.add('active');
    initializeGame();
}

function initializeGame() {
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    player1Choice = '';
    player2Choice = '';
    isPlayer1Turn = true;
    roundActive = true;
    
    document.getElementById('currentRound').textContent = currentRound;
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;
    document.getElementById('player1Choice').textContent = '❓';
    document.getElementById('player2Choice').textContent = '❓';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('nextRoundBtn').style.display = 'none';
    
    updateTurnIndicator();
    updateRoundInfo();
}

function updateTurnIndicator() {
    const player1Area = document.getElementById('player1Area');
    const player2Area = document.getElementById('player2Area');
    
    if (gameMode === 'computer') {
        player1Area.classList.remove('waiting-turn');
        player2Area.classList.add('waiting-turn');
        return;
    }
    
    if (isPlayer1Turn) {
        player1Area.classList.remove('waiting-turn');
        player2Area.classList.add('waiting-turn');
        document.getElementById('roundInfo').innerHTML = `Round ${currentRound} - <span style="color: #00b894;">Player 1's turn!</span>`;
    } else {
        player1Area.classList.add('waiting-turn');
        player2Area.classList.remove('waiting-turn');
        document.getElementById('roundInfo').innerHTML = `Round ${currentRound} - <span style="color: #00b894;">Player 2's turn!</span>`;
    }
}

function updateRoundInfo() {
    if (gameMode === 'computer') {
        document.getElementById('roundInfo').textContent = `Round ${currentRound} - Make your choice!`;
    } else {
        updateTurnIndicator();
    }
}

function makeChoice(player, choice) {
    if (!roundActive) return;
    
    if (gameMode === 'computer' && player === 1) {
        player1Choice = choice;
        document.getElementById('player1Choice').textContent = choices[choice];
        
        // Computer makes random choice
        const computerChoices = ['rock', 'paper', 'scissors'];
        player2Choice = computerChoices[Math.floor(Math.random() * 3)];
        
        setTimeout(() => {
            document.getElementById('player2Choice').textContent = choices[player2Choice];
            determineWinner();
        }, 1000);
        
    } else if (gameMode === 'player') {
        if (player === 1 && isPlayer1Turn && !player1Choice) {
            player1Choice = choice;
            document.getElementById('player1Choice').textContent = choices[choice];
            isPlayer1Turn = false;
            updateTurnIndicator();
        } else if (player === 2 && !isPlayer1Turn && !player2Choice) {
            player2Choice = choice;
            document.getElementById('player2Choice').textContent = choices[choice];
            determineWinner();
        }
    }
}

function determineWinner() {
    const resultMessage = document.getElementById('resultMessage');
    let winner = '';
    
    if (player1Choice === player2Choice) {
        winner = 'draw';
        resultMessage.textContent = "It's a Draw! 🤝";
        resultMessage.className = 'result-message draw';
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        winner = 'player1';
        player1Score++;
        const player1Name = gameMode === 'computer' ? 'You' : 'Player 1';
        resultMessage.textContent = `${player1Name} Win${gameMode === 'computer' ? '' : 's'} This Round! 🎉`;
        resultMessage.className = 'result-message win';
    } else {
        winner = 'player2';
        player2Score++;
        const player2Name = gameMode === 'computer' ? 'Computer' : 'Player 2';
        resultMessage.textContent = `${player2Name} Wins This Round! 🎉`;
        resultMessage.className = 'result-message lose';
    }
    
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;
    
    roundActive = false;
    
    if (currentRound < totalRounds) {
        document.getElementById('nextRoundBtn').style.display = 'block';
    } else {
        setTimeout(endGame, 2000);
    }
}

function nextRound() {
    currentRound++;
    player1Choice = '';
    player2Choice = '';
    isPlayer1Turn = true;
    roundActive = true;
    
    document.getElementById('currentRound').textContent = currentRound;
    document.getElementById('player1Choice').textContent = '❓';
    document.getElementById('player2Choice').textContent = '❓';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('nextRoundBtn').style.display = 'none';
    
    // Remove waiting states
    document.getElementById('player1Area').classList.remove('waiting-turn');
    document.getElementById('player2Area').classList.remove('waiting-turn');
    
    updateRoundInfo();
}

function endGame() {
    document.getElementById('gameArea').classList.remove('active');
    document.getElementById('results').classList.add('active');
    
    document.getElementById('finalPlayer1Score').textContent = player1Score;
    document.getElementById('finalPlayer2Score').textContent = player2Score;
    
    const finalResult = document.getElementById('finalResult');
    
    if (player1Score > player2Score) {
        const player1Name = gameMode === 'computer' ? 'You' : 'Player 1';
        finalResult.textContent = `🏆 ${player1Name} Win${gameMode === 'computer' ? '' : 's'}!`;
        finalResult.className = 'result-message win';
    } else if (player2Score > player1Score) {
        const player2Name = gameMode === 'computer' ? 'Computer' : 'Player 2';
        finalResult.textContent = `🏆 ${player2Name} Wins!`;
        finalResult.className = 'result-message lose';
    } else {
        finalResult.textContent = "🤝 It's a Tie Game!";
        finalResult.className = 'result-message draw';
    }
}

function resetGame() {
    // Hide all sections
    document.querySelectorAll('.game-mode-selection, .round-selection, .game-area, .results').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show mode selection
    document.getElementById('gameModeSelection').classList.add('active');
    
    // Reset variables
    gameMode = '';
    totalRounds = 3;
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    player1Choice = '';
    player2Choice = '';
    isPlayer1Turn = true;
    roundActive = false;
}