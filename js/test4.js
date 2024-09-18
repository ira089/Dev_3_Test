const textContainer = document.getElementById("text-container");
const text = document.getElementById("text");
let isSelecting = false;
let selectionBox = null;
let startX = 0;
let startY = 0;

// Создаем прямоугольник выделения
function createSelectionBox(x, y) {
  selectionBox = document.createElement("div");
  selectionBox.classList.add("selection-box");
  selectionBox.style.left = `${x}px`;
  selectionBox.style.top = `${y}px`;
  textContainer.appendChild(selectionBox);
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

// Функция для выделения фрагментов текста
function selectTextInRange(x1, y1, x2, y2) {
  const range = document.createRange();
  const selection = window.getSelection();

  // Проходим по каждому символу текста
  for (let i = 0; i < text.textContent.length; i++) {
    range.setStart(text.firstChild, i);
    range.setEnd(text.firstChild, i + 1);
    const rects = range.getClientRects();

    // Проверяем, пересекается ли символ с выделенной областью
    for (const rect of rects) {
      if (
        rect.left < x2 &&
        rect.right > x1 &&
        rect.top < y2 &&
        rect.bottom > y1
      ) {
        const span = document.createElement("span");
        span.classList.add("selected");
        span.textContent = range.toString();
        range.deleteContents();
        range.insertNode(span);
      }
    }
  }
  selection.removeAllRanges(); // Очищаем стандартное выделение
}

// Начало выделения
textContainer.addEventListener("mousedown", (e) => {
  isSelecting = true;
  startX = e.clientX;
  startY = e.clientY;
  createSelectionBox(startX, startY);
});

// Движение мыши
textContainer.addEventListener("mousemove", (e) => {
  if (isSelecting) {
    updateSelectionBox(e.clientX, e.clientY);
  }
});

// Завершение выделения
textContainer.addEventListener("mouseup", (e) => {
  if (isSelecting) {
    const x1 = Math.min(startX, e.clientX);
    const y1 = Math.min(startY, e.clientY);
    const x2 = Math.max(startX, e.clientX);
    const y2 = Math.max(startY, e.clientY);

    selectTextInRange(x1, y1, x2, y2);

    textContainer.removeChild(selectionBox);
    selectionBox = null;
    isSelecting = false;
  }
});

// Перемещение выделенного текста
document.addEventListener("mouseup", (e) => {
  const selectedSpans = document.querySelectorAll(".selected");
  selectedSpans.forEach((span) => {
    span.style.position = "absolute";
    span.style.left = `${e.clientX}px`;
    span.style.top = `${e.clientY}px`;
  });
});
