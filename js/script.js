/*
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
*/

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// console.log(getRandomNumber(1, 10));

const play = () => {
  //***************** Variabili
  const selectDifficulty = document.getElementById('difficulty').value; 
  let userPoints = 0;
  const totalBombs = 16
  // Prendo la griglia e la pulisco
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  let difficulty;
  let totalCells;

  // Switch per la difficoltà, cambiano le celle totali e il livello di difficoltà
  switch (selectDifficulty) {
    case 'diff-1':
      difficulty = 1;
      totalCells = 100;
      break;
    case 'diff-3':
      difficulty = 3;
      totalCells = 49;
      break;
    default:
      difficulty = 2;
      totalCells = 81;
  };
  
  console.log(totalCells);
  // Si calcola il punteggio da raggiungere per vincere
  const maxAttempts = totalCells - totalBombs;
  console.log(maxAttempts);

  //*************** FUNZIONI
  //**************************Funziona*********************************** */
  // Funzione crea array delle bombe
  const generateBombs = (numberOfBombs, numberOfCells) => {
    const bombArray = [];
    while (bombArray.length < numberOfBombs) {
      const randomNumber = getRandomNumber(1, numberOfCells);
      if (!bombArray.includes(randomNumber)) bombArray.push(randomNumber);
    }
    return bombArray;
  };
  //**************************Funziona*********************************** */
  //**************************Funziona*********************************** */
  // Funzione crea una cella
  const createCell = (selectedDifficulty, actualNumber) => {
		const cell = document.createElement('div');
		cell.className = `cell-${selectedDifficulty} fw-bold d-flex justify-content-center align-items-center`;
		cell.id = actualNumber;
		cell.innerText = actualNumber;
		return cell;
  };
  //**************************Funziona*********************************** */
  //**************************Funziona*********************************** */
  // Genero la griglia
  const generateGrid = (numberOfCells, selectedDifficulty, bombs) => {
    for (let i = 1; i <= numberOfCells; i++) {
      const cell = createCell(selectedDifficulty, i);
      cell.addEventListener('click', onCellClick);
      grid.appendChild(cell);
    }
  };
  //**************************Funziona*********************************** */
  //******* */ Fine partita
  const gameOver = (bombs, userPoints, hasLost) => {
    const cells = document.querySelectorAll("[class*='cell-']");
    
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', onCellClick);
    }
    showBombs(bombs);

    const messageElement = document.createElement('h2');
    messageElement.className = 'message';

    const messageText = hasLost ? `Hai perso, punteggio ${userPoints}` : `Hai vinto!`;
    messageElement.innerText = messageText;


    grid.appendChild(messageElement);
  }

  //# BOMBS SPOSTATA PERCHE' E' USATA IN ONCELLCLICK
  const bombs = generateBombs(totalBombs, totalCells);
  //* Sul click
  function onCellClick(event) {
    const clickedCell = event.target;
    clickedCell.removeEventListener('click', onCellClick);
    const number = parseInt(clickedCell.innerText);
    console.log(number);
    if(bombs.includes(number)) {
      clickedCell.classList.add('wrong');
      //! PERSO
      console.log('bomba');
      gameOver(bombs, userPoints, true);
    }else {
      clickedCell.classList.add('colored');
      clickedCell.classList.add('disabled');
      // disableCell(clickedCell);
      userPoints++;
      console.log(userPoints);
      if(userPoints === maxAttempts){
        console.log('VITTORIA');
        //! VITTORIA
        gameOver(bombs, userPoints, false);
      }
    }
  };

  //**************************Funziona*********************************** */
  //* Assegno la classe wrong per le celle con le bombe
  const showBombs = (bombs) => {
    // Prendo tutte le celle per la loro classe
    const cells = document.querySelectorAll("[class*='cell-']");
    // console.log(cells.innerText);
    for (let i = 0; i < cells.length; i++) {
      // Prendo ogni singola cella
      const cell = cells[i];
      // Prendo il valore all'interno della cella e la metto come intero
      const cellNumber = parseInt(cell.innerText);
      // Se l'array delle bombe ha incluso il numero della cella allora viene messa la classe worng
      if (bombs.includes(cellNumber)) cell.classList.add('wrong');
    }
  };
  //**************************Funziona*********************************** */
  
  // Creo l'array di bombe che servono alla funzione per genereare la griglia
  generateGrid(totalCells, difficulty, bombs);
};

// ---------------------
// Dati
// ---------------------
const refresh = document.getElementById('refresh');
const clear = document.getElementById('clear');

refresh.addEventListener('click', play);





