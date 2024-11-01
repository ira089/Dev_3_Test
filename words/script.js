const inputName = document.querySelector("#name-input");
const container = document.querySelector("#word-container");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");
const targetBody = document.querySelector("body");

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

  // добавляем атрибут для перемещения
  // selectionBox.draggable = "true";
  container.append(selectionBox);
  selectionBox.id = "source";
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
    isSelecting = false;
    container.removeEventListener("mousemove", (e) => {
      if (isSelecting) {
        updateSelectionBox(e.clientX, e.clientY);
      }
    });
    selectionBox = null;
    moveSelectedArea(selectionBox);
  }
});

// перемещение выделеной области
function moveSelectedArea(selectionBox) {
  selectionBox.addEventListener("dragstart", (event) => {
    console.log(event);
    console.log("dragStart");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.id);
    event.currentTarget.classList.add("dragging");

    // event.dataTransfer.clearData();
  });

  selectionBox.addEventListener("dragend", (event) =>
    event.target.classList.remove("dragging")
  );

  targetBody.addEventListener("dragover", (event) => {
    event.preventDefault();
    console.log("dragOver");
    event.dataTransfer.dropEffect = "move";
  });

  targetBody.addEventListener("drop", (event) => {
    event.preventDefault();
    console.log("Drop");
    const data = event.dataTransfer.getData("text/plain");
    const source = document.getElementById(data);
    if (source) {
      // Перемещаем source к месту drop
      source.style.position = "absolute";
      source.style.left = `${event.clientX}px`;
      source.style.top = `${event.clientY}px`;
      console.log("Dropped!");
    }
    // event.target.appendChild(source);
    // console.log("Dropped!");
  });
}
