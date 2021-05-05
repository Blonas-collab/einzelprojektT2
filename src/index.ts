import { result, inputNameButton, nameInputField, nameInputWrapper, outputName, randomButton } from "./dom-utils";
import { DrawingApp } from "./canvas";

//Inputfeld
inputNameButton.addEventListener("click", ()=> inputName())
function inputName() {
  outputName.textContent = nameInputField.value + " malt hier ein/e";
  nameInputWrapper.style.display = "none";
}

//Random Tier
const randomTiere = ["Hund", "Katze", "Maus", "Elefant", "Flamingo", "Schlange", "Pferd"] as Array<string>;

function getRandomNumber(min, max){
  let step1 = max -min +1;
  let step2 = Math.random() * step1;
  let resultValue = Math.floor(step2) + min;
  return resultValue;
}
randomButton.addEventListener("click", () => {
  let index = getRandomNumber(0, randomTiere.length-1);
  result.textContent = randomTiere[index];
})

//canvas
new DrawingApp();