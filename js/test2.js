const textContainer = document.getElementById("text-container");
const text = document.getElementById("text");
let isSelecting = false;
let selectionBox = null;
let startX = 0;
let startY = 0;
let selectedText = "";

// Функция для создания выделенного фрагмента
function createSelectionBox(x, y) {
  selectionBox = document.createElement("div");
  selectionBox.classList.add("selection-box");
  selectionBox.style.left = `${x}px`;
  selectionBox.style.top = `${y}px`;
  textContainer.appendChild(selectionBox);
}

// Функция для обновления размера выделяющего прямоугольника
function updateSelectionBox(x, y) {
  const width = x - startX;
  const height = y - startY;
  selectionBox.style.width = `${Math.abs(width)}px`;
  selectionBox.style.height = `${Math.abs(height)}px`;
  selectionBox.style.left = `${Math.min(startX, x)}px`;
  selectionBox.style.top = `${Math.min(startY, y)}px`;
}

// Функция для получения символов, попавших в прямоугольник
function getSelectedText(box) {
  const textNodes = Array.from(text.childNodes);
  textNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();

      // Проверка пересечения прямоугольников
      Array.from(rects).forEach((rect) => {
        if (
          rect.left < box.right &&
          rect.right > box.left &&
          rect.top < box.bottom &&
          rect.bottom > box.top
        ) {
          const span = document.createElement("span");
          span.classList.add("selected");
          span.textContent = node.textContent;
          node.parentNode.replaceChild(span, node);
        }
      });
    }
  });
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
    const box = selectionBox.getBoundingClientRect();
    getSelectedText(box);
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
    span.classList.remove("selected");
  });
});
