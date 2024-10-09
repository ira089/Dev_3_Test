const letters = document.querySelectorAll(".letter");
const container = document.getElementById("word-container");

letters.forEach((letter) => {
  letter.addEventListener("mousedown", onMouseDown);

  function onMouseDown(event) {
    let shiftX = event.clientX - letter.getBoundingClientRect().left;
    let shiftY = event.clientY - letter.getBoundingClientRect().top;

    letter.style.position = "absolute";
    letter.style.zIndex = 1000;
    document.body.append(letter);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      letter.style.left = pageX - shiftX + "px";
      letter.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    letter.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      letter.onmouseup = null;

      // Проверка на нахождение над другим символом
      let swapLetter = findHoveredLetter(letter);

      if (swapLetter && swapLetter !== letter) {
        // Перестановка символов
        swapElements(letter, swapLetter);
      }

      // Возврат символа в контейнер
      resetPosition(letter);
    };
  }

  letter.ondragstart = function () {
    return false;
  };
});

// Функция для поиска символа под курсором
function findHoveredLetter(currentLetter) {
  let currentRect = currentLetter.getBoundingClientRect();

  return Array.from(letters).find((letter) => {
    if (letter === currentLetter) return false;

    let rect = letter.getBoundingClientRect();
    return (
      currentRect.left < rect.right &&
      currentRect.right > rect.left &&
      currentRect.top < rect.bottom &&
      currentRect.bottom > rect.top
    );
  });
}

// Функция для перестановки символов в DOM
function swapElements(element1, element2) {
  const parent = element1.parentNode;
  const sibling =
    element1.nextSibling === element2 ? element1 : element1.nextSibling;

  // Перестановка местами
  parent.insertBefore(element2, sibling);
  parent.insertBefore(element1, element2);
}

// Функция для возврата символа в исходное положение в контейнере
function resetPosition(letter) {
  letter.style.position = "relative";
  letter.style.left = "0px";
  letter.style.top = "0px";
  container.append(letter);
}

// Что изменено и добавлено:
// findHoveredLetter: Функция определяет, какой символ находится под перемещаемым. Она проверяет координаты всех символов и возвращает тот, который пересекается с текущим перемещаемым символом.

// swapElements: Функция, которая меняет местами два элемента в контейнере. Использует методы insertBefore для корректной перестановки символов.

// resetPosition: Функция возвращает стиль позиции символа к relative и сбрасывает стили left и top, чтобы символы возвращались в правильное место после завершения перемещения.
