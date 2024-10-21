const inputName = document.querySelector("#name-input");
const container = document.querySelector("#word-container");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");

let letters = [];
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
  console.log(letters);
  // Применяем события для новых букв
  addLetterEvents();
};

formName.addEventListener("submit", handlerInputName);

// функция для передвигаем по 1 букве
function addLetterEvents() {
  letters.forEach((letter) => {
    letter.addEventListener("mousedown", onMouseDown);

    function onMouseDown(event) {
      letter.style.color = "blue";
      const startX = event.clientX;
      const startY = event.clientY;
      console.log(startX);
      console.log(startY);
      let shiftX = event.clientX - letter.getBoundingClientRect().left;
      let shiftY = event.clientY - letter.getBoundingClientRect().top;
      console.log(letter.getBoundingClientRect().left);
      console.log(shiftX);

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

        letter.style.color = "black";

        // Проверка на нахождение над другим символом
        let swapLetter = findHoveredLetter(letter);

        if (swapLetter && swapLetter !== letter) {
          // Перестановка символов
          swapElements(letter, swapLetter);
        }

        // Возврат символа в контейнер
        // resetPosition(letter);
      };
    }

    letter.ondragstart = function () {
      return false;
    };
  });
}

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

// наверно не нужно:

// const handlerTextMovement = (event) => {
//   if (window.getSelection().toString().length > 0) {
//     const selectedText = window.getSelection().toString();
//     const newPos = { x: event.clientX, y: event.clientY };
//     moveText(selectedText, newPos);
//   }
// };

// titleName.addEventListener("mousedown", handlerTextMovement);

// function moveText(text, position) {
//   const span = document.createElement("span");
//   span.textContent = text;
//   span.style.left = `${position.x}px`;
//   span.style.top = `${position.y}px`;
//   document.body.appendChild(span);
// }

// var range = document.createRange();
// var sel = window.getSelection();
// range.selectNodeContents(el);
// sel.removeAllRanges();
// sel.addRange(range);
