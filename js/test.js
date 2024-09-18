const inputName = document.querySelector("#name-input");
const titleName = document.querySelector("#name-output");
const btnName = document.querySelector("#name-button");
const formName = document.querySelector("#name-form");
// console.dir(inputName);
// console.log(spanName.textContent);

const hadlerInputName = (event) => {
  console.dir(event.currentTarget[0].value);
  event.preventDefault();
  const valueInput = event.currentTarget[0].value;

  console.dir(valueInput);

  titleName.textContent = valueInput;
};

formName.addEventListener("submit", hadlerInputName);
