let bok0, bok1;
let sizeX, sizeY;
let liczbyWzorzec = [];
let liczby = [];
let currentMove;
let wynik;

function initGameXY() {
  bok0 = 2;
  bok1 = 8;
  createSelect();
  startGameXY();
}

function startGameXY() {
  sizeX = document.getElementById("bokX").value;
  sizeY = document.getElementById("bokY").value;
  let board = document.getElementById("plansza");

  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  initializeNumbersXY();
  FisherYatesXY();
  initBoardXY();

  currentMove = 0;
  wynik = 0;
  writeInfoXY();
}

function createSelect() {
  let selectX = document.getElementById("bokX");
  let selectY = document.getElementById("bokY");

  for (let i = bok0; i <= bok1; i++) {
    let optionX = document.createElement("option");
    optionX.innerHTML = optionX.value = i;
    selectX.appendChild(optionX);

    let optionY = document.createElement("option");
    optionY.innerHTML = optionY.value = i;
    selectY.appendChild(optionY);
  }

  let selected = Math.floor((bok1 - bok0) / 2);
  selectX.getElementsByTagName("option")[selected].selected = "selected";
  selectY.getElementsByTagName("option")[selected].selected = "selected";
}

function initBoardXY() {
  let board = document.getElementById("plansza");
  for (let i = 0; i < sizeY; i++) {
    let row = board.insertRow(i);
    for (let j = 0; j < sizeX; j++) {
      let cell = row.insertCell(j);
      cell.id = i + "." + j;
      cell.innerHTML = liczby[i * sizeX + j];
      cell.onclick = function () {
        if (cell.innerHTML > 0) {
          moveTile(cell, i, j);
        }
      };
    }
  }
  writeInfoXY();
}

function initializeNumbersXY() {
  for (let i = 0; i < sizeX * sizeY; i++) {
    liczbyWzorzec[i] = i + 1;
    liczby[i] = i + 1;
  }
  liczby[sizeX * sizeY - 1] = 0;
  liczbyWzorzec[sizeX * sizeY - 1] = 0;
}

function FisherYatesXY() {
  let c;
  for (let j, i = sizeX * sizeY - 2; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    c = liczby[j];
    liczby[j] = liczby[i];
    liczby[i] = c;
  }
}

function moveTile(cell, i, j) {
  if (j > 0 && document.getElementById(i + "." + (j - 1)).innerHTML == 0) {
    swapTiles(cell, i, j, i, j - 1);
  } else if (i > 0 && document.getElementById(i - 1 + "." + j).innerHTML == 0) {
    swapTiles(cell, i, j, i - 1, j);
  } else if (
    j < sizeX - 1 &&
    document.getElementById(i + "." + (j + 1)).innerHTML == 0
  ) {
    swapTiles(cell, i, j, i, j + 1);
  } else if (
    i < sizeY - 1 &&
    document.getElementById(i + 1 + "." + j).innerHTML == 0
  ) {
    swapTiles(cell, i, j, i + 1, j);
  }

  updateScore();
}

function swapTiles(cell, i1, j1, i2, j2) {
  let temp = cell.innerHTML;
  cell.innerHTML = 0;
  document.getElementById(i2 + "." + j2).innerHTML = temp;
  currentMove++;
}

function updateScore() {
  wynik = 0;

  for (let i = 0; i < sizeY; i++) {
    for (let j = 0; j < sizeX; j++) {
      let cellValue = document.getElementById(i + "." + j).innerHTML;
      let correctValue = liczbyWzorzec[i * sizeX + j];
      if (parseInt(cellValue) === correctValue) {
        wynik++;
      }
    }
  }

  writeInfoXY();

  if (wynik == sizeX * sizeY - 1) {
    document.getElementById("bingo").innerHTML = "Bingo!";
    showWinImage();
    startSound();
  } else {
    document.getElementById("bingo").innerHTML = "";
  }
}

function writeInfoXY() {
  document.getElementById("wynik").innerHTML = wynik;
  document.getElementById("current").innerHTML = currentMove;
}

function showWinImage() {
  document.getElementById("winImageOverlay").style.display = "flex";
}

function startSound() {
  let winSound = document.getElementById("winSound");
  winSound.play();
}

function stopSound() {
  let winSound = document.getElementById("winSound");
  winSound.pause();
  winSound.currentTime = 0;
}

window.onload = initGameXY;
