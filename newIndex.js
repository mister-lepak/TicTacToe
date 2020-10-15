let gridSize = 3;
let grids = 0;
let user = 1;
let pointA = 0;
let pointB = 0;
let winA = 0;
let winB = 0;
let scoreCheck = 0;
let timeOut = 200;
let winLock = 0;

const startButton = document.querySelector('#startButton');
const playerX = document.querySelector('#playerX');
const playerO = document.querySelector('#playerO');
const playerXField = document.querySelector('#playerXField');
const playerOField = document.querySelector('#playerOField');
const ai1 = document.querySelector('#AI1');
const ai2 = document.querySelector('#AI2');

const Player = (name, classId) => {
  this.name = name;
  this.classId = classId;

  return{
    name,
    classId
  };
};



const gameBoard = (() => {
  // Define and Create grid boxes
  const renderGrid = () => {
    const gridBox = document.querySelector('#grid');
    gridBox.innerHTML = '';
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
        const seqi = i;
        const seqj = j;
        if(grids[seqi][seqj] === 1) horizontal.classList.add('activeA');
        else if(grids[seqi][seqj] === 2) horizontal.classList.add('activeB');
        horizontal.addEventListener('click', ()=> {
          if(horizontal.classList[1]){}
          else {
            if (user == 1) {
              horizontal.classList.add('activeA');
              user--;
              pointA++;
              grids[seqi][seqj] = 1;
              if (ai2.checked && pointB < Math.floor(gridSize**2) && pointA !==0 && winLock === 0 && (pointA + pointB !== gridSize**2)) {
                setTimeout(displayController.aiMove,timeOut);
              }
            } else {
              horizontal.classList.add('activeB');
              user++;
              pointB++;
              grids[seqi][seqj] = 2;
              if (ai1.checked && pointA < Math.floor(gridSize**2) && pointB !==0 && winLock === 0 && (pointA + pointB !== gridSize**2)) {
                setTimeout(displayController.aiMove,timeOut);
              }
            }
          }
        });
      };
      gridBox.append(vertical);
    };
  };

  // Cleanup grids
  const gridsReset = () => {
    for(i = 0; i<gridSize; i++){
      for (j=0; j<gridSize; j++){
        grids[i][j] = 0;
      }
    }
  };

  return {renderGrid, gridsReset}
})();

