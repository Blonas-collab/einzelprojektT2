import { outputAnimalName, nameInputButton, nameInputField, nameInputWrapper, outputName, randomAnimalNameButton, darkModeButton, body, darkMode, animalNameList } from "./dom-utils";
import { DrawingApp } from "./canvas";

//Dark Mode
darkModeButton.addEventListener("click", ()=> changeDarkMode());
function changeDarkMode() {
  body.classList.toggle("darkModeOn");
}

//Inputfeld
nameInputButton.addEventListener("click", ()=> inputName());
function inputName() {
  outputName.textContent = nameInputField.value + " malt hier ein/e";
  nameInputWrapper.style.display = "none";
  darkMode.style.visibility = "visible";
}

//Random Tier
function getRandomNumber(min, max){
  let step1 = max -min +1;
  let step2 = Math.random() * step1;
  let resultValue = Math.floor(step2) + min;
  return resultValue;
}
randomAnimalNameButton.addEventListener("click", () => {
  let index = getRandomNumber(0, animalNameList.length-1);
  outputAnimalName.textContent = animalNameList[index];
})

//canvas
new DrawingApp();