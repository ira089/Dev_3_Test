const inputName = document.querySelector("#name-input");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");
const targetBody = document.querySelector("body");
const target = document.getElementById("drop-target");
const container = document.querySelector("#word-container");

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

// Создаем прямоугольник выделения
function createSelectionBox(x, y) {
  selectionBox = document.createElement("div");
  selectionBox.classList.add("selection-box");
  selectionBox.style.left = `${x}px`;
  selectionBox.style.top = `${y}px`;
  container.append(selectionBox);
  selectionBox.id = "source";

  console.log("first");
}
// Обновляем размер прямоугольника выделения
function updateSelectionBox(x, y) {
  const width = x - startX;
  const height = y - startY;
  selectionBox.style.width = `${Math.abs(width)}px`;
  selectionBox.style.height = `${Math.abs(height)}px`;
  selectionBox.style.left = `${Math.min(startX, x)}px`;
  selectionBox.style.top = `${Math.min(startY, y)}px`;
  console.log("second");
}

//заканчиваем выделение
function endSelectionBox(x, y) {
  updateSelectionBox(x, y);
  // добавляем атрибут для перемещения
  selectionBox.draggable = "true";
  selectionBox.addEventListener("dragstart", dragstartHandler);
  console.log("end");
}

// Функция-обработчик для движения мыши
function onMouseMove(e) {
  if (isSelecting) {
    updateSelectionBox(e.clientX, e.clientY);
  }
}

// Функция-обработчик для завершения выделения
function onMouseUp(e) {
  if (isSelecting) {
    endSelectionBox(e.clientX, e.clientY);
    isSelecting = false;
    // Удаляем слушатели
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("mouseup", onMouseUp);
  }
}

// Начало выделения
container.addEventListener(
  "mousedown",
  (e) => {
    isSelecting = true;
    startX = e.clientX;
    startY = e.clientY;
    createSelectionBox(startX, startY);
    // Движение мыши
    container.addEventListener("mousemove", onMouseMove);
    // Завершение выделения
    container.addEventListener("mouseup", onMouseUp);
  },

  { once: true }
);

function dragstartHandler(event) {
  selectionBox = event.target;
  selectionBox.style.background = "rgb(192, 253, 255)";
}
function dragoverHandler(event) {
  event.preventDefault();
}
function dropHandler(event) {
  console.log(event);
  event.preventDefault();

  // selectionBox.style.position = "static";

  if (selectionBox) {
    // Вычисляем новые координаты относительно целевого контейнера
    const dropTargetRect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - dropTargetRect.left;
    const offsetY = event.clientY - dropTargetRect.top;
    selectionBox.parentNode.removeChild(selectionBox);
    event.target.appendChild(selectionBox);
    // Сброс координат для правильного отображения
    // selectionBox.style.left = "0px";
    // selectionBox.style.top = "0px";
    // Устанавливаем новые координаты для правильного позиционирования
    selectionBox.style.left = `${offsetX}px`;
    selectionBox.style.top = `${offsetY}px`;
    selectionBox.style.background = "rgba(0, 0, 0, 0.2)";

    // selectionBox.style.position = "absolute";
    selectionBox = null;
  }
}
target.addEventListener("dragover", dragoverHandler);
target.addEventListener("drop", dropHandler);