const displayController = (() => {

  // Render Player Scores
  const playerScores = (player, point) => {
    const scoreBox = document.createElement('div');
    scoreBox.innerHTML = `
      <h2>${player.name}</h2>
      <h3>${point}</h3>
      `;
    document.querySelector(player.classId).append(scoreBox);

  };

  // Cleanup Player Scores
  const cleanPlayerScores = (player) => {
    const score = document.querySelector(player.classId).querySelector('div');
    score.remove();
  };

  // Function definition when the one of the player has won the game
  const playerUltiWin = (player, playerA, playerB) => {
    winLock = 1
    document.querySelector('#notice').innerHTML = `
      <div class="notice">
        <div>
          <p>${player.name} Wins!!</p>
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
        gameBoard.gridsReset();
        document.querySelector('.parent').classList.remove('end');
      });
      cleanPlayerScores(playerA);
      cleanPlayerScores(playerB);
      winLock = 0;
      if (player.name === playerA.name){
        user = 1;
      } else {
        user = 0;
      }
      if(user === 1 && ai1.checked && pointA === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
      else if(user === 0 && ai2.checked && pointB === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
      playerScores(playerA, winA);
      playerScores(playerB, winB);
    });

    document.querySelector('.parent').classList.add('end');

  }

  // Function definition when the one of the player wins
  const playerWins = (player, playerA, playerB) => {
    winLock = 1;
    document.querySelector('#notice').innerHTML = `
      <div class="notice">
        <div>
          <p>${player.name} is the winner!!</p>
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
        gameBoard.gridsReset();
        document.querySelector('.parent').classList.remove('end');
      });
      cleanPlayerScores(playerA);
      cleanPlayerScores(playerB);
      if (player.name === playerA.name){
        winA++;
        user = 1;
      } else {
        winB++;
        user = 0;
      }
      if(user === 1 && ai1.checked && pointA === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
      else if(user === 0 && ai2.checked && pointB === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
      playerScores(playerA, winA);
      playerScores(playerB, winB);
      winLock = 0
    });




    document.querySelector('.parent').classList.add('end');

    scoreCheck = 1;

  }

  // Function definition when the game is draw
  const playerDraw = () => {
    winLock = 1;
    window.stop();
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
        gameBoard.gridsReset();
        document.querySelector('.parent').classList.remove('end');
      });
      if(user === 1 && ai1.checked && pointA === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
      else if(user === 0 && ai2.checked && pointB === 0 && winLock === 0){
        setTimeout(aiMove,timeOut);
      }
    });
    document.querySelector('.parent').classList.add('end');
    winLock = 0;
  };

  // Perform validation on every clicks
  const initialize = (playerA, playerB) => {
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
          if (pointAX === gridSize) playerWins(playerA, playerA, playerB);
          else if (pointBX === gridSize) playerWins(playerB, playerA, playerB);
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
          if (pointAY === gridSize) playerWins(playerA, playerA, playerB);
          else if(pointBY === gridSize) playerWins(playerB, playerA, playerB);
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
          if (pointAD === gridSize) playerWins(playerA, playerA, playerB);
          else if(pointBD === gridSize) playerWins(playerB, playerA, playerB);
        }
      }
      if(scoreCheck === 0) {
        if(pointA + pointB === gridSize**2) {
          winLock = 1;
          playerDraw(playerA, playerB);
        };
      }
      if(winA === 3) playerUltiWin(playerA, playerA, playerB);
      else if(winB === 3) playerUltiWin(playerB, playerA, playerB);
      scoreCheck=0;
    });
  };

  // Randomize value
  const randomVal = (val) => {
    return Math.floor(Math.random() * (val));
  }

  // AI move
  const aiMove = () => {
    let horizontalVal = randomVal(gridSize);
    let verticalVal = randomVal(gridSize);
    let aiProceed = false;
    let gridBox = document.querySelector('#grid');

    if (winLock === 0) {
      while(!aiProceed) {
        if (gridBox.children[horizontalVal].children[verticalVal].classList.value.includes("active")) {
          horizontalVal = randomVal(gridSize);
          verticalVal = randomVal(gridSize);
        } else {
          gridBox.children[horizontalVal].children[verticalVal].click();
          aiProceed = true;
        }
      }
    }

  };


  return{
    playerUltiWin,
    playerWins,
    playerDraw,
    initialize,
    playerScores,
    cleanPlayerScores,
    randomVal,
    aiMove
  }

})();




// Initialization
$('.ui.mini.modal').modal('show');
$('.close.icon').on("click", () => {
  $('.ui.modal').modal('hide');
});

ai1.addEventListener("click", () => {
  if (ai1.checked){
    playerX.value = "X-tra Warrior";
    playerX.classList.add('disabled');
    playerX.classList.add('field');
  } else {
    playerX.value = "";
    playerX.classList.remove('disabled');
    playerX.classList.remove('field');
  }
});

ai2.addEventListener("click", () => {
  if (ai2.checked){
    playerO.value = "Wizard O";
    playerO.classList.add('disabled');
    playerO.classList.add('field');
  } else {
    playerO.value = "";
    playerO.classList.remove('disabled');
    playerO.classList.remove('field');
  }
});


startButton.addEventListener("click", () => {
  let proceed = false;
  if (playerX.value === playerO.value) {
    playerXField.classList.add('error');
    playerOField.classList.add('error');
  }
  else if (ai1.checked && ai2.checked) {
    playerXField.classList.add('error');
    playerOField.classList.add('error');
  }
  else {proceed = true}


  if (proceed === true) {
    if (document.querySelectorAll('.fields')[0].children[1].children[0].children[0].checked) gridSize = 3;
    else if (document.querySelectorAll('.fields')[0].children[2].children[0].children[0].checked) gridSize = 4;
    else gridSize = 5;
    grids = Array(gridSize)
              .fill(0)
              .map(() => {return Array(gridSize).fill(0)});

    $('.ui.modal').modal('hide');

    const playerA = Player(playerX.value, "#scoreA");
    const playerB = Player(playerO.value, "#scoreB");

    displayController.playerScores(playerA, winA);
    displayController.playerScores(playerB, winB);
    gameBoard.renderGrid(playerA, playerB);
    displayController.initialize(playerA, playerB);

    if(ai1.checked && user === 1){
      setTimeout(displayController.aiMove, timeOut);
    }

    window.addEventListener('resize', () => {
      gameBoard.renderGrid(playerA, playerB);
    });
  }


});





