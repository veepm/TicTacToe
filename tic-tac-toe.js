const boxElems = document.querySelectorAll('.box');
const resetElem = document.querySelector('.reset');
const resultOverlayElem = document.querySelector('.resultOverlay');
const resultTextElem = document.querySelector('.resultText');
const playAgainBtnElem = document.querySelector('.playAgainBtn');
const playerOneScrElem = document.querySelector('.playerOneScr');
const playerTwoScrElem = document.querySelector('.playerTwoScr');
let currentSymbol = 'o';
let playerOneScore = 0;
let playerTwoScore = 0;
let result = '';
const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

play();

resetElem.addEventListener('click', () => {
  resetBoard();
  resetScore();
  play();
})

playAgainBtnElem.addEventListener('click', restart);

function play(){
  boxElems.forEach(element => {
    element.addEventListener('click', addSymbol, {once:true});
  });
}

function addSymbol(event){
  if (currentSymbol == 'o'){
    event.target.classList.add('x');
    currentSymbol = 'x';
  }
  else{
    event.target.classList.add('o');
    currentSymbol = 'o';
  }
  checkResult();
}

function checkWin(){
  return winningCombinations.some(combination => {
    return combination.every(boxIndex => {
      return boxElems[boxIndex].classList.contains(currentSymbol);
    })
  })
}

function checkDraw(){
  return Array.from(boxElems).every(element => {
    return element.classList.contains('x') || element.classList.contains('o');
  })
}

function checkResult(){
  if (checkWin()){
    boxElems.forEach(element => {
      element.removeEventListener("click", addSymbol);
    });
    if (currentSymbol == 'x'){
      playerOneScore++;
      result = 'Player 1 (X) wins!';
    }
    else{
      playerTwoScore++;
      result = 'Player 2 (O) wins!';
    }
  }
  else if (checkDraw()){
    result = 'Draw!';
  }
  if (checkWin() || checkDraw()){
    showResult();
  }
}

function showResult(){
  resultOverlayElem.style.display = 'block';
  resultTextElem.innerHTML = result;
  changeScore();
}

function resetScore(){
  playerOneScore = 0;
  playerTwoScore = 0;
  changeScore();
}

function resetBoard(){
  boxElems.forEach(element => {
    element.className = 'box';
  })
}

function changeScore(){
  playerOneScrElem.innerHTML = `Player 1 (X): ${playerOneScore}`;
  playerTwoScrElem.innerHTML = `Player 2 (O): ${playerTwoScore}`;
}

function restart(){
  resultOverlayElem.style.display = 'none';
  resetBoard();
  play();
}

