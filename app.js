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
  const namelist = getNamelist();
  const generatedName = generateWord(namelist, minLength, maxLength);
  putNameOnPage(generatedName);
  addExamples(generatedName);
}

function getNamelist() {
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
  nameElement.innerHTML = generatedName;
  containerName.appendChild(nameElement);
  return;
}

function addExamples(generatedName) {
  const textExamples = [
    `Oh no! It's ${generatedName} the Terrible! Run for your lives!`,
    `So your name is ${generatedName}, ey? Very suspicious.`,
    `Well, if I was named ${generatedName}, I'd be very happy!`,
    `Well, if I was named ${generatedName}, I'd be very upset!`,
    `${generatedName}? Were your parents drunk when they named you?`,
    `Hurray! It's ${generatedName}, hero of great renown!`,
  ];

  const textElement = document.createElement("div");
  textElement.setAttribute("class", "example");
  textElement.innerHTML =
    textExamples[Math.floor(Math.random() * textExamples.length)];
  containerName.appendChild(textElement);
  return;
}
