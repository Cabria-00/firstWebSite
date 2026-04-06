const cards = document.querySelectorAll(".card");

const lessonList = document.querySelector("#lesson-list li");
console.log(lessonList);

const cardObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 0.07 },
);

cards.forEach((card) => {
  cardObserver.observe(card);
});

console.log(cards);

const footerSpan = document.getElementById("js-footer-span");

footerSpan.textContent = new Date().getUTCFullYear();

const fourthShowAnswerButton = document.querySelector("#toggle-fourth-answer");
const fourthAnswer = document.querySelector("#question-four-answer");

fourthShowAnswerButton.addEventListener("click", () => {
  fourthAnswer.classList.toggle("hidden");
  fourthAnswer.classList.contains("hidden")
    ? (fourthShowAnswerButton.innerText = "Show Answer")
    : (fourthShowAnswerButton.innerText = "Hide Answer");
});

const showAlert = document.querySelector(".show-alert-btn");
const showConfirm = document.querySelector(".show-confirm-btn");
const showPrompt = document.querySelector(".show-prompt-btn");

const inputAlert = document.querySelector(".alert-input");
const inputConfirm = document.querySelector(".confirm-input");
const inputPrompt = document.querySelector(".prompt-input");

// showAlert
showAlert.addEventListener("click", (e) => {
  e.preventDefault();
  inputAlert.value === ""
    ? alert(`The user is quiet`)
    : alert(`The user says ${inputAlert.value}`);
  inputAlert.value = "";
});
// showConfirm
showConfirm.addEventListener("click", (e) => {
  e.preventDefault();
  const answer = confirm("Do you understand the lesson so far?");
  if (answer) {
    inputConfirm.value = "Nice 😎";
    setTimeout(() => {
      inputConfirm.value = "";
    }, 3000);
  } else {
    inputConfirm.value = "Hmm... we'll fix that 😏";
    setTimeout(() => {
      inputConfirm.value = "";
    }, 3000);
  }
});

showPrompt.addEventListener("click", (e) => {
  e.preventDefault();
  const answer = prompt(`Do you have something to say?`).trim();
  answer === ""
    ? (inputPrompt.value = `The user says nothing.`)
    : (inputPrompt.value = `The user is saying: ${answer}`);
  setTimeout(() => {
    inputPrompt.value = "";
  }, 3000);
});

// addEventListener

const clickEventBtn = document.querySelector(".clickEvent-btn");

function changeButtonColor() {
  const set1 = Math.floor(Math.random() * 255);
  const set2 = Math.floor(Math.random() * 255);
  const set3 = Math.floor(Math.random() * 255);

  const color = `rgb(${set1},${set2},${set3})`;
  console.log(color);

  clickEventBtn.style.backgroundColor = color;
}

clickEventBtn.addEventListener("click", (e) => {
  changeButtonColor();
});

// hover
const hoverEventBtn = document.querySelector(".hoverEvent-btn");
const addMessageField = document.querySelector(".add-message");
const addMessageBtn = document.querySelector(".js-add-message");

const message = [
  "Hi!",
  "Good Morning!",
  "おはようございます!",
  " がんばれ!",
  "Take a break!",
];

function addMessage() {
  const newMessage = addMessageField.value;
  if (newMessage) {
    message.push(newMessage);
    addMessageField.value = "";
  }
}

addMessageBtn.addEventListener("click", addMessage);

function changeButtonMessage() {
  const set1 = Math.floor(Math.random() * message.length);
  console.log(set1);

  hoverEventBtn.textContent = message[set1];
}

hoverEventBtn.addEventListener("mouseover", changeButtonMessage);
hoverEventBtn.addEventListener("click", changeButtonMessage);

const fauxConsole = document.getElementById("js-itemLog");
document.querySelector(".myFaveList").addEventListener("click", function (e) {
  const foodName = e.target.innerText;
  console.log(foodName + " is clicked!");

  const myPElement = document.createElement("p");
  myPElement.innerText = `${foodName} was clicked!`;

  fauxConsole.append(myPElement);
});

document.querySelector("#lesson-list").addEventListener("click", (e) => {
  const idName = e.target.getAttribute("id");
  const mainDivs = document.querySelector("main").children;

  for (let div of mainDivs) {
    if (div.classList.contains(idName)) {
      div.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

const articleOne = document.querySelector(".js-article");
const articleOneBtn = document.querySelector(".js-readMore-btn");

articleOneBtn.addEventListener("click", () => {
  articleOne.classList.toggle(
    "expandArticle",
    !articleOne.classList.contains("expandArticle"),
  );
  articleOne.classList.contains("expandArticle")
    ? (articleOneBtn.innerText = "Read less")
    : (articleOneBtn.innerText = "Read more");
});
