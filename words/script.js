const inputName = document.querySelector("#name-input");
const container = document.querySelector("#word-container");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");

let letters = [];
let isSelecting = false;
let selectionBox = null;
let startX = 0;
let startY = 0;
// отображаем текст инпута
const handlerInputName = (event) => {
  event.preventDefault();
  const valueInput = inputName.value;
  const arrInput = Array.from(valueInput);
  container.innerHTML = "";
  arrInput.forEach((el) => {
    const letter = document.createElement("span");
    letter.textContent = el;
    letter.classList.add("letter");
    container.append(letter);
  });
  letters = document.querySelectorAll(".letter");

  // Применяем события для выделеного слова
  //   addWordEvents();
};

formName.addEventListener("submit", handlerInputName);
// clientX;
// screenX;
// Создаем прямоугольник выделения
function createSelectionBox(x, y) {
  selectionBox = document.createElement("div");
  selectionBox.classList.add("selection-box");
  selectionBox.style.left = `${x}px`;
  selectionBox.style.top = `${y}px`;
  container.append(selectionBox);
}
// Обновляем размер прямоугольника выделения
function updateSelectionBox(x, y) {
  const width = x - startX;
  const height = y - startY;
  selectionBox.style.width = `${Math.abs(width)}px`;
  selectionBox.style.height = `${Math.abs(height)}px`;
  selectionBox.style.left = `${Math.min(startX, x)}px`;
  selectionBox.style.top = `${Math.min(startY, y)}px`;
}

// Начало выделения
container.addEventListener("mousedown", (e) => {
  isSelecting = true;
  startX = e.clientX;
  startY = e.clientY;
  createSelectionBox(startX, startY);
});

// Движение мыши
container.addEventListener("mousemove", (e) => {
  if (isSelecting) {
    updateSelectionBox(e.clientX, e.clientY);
  }
});

// Завершение выделения
container.addEventListener("mouseup", (e) => {
  if (isSelecting) {
    updateSelectionBox(e.clientX, e.clientY);
    // const x1 = Math.min(startX, e.clientX);
    // const y1 = Math.min(startY, e.clientY);
    // const x2 = Math.max(startX, e.clientX);
    // const y2 = Math.max(startY, e.clientY);

    // selectTextInRange(x1, y1, x2, y2);

    // container.removeChild(selectionBox);
    // selectionBox = null;
    isSelecting = false;
  }
});
