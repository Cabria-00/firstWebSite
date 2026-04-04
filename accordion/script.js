const ul = document.querySelector("ul");

// new method
ul.addEventListener("click", (e) => {
  const toggleElement = e.target.closest(".faq-question");
  const myLi = toggleElement.closest("li");
  const answer = myLi.querySelector(".question-answer");
  const span = toggleElement.querySelector("span");

  answer.classList.toggle("show");

  if (answer.classList.contains("show")) {
    span.textContent = "−";
  } else {
    span.textContent = "+";
  }

  console.log(span);
});

// old method
// ul.addEventListener("click", (e) => {
//   const toggleSign = e.target.nextElementSibling;

//   const answer = e.target.parentElement.nextElementSibling.nextElementSibling;

//   answer.classList.toggle("show");

//   if (answer.classList.contains("show")) {
//     toggleSign.textContent = "-";
//   } else {
//     toggleSign.textContent = "+";
//   }
// });
