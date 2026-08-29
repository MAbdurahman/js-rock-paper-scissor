/*-----Javascript for js-create-design-website */
'use strict';

document.addEventListener("DOMContentLoaded", function(){
   console.log("DOM fully loaded and parsed");

   const gameMessage = document.querySelector('#game-message');

   function updateBlinkingTextState() {
      const expectedText = 'Let The Game Begin!';

      if (gameMessage.innerText.trim().toLowerCase() === expectedText) {
         gameMessage.classList.add('blinking-text');

      } else {
         gameMessage.classList.remove('blinking-text');
      }
   }
});