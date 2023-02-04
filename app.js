"use strict";

const containerName = document.querySelector(".container-name");

function generateMarkovName() {
  const markovChain = createMarkovChain();
  const generatedNames = generateNameList(markovChain);
  const finishedName = prepareName(generatedNames);
  putNameOnPage(finishedName);
}

function createMarkovChain() {
  const radioButtons = document.getElementsByName("gender");
  let gender = "";
  radioButtons.forEach((button) => {
    if (button.checked) {
      gender = button.value;
    }
  });

  let names = [];
  if (gender === "random") {
    names = [...firstnamesM, firstnamesF];
  }
  if (gender === "male") {
    names = [...firstnamesM];
  }
  if (gender === "female") {
    names = [...firstnamesF];
  }

  const lettersArray = names.toString().replaceAll(",", " ").split("");

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

function generateNameList(markovChain) {
  const letters = Object.keys(markovChain);

  let letter = letters[Math.floor(Math.random() * letters.length)];

  let generatedNames = "";
  for (let i = 0; i < letters.length; i++) {
    generatedNames += letter;

    let newLetter =
      markovChain[letter][
        Math.floor(Math.random() * markovChain[letter].length)
      ];
    letter = newLetter;

    if (!letter || !markovChain.hasOwnProperty(letter)) {
      letter = letters[Math.floor(Math.random() * letters.length)];
    }
  }

  return generatedNames;
}

function prepareName(generatedNames) {
  const namesArray = generatedNames.split(" ");
  const maxNameLength = getMaxLength(namesArray);
  const filteredNames = namesArray.filter(
    (name) => name.length > 2 && name.length < maxNameLength
  );
  const name = filteredNames[Math.floor(Math.random() * filteredNames.length)];
  const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
  return nameUpperCase;
}

function getMaxLength(namesArray) {
  const maxLength = namesArray.sort((a, b) => {
    return b.length - a.length;
  })[0].length;

  return maxLength;
}

function putNameOnPage(finishedName) {
  containerName.innerHTML = "";
  const nameElement = document.createElement("div");
  nameElement.setAttribute("class", "name");
  nameElement.innerHTML = finishedName;
  containerName.appendChild(nameElement);

  const textExamples = [
    `Oh nein! Da kommt ${finishedName} das Monster! Lauf um dein Leben!`,
    `So, dein Name ist also ${finishedName}? Mh, sehr verdächtig.`,
    `Also wenn ich ${finishedName} heißen würde, wäre ich verdammt froh!`,
    `Also wenn ich ${finishedName} heißen würde, wäre ich verdammt sauer!`,
    `${finishedName}? Waren deine Eltern besoffen als sie dich getauft haben?`,
    `Hurra! Es ist ${finishedName}, Retter der Nation!`,
  ];

  const textElement = document.createElement("div");
  textElement.setAttribute("class", "example");
  textElement.innerHTML =
    textExamples[Math.floor(Math.random() * textExamples.length)];
  containerName.appendChild(textElement);
}
