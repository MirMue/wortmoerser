"use strict";

const containerName = document.querySelector(".container-name");

function generateMarkovName() {
  const minLength = Number(document.getElementById("minlength").value);
  const maxLength = Number(document.getElementById("maxlength").value);
  if (minLength > maxLength) {
    alert(
      "Die Mindestlänge ist größer als die Maximallänge? Das geht so nicht. Versuch's nochmal!"
    );
    return;
  }
  const wordlist = getWordlistByGender();
  const markovChain = createMarkovChain(wordlist);
  const generatedName = generateWord(markovChain, minLength, maxLength);
  putNameOnPage(generatedName);
  addExamples(generatedName);
}

function getWordlistByGender() {
  const radioButtons = document.getElementsByName("gender");
  let gender = "";
  radioButtons.forEach((button) => {
    if (button.checked) {
      gender = button.value;
    }
  });

  if (gender === "random") {
    return [...firstnamesM, ...firstnamesF];
  }
  if (gender === "male") {
    return [...firstnamesM];
  }
  if (gender === "female") {
    return [...firstnamesF];
  }
}

function putNameOnPage(generatedName) {
  const name = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
  containerName.innerHTML = "";
  const nameElement = document.createElement("div");
  nameElement.setAttribute("class", "name");
  nameElement.innerHTML = name;
  containerName.appendChild(nameElement);
  return;
}

function addExamples(generatedName) {
  const textExamples = [
    `Oh nein! Da kommt ${generatedName} das Monster! Lauf um dein Leben!`,
    `So, dein Name ist also ${generatedName}? Mh, sehr verdächtig.`,
    `Also wenn ich ${generatedName} heißen würde, wäre ich verdammt froh!`,
    `Also wenn ich ${generatedName} heißen würde, wäre ich verdammt sauer!`,
    `${generatedName}? Waren deine Eltern besoffen als sie dich getauft haben?`,
    `Hurra! Es ist ${generatedName}, Retter der Nation!`,
  ];

  const textElement = document.createElement("div");
  textElement.setAttribute("class", "example");
  textElement.innerHTML =
    textExamples[Math.floor(Math.random() * textExamples.length)];
  containerName.appendChild(textElement);
  return;
}
