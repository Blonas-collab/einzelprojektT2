import { result, inputNameButton, nameInputField, nameInputWrapper, outputName, randomButton, darkModeButton, body, darkMode, randomTiere } from "./dom-utils";
import { DrawingApp } from "./canvas";

//Dark Mode
darkModeButton.addEventListener("click", ()=> changeDarkMode());
function changeDarkMode() {
  body.classList.toggle("darkModeOn");
}

//Inputfeld
inputNameButton.addEventListener("click", ()=> inputName());
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
randomButton.addEventListener("click", () => {
  let index = getRandomNumber(0, randomTiere.length-1);
  result.textContent = randomTiere[index];
})

//canvas
new DrawingApp();


//save&load canvas
function saveDrawingApp(){
  localStorage.setItem("DrawingApp", this.DrawingApp.toDataURL())
  console.log("Drawing App gespeichert")
}


function loadDrawingApp(){
  let dataURL = localStorage.getItem("DrawingApp");
  let drawing = new Image();
  drawing.src = dataURL;
  console.log("Drawing App geladen")
}