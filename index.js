const gridSize = 3;
let user = 1;


// Define and Create grid boxes
const gridBox = document.querySelector('#grid');
for ( i=0 ; i<gridSize ; i++ ){
  const vertical = document.createElement('div');
  vertical.classList.add('verticalBox');
  for ( j=0 ; j<gridSize ; j++ ){
    const horizontal = document.createElement('div');
    horizontal.classList.add('horizontalBox');
    vertical.append(horizontal);

    horizontal.addEventListener('click', ()=> {
      if (user == 1) {
        horizontal.classList.add('activeA');
        user--;
      } else {
        horizontal.classList.add('activeB');
        user++;
      }

    });
  };
  gridBox.append(vertical);
};

const playerWins = (player) => {

  document.querySelector('#notice').innerHTML = `
    <div class="notice">
      <p>Player ${player} Wins!!</p>
    </div>`;
  document.body.classList.add('end');
}


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
    if (pointAX === gridSize) playerWins('A');
    else if (pointBX === gridSize) playerWins('B');
  }
  // Vertical checks
  for (i = 0; i <gridSize; i++) {
    let pointAY = 0;
    let pointBY = 0;
    for(j = 0; j < gridSize; j++) {
      if (boxes[(i*gridSize) + j].classList[1] === 'activeA') pointAY++;
      else if(boxes[(i*gridSize) + j].classList[1] === 'activeB') pointBY++;
    }
    if (pointAY === gridSize) playerWins('A');
    else if(pointBY === gridSize) playerWins('B');
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
    if (pointAD === gridSize) playerWins('A');
    else if(pointBD === gridSize) playerWins('B');
  }


});