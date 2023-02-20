"use strict";

function generateWord(wordlist, minLength = 3, maxLength = 12) {
  const markovChain = createMarkovChain(wordlist);
  const letters = Object.keys(markovChain);

  let letter = letters[Math.floor(Math.random() * letters.length)];

  let wordsGenerated = "";
  let wordsSelection = [];
  for (let i = 0; i < letters.length; i++) {
    wordsGenerated += letter;

    let newLetter =
      markovChain[letter][
        Math.floor(Math.random() * markovChain[letter].length)
      ];
    letter = newLetter;

    if (!letter || !markovChain.hasOwnProperty(letter)) {
      letter = letters[Math.floor(Math.random() * letters.length)];
    }

    if (i === letters.length - 1) {
      const wordsArray = wordsGenerated.split(" ");
      const filteredWords = wordsArray.filter(
        (word) => word.length >= minLength && word.length <= maxLength
      );
      filteredWords.length === 0 ? (i = 0) : (wordsSelection = filteredWords);
    }
  }

  const wordLowercase =
    wordsSelection[Math.floor(Math.random() * wordsSelection.length)];
  const word = wordLowercase.charAt(0).toUpperCase() + wordLowercase.slice(1);

  return word;
}

function createMarkovChain(wordlist) {
  const lettersArray = wordlist.join(" ").split("");

  let markovChain = {};
  for (let i = 0; i < lettersArray.length; i++) {
    const letter = lettersArray[i].toLowerCase();
    if (!markovChain[letter]) {
      markovChain[letter] = [];
    }
    if (lettersArray[i + 1]) {
      markovChain[letter].push(lettersArray[i + 1].toLowerCase());
    }
  }
  return markovChain;
}
