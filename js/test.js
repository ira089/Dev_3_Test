const inputName = document.querySelector("#name-input");
const titleName = document.querySelector("#name-output");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");

const handlerInputName = (event) => {
  event.preventDefault();
  const valueInput = inputName.value;

  console.dir(valueInput);

  titleName.textContent = valueInput;
};

formName.addEventListener("submit", handlerInputName);
document;

const handlerTextMovement = (event) => {
  if (window.getSelection().toString().length > 0) {
    const selectedText = window.getSelection().toString();
    const newPos = { x: event.clientX, y: event.clientY };
    moveText(selectedText, newPos);
  }
};

titleName.addEventListener("mousedown", handlerTextMovement);

function moveText(text, position) {
  const span = document.createElement("span");
  span.textContent = text;
  span.style.left = `${position.x}px`;
  span.style.top = `${position.y}px`;
  document.body.appendChild(span);
}

// var range = document.createRange();
// var sel = window.getSelection();
// range.selectNodeContents(el);
// sel.removeAllRanges();
// sel.addRange(range);
