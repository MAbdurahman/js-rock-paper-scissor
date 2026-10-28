/*-----JavaScript for js-rock-paper-scissors----- */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
   // makes sure that whole site is loaded, so the 3000ms preloader coincides with
   // the delay of 3000ms for the header content animation
   const preloader = document.getElementById('preloader');
   const preloaderGif = document.getElementById('preloader-gif');

   if (preloaderGif) {
      preloaderGif.style.transition = 'opacity 15000s ease-in-out';
      preloaderGif.style.opacity = '0';

   }
   if (preloader) {
      preloader.style.transition = 'opacity 15000s ease-in-out';
      preloader.style.opacity = '0';
   }

   setTimeout(function () {
      preloaderGif.style.display = 'none';
      preloader.style.display = 'none';
   }, 15000);
});

document.addEventListener('DOMContentLoaded', () => {
   const gameMessage = document.querySelector('#game-message');
   const humanWins = document.querySelector('#human-wins');
   const computerWins = document.querySelector('#computer-wins');
   const gameContainer = document.querySelector('.game-container');
   const optionImages = document.querySelectorAll('.option-image');
   const optionImageCells = document.querySelectorAll('.option-image-cell');
   const computerResult = document.querySelector(
      '.computer-result > .computer-choice'
   );
   const humanResult = document.querySelector(
      '.human-result > .human-choice'
   );

   const choices = ['rock', 'paper', 'scissors'];

   const computerImages = {
      rock: './img/rock.png',
      paper: './img/paper.png',
      scissors: './img/scissors.png'
   };

   const winningChoices = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
   };

   let humanScore = 0;
   let computerScore = 0;
   let gameTimer = null;
   let isPlaying = false;

   function updateScores() {
      humanWins.textContent = humanScore;
      computerWins.textContent = computerScore;
   }

   function updateBlinkingTextState() {
      const expectedText = 'let the game begin!';

      const message = gameMessage.textContent.trim().toLowerCase();

      gameMessage.classList.toggle(
         'blinking-text',
         message === expectedText
      );
   }

   function getComputerChoice() {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
   }

   function getRoundWinner(humanChoice, computerChoice) {
      if (humanChoice === computerChoice) {
         return 'Draw';
      }

      return winningChoices[humanChoice] === computerChoice
         ? 'Human'
         : 'Computer';
   }

   function finishRound(humanChoice) {
      const computerChoice = getComputerChoice();
      const outcome = getRoundWinner(humanChoice, computerChoice);

      humanResult.src = computerImages[humanChoice];
      computerResult.src = computerImages[computerChoice];

      if (outcome === 'Human') {
         humanScore++;
      } else if (outcome === 'Computer') {
         computerScore++;
      }

      updateScores();

      gameMessage.textContent =
         outcome === 'Draw' ? 'Draw' : `${outcome} Wins!`;

      updateBlinkingTextState();
      isPlaying = false;
   }

   function handleOptionClick(event) {
      if (isPlaying) {
         return;
      }

      const clickedImage = event.currentTarget;
      const clickedIndex = Array.from(optionImages).indexOf(clickedImage);
      const humanChoice = choices[clickedIndex];

      if (!humanChoice) {
         return;
      }

      isPlaying = true;

      if (gameTimer) {
         clearTimeout(gameTimer);
      }

      optionImageCells.forEach((cell, index) => {
         cell.classList.toggle('selected', index === clickedIndex);
      });

      humanResult.src = computerImages.rock;
      computerResult.src = computerImages.rock;

      gameMessage.textContent = 'Waiting...';
      updateBlinkingTextState();

      gameContainer.classList.add('start');

      gameTimer = setTimeout(() => {
         gameContainer.classList.remove('start');
         finishRound(humanChoice);
      }, 3000);
   }

   optionImages.forEach((image) => {
      image.addEventListener('click', handleOptionClick);
   });

   updateScores();
   updateBlinkingTextState();
});