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
  // Обработчик mousedown сработает один раз и автоматически удалится
  { once: true }
);

// перемещение выделеной области
// function moveSelectedArea(selectionBox) {}
function dragstartHandler(event) {
  selectionBox = event.target;
  event.dataTransfer.setData("text/plain", "");
  console.log(selectionBox);
}
function dragoverHandler(event) {
  event.preventDefault();
}
function dropHandler(event) {
  event.preventDefault();
  if (selectionBox) {
    console.log(selectionBox);
    target.appendChild(selectionBox); // Перемещаем элемент в область drop-target
    selectionBox = null; // Сбрасываем ссылку на элемент после перемещения
    // selectionBox.parentNode.removeChild(selectionBox);
    // event.target.appendChild(selectionBox);
  }
}

// container.addEventListener("dragstart", dragstartHandler);
target.addEventListener("dragover", dragoverHandler);
target.addEventListener("drop", dropHandler);
