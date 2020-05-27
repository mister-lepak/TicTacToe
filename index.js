const gridSize = 3;
let user = 1;
let pointA = 0;
let pointB = 0;
let winA = 0;
let winB = 0;
let scoreCheck = 0;

// Render Player Scores
const playerScores = () => {
  const scoreBoxA = document.createElement('div');
  scoreBoxA.innerHTML = `
    <h2>Player A</h2>
    <h2>${winA}</h2>
    `;
  document.querySelector('#scoreA').append(scoreBoxA);

  const scoreBoxB = document.createElement('div');
  scoreBoxB.innerHTML = `
    <h2>Player B</h2>
    <h2>${winB}</h2>
    `;
  document.querySelector('#scoreB').append(scoreBoxB);
};

// Cleanup Player Scores
const cleanPlayerScores = () => {
  const scoreA = document.querySelector('#scoreA').querySelector('div');
  scoreA.remove();
  const scoreB = document.querySelector('#scoreB').querySelector('div');
  scoreB.remove();
};

// Define and Create grid boxes
const renderGrid = () => {
  const gridBox = document.querySelector('#grid');
  for ( i=0 ; i<gridSize ; i++ ){
    const vertical = document.createElement('div');
    vertical.classList.add('verticalBox');
    vertical.style.width = `${window.innerWidth*(1/(gridSize**2))}px`;
    vertical.style.height = `${window.innerWidth*(1/(gridSize**2))}px`;
    for ( j=0 ; j<gridSize ; j++ ){
      const horizontal = document.createElement('div');
      horizontal.classList.add('horizontalBox');
      horizontal.style.width = `${window.innerWidth*(1/(gridSize**2))}px`;
      horizontal.style.height = `${window.innerWidth*(1/(gridSize**2))}px`;
      vertical.append(horizontal);

      horizontal.addEventListener('click', ()=> {
        if(horizontal.classList[1]){}
        else {
          if (user == 1) {
            horizontal.classList.add('activeA');
            user--;
            pointA++;
          } else {
            horizontal.classList.add('activeB');
            user++;
            pointB++;
          }
        }
      });
    };
    gridBox.append(vertical);
  };
};

// Function definition when the one of the player has won the game
const playerUltiWin = (player) => {
  document.querySelector('#notice').innerHTML = `
    <div class="notice">
      <div>
        <p>Player ${player} Wins!!</p>
      </div>
      <div>
        <p>Rematch?</P>
      </div>
      <div>
        <button id="rematch">Yes, Lets Rematch!</button>
      </div>
    </div>`;
  document.querySelector('#rematch').addEventListener('click', () => {
    const boxes = document.querySelectorAll('.horizontalBox');
    boxes.forEach(box => {
      box.classList.remove('activeA');
      box.classList.remove('activeB');
      document.querySelector('#notice').innerHTML = '';
      pointA = 0;
      pointB = 0;
      winA = 0;
      winB = 0;
      cleanPlayerScores();
      playerScores();
      document.querySelector('.parent').classList.remove('end');
    });
  });

  document.querySelector('.parent').classList.add('end');
}

// Function definition when the one of the player wins
const playerWins = (player) => {
  document.querySelector('#notice').innerHTML = `
    <div class="notice">
      <div>
        <p>Player ${player} is the winner!!</p>
      </div>
      <div>
        <p>1st to score 3 points wins! Continue?</P>
      </div>
      <div>
        <button id="rematch">Yes, Lets Play Again!</button>
      </div>
    </div>`;
  document.querySelector('#rematch').addEventListener('click', () => {
    const boxes = document.querySelectorAll('.horizontalBox');
    boxes.forEach(box => {
      box.classList.remove('activeA');
      box.classList.remove('activeB');
      document.querySelector('#notice').innerHTML = '';
      pointA = 0;
      pointB = 0;
      document.querySelector('.parent').classList.remove('end');
    });
  });
  if (`win${player}` === "winA") winA++;
  else if(`win${player}` === "winB") winB++;
  cleanPlayerScores();
  playerScores();
  document.querySelector('.parent').classList.add('end');
  scoreCheck = 1;
}

// Function definition when the game is draw
const playerDraw = () => {
  document.querySelector('#notice').innerHTML = `
  <div class="notice">
    <div>
      <p>The match is draw!</p>
    </div>
    <div>
      <p>1st to score 3 points wins! Continue?</P>
    </div>
    <div>
      <button id="rematch">Yes, Lets Play Again!</button>
    </div>
  </div>`;
  document.querySelector('#rematch').addEventListener('click', () => {
    const boxes = document.querySelectorAll('.horizontalBox');
    boxes.forEach(box => {
      box.classList.remove('activeA');
      box.classList.remove('activeB');
      document.querySelector('#notice').innerHTML = '';
      pointA = 0;
      pointB = 0;
      document.querySelector('.parent').classList.remove('end');
    });
  });
  document.querySelector('.parent').classList.add('end');
};

// Perform validation on every clicks
document.body.addEventListener('click', () => {
  const boxes = document.querySelectorAll('.horizontalBox');

  // Horizontal checks
  for (i = 0; i<gridSize; i++) {
    let pointAX = 0;
    let pointBX = 0;
    for(j = 0; j<gridSize; j++) {
      if(boxes[i+(j*gridSize)].classList[1] === 'activeA' ) pointAX++;
      else if(boxes[i+(j*gridSize)].classList[1] === 'activeB') pointBX++;
    }
    if(scoreCheck === 0){
      if (pointAX === gridSize) playerWins('A');
      else if (pointBX === gridSize) playerWins('B');
    }
  }
  // Vertical checks
  for (i = 0; i <gridSize; i++) {
    let pointAY = 0;
    let pointBY = 0;
    for(j = 0; j < gridSize; j++) {
      if (boxes[(i*gridSize) + j].classList[1] === 'activeA') pointAY++;
      else if(boxes[(i*gridSize) + j].classList[1] === 'activeB') pointBY++;
    }
    if(scoreCheck === 0){
      if (pointAY === gridSize) playerWins('A');
      else if(pointBY === gridSize) playerWins('B');
    }
  }
  // Diagonal checks
  for (i = 0; i<gridSize; i++) {
    let pointAD = 0;
    let pointBD = 0;
    for(j = 0; j<gridSize; j++) {
      if(i === 0) {
        if(boxes[i + (j*gridSize) + j].classList[1] === 'activeA') pointAD++;
        else if(boxes[i + (j*gridSize) + j].classList[1] === 'activeB') pointBD++;
      }
      else if (i === (gridSize - 1)) {
        if(boxes[i + (j*gridSize) - j].classList[1] === 'activeA') pointAD++;
        else if(boxes[i + (j*gridSize) -j].classList[1] === 'activeB') pointBD++;
      }
    }
    if(scoreCheck ===0) {
      if (pointAD === gridSize) playerWins('A');
      else if(pointBD === gridSize) playerWins('B');
    }
  }
  if(scoreCheck === 0) {
    if(pointA + pointB === gridSize**2) {playerDraw()};
  }
  if(winA === 3) playerUltiWin('A');
  else if(winB === 3) playerUltiWin('B');
  scoreCheck=0;
});

// Initialization
playerScores();
renderGrid();