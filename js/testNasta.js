<div id="word-container">
  <span class="letter">C</span>
  <span class="letter">A</span>
  <span class="letter">T</span>
  <span class="letter">C</span>
  <span class="letter">H</span>
</div>;

// #word-container {
//   display: flex;
//   gap: 10px;
// }

// .letter {
//   font-size: 32px;
//   cursor: pointer;
//   position: relative;
//   user-select: none; /* Disable text selection */
// }

const letters = document.querySelectorAll(".letter");

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
    };
  }

  letter.ondragstart = function () {
    return false;
  };
});
