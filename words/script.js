const inputName = document.querySelector("#name-input");
const container = document.querySelector("#word-container");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");
const targetBody = document.querySelector("body");
const target = document.getElementById("drop-target");

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
container.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  console.log(event.target);
  selectionBox = event.target;
});

target.addEventListener("dragover", (event) => {
  console.log("dragover");
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("drop", (event) => {
  console.log("drop1");
  // prevent default action (open as a link for some elements)
  event.preventDefault();
  console.log(event.target);
  console.log(selectionBox);
  selectionBox.parentNode.removeChild(selectionBox);
  event.target.appendChild(selectionBox);
  // move dragged element to the selected drop target
  if (event.target.className === "dropzone") {
    console.log("перетащили");
    // selectionBox.parentNode.removeChild(selectionBox);
    // event.target.appendChild(selectionBox);
  }
});
