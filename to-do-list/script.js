// html element to js object
const addButton = document.querySelector(".addBtn");
const inputField = document.querySelector("#js-input-field");
const dateField = document.querySelector("#js-datePicker");
const taskField = document.querySelector("section");
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");
const main = document.querySelectorAll("main");

// task class blueprint
class Task {
  constructor(taskName, targetDate) {
    this.taskName = taskName;
    this.targetDate = targetDate;
    this.isCompleted = false;
    this.taskCreateDate = new Date().toISOString().split("T")[0];
  }

  // get taskName() {
  //   return this._taskName;
  // }

  // get targetDate() {
  //   return this._targetDate;
  // }

  // get isCompleted() {
  //   return this._isCompleted;
  // }

  // set isCompleted(newStatus) {
  //   this._isCompleted = newStatus;
  // }
}
// task storage
let tasks = JSON.parse(localStorage.getItem("listOfTasks")) || [];

//Initial rendering of task
taskRendering(tasks);

function showDialog(dialogType, timer = 3000) {
  dialogType.classList.add("showDialog");
  window.setTimeout(() => {
    dialogType.classList.remove("showDialog");
  }, timer);
}

function addTask() {
  if (inputField.value === "") {
    showDialog(errorDialog);
  } else {
    tasks.push(
      new Task(
        inputField.value,
        dateField.value || new Date().toISOString().split("T")[0],
      ),
    );
    showDialog(addDialog);

    // saving to localStorage
    localStorage.setItem("listOfTasks", JSON.stringify(tasks));

    //re-rendering of task to the display
    taskRendering(tasks);

    // clearning input field
    inputField.value = "";
    dateField.value = "";
  }
}

function taskRendering(paramArray) {
  // reseting the task
  taskField.innerHTML = "";

  paramArray.forEach((task, index) => {
    // creating elements
    const taskDiv = document.createElement("div");
    const taskP = document.createElement("p");
    const taskDateP = document.createElement("p");
    const taskCompleteBtn = document.createElement("button");
    const taskDeleteBtn = document.createElement("button");

    // append
    taskField.appendChild(taskDiv);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(taskDateP);
    taskDiv.appendChild(taskCompleteBtn);
    taskDiv.appendChild(taskDeleteBtn);

    // adding attributes
    taskDiv.classList.add("task-container");
    taskDiv.dataset.id = index;
    taskP.classList.add("task");
    taskCompleteBtn.classList.add("completeBtn");
    taskCompleteBtn.setAttribute("id", "js-completed-btn");
    taskDeleteBtn.classList.add("deleteBtn");
    taskDeleteBtn.setAttribute("id", "js-delete-btn");

    // isCompleted strike-through
    if (task.isCompleted === true) {
      taskP.classList.add("strike");
    }

    // assiding values
    taskP.innerText = task.taskName;
    taskDateP.innerText = task.targetDate;
    taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;
  });
  localStorage.setItem("listOfTasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", addTask);

inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

dateField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask;
  }
});

taskField.addEventListener("click", (e) => {
  const targetBtn = e.target;
  const parentDiv = e.target.closest(".task-container");
  const taskText = targetBtn.closest("div").querySelector("p");
  const targetBtnDataSet = targetBtn.closest("div").dataset.id;

  if (targetBtn.classList.contains("deleteBtn")) {
    // remove the item from the task array
    // Note:for arrow functions, if it is inside a curly braces, put "return", if not, no need to put one.

    // this returns an array wih remove content
    tasks.splice(targetBtnDataSet, 1);
    console.log(tasks);
    taskRendering(tasks);

    //show/remove dialog
    showDialog(deleteDialog);

    // saving to localStorage
    localStorage.setItem("listOfTasks", JSON.stringify(tasks));
  } else if (targetBtn.classList.contains("completeBtn")) {
    if (taskText.classList.contains("strike")) {
      // setting isCompleted to false
      tasks[targetBtnDataSet].isCompleted = false;

      //remove strike-through
      taskText.classList.remove("strike");

      //show/remove dialog
      showDialog(uncheckedDialog);

      // saving to localStorage
      localStorage.setItem("listOfTasks", JSON.stringify(tasks));
    } else {
      // setting isCompleted to true
      tasks[targetBtnDataSet].isCompleted = true;

      // adding strike-through
      taskText.classList.add("strike");

      // show dialog
      showDialog(completeDialog);
      // saving to localStorage
      localStorage.setItem("listOfTasks", JSON.stringify(tasks));
    }
  }
});
