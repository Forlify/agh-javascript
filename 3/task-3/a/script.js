const licznikInput = document.getElementById("liczba");
let counter = licznikInput.value;

const spans = document.querySelectorAll("span");

const doStuff = function () {
  spans.forEach((element) => {element.textContent = counter;});

  if (counter > 0) 
    counter--;

  if (counter == 0) 
    licznikInput.value = "0";
  
};
window.setInterval(doStuff, 1000);

licznikInput.addEventListener("input", function (e) {
  counter = e.target.value;
});
