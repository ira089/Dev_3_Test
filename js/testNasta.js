const letters = document.querySelectorAll(".letter");

const arr = [];
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
      console.log(letter.style.left);
      const findXY = arr.find(
        (el) =>
          el.x === letter.getBoundingClientRect().left &&
          el.y === letter.getBoundingClientRect().top
      );
      console.log(findXY);
      if (!findXY) {
        arr.push({
          x: letter.getBoundingClientRect().left,
          y: letter.getBoundingClientRect().top,
        });
        console.log(arr);
      } else {
        console.log(findXY);
      }
      letter.style.color = "black";
    };
  }

  letter.ondragstart = function () {
    return false;
  };
});
