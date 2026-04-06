// html element to js object
const addButton = document.querySelector(".addBtn");
const inputField = document.querySelector("#js-input-field");
const dateField = document.querySelector("#js-datePicker");
console.log(dateField.value);
const taskField = document.querySelector("section");
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");

// task class blueprint
class Task {
  constructor(taskName, targetDate) {
    this.taskName = taskName;
    this.targetDate = targetDate;
    this.isCompleted = false;
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

// getting the added  task

addButton.addEventListener("click", function () {
  if (inputField.value === "") {
    errorDialog.classList.add("showDialog");
    window.setTimeout(() => {
      errorDialog.classList.remove("showDialog");
    }, 3000);
  } else {
    tasks.push(
      new Task(
        inputField.value,
        dateField.value || new Date().toISOString().split("T")[0],
      ),
    );
    addDialog.classList.add("showDialog");
    window.setTimeout(() => {
      addDialog.classList.remove("showDialog");
    }, 3000);

    // displaying new task

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
    taskDiv.dataset.id = tasks.length;
    taskP.classList.add("task");
    taskCompleteBtn.classList.add("completeBtn");
    taskCompleteBtn.setAttribute("id", "js-completed-btn");
    taskDeleteBtn.classList.add("deleteBtn");
    taskDeleteBtn.setAttribute("id", "js-delete-btn");

    // assiding values
    taskP.innerText = inputField.value;
    taskDateP.textContent = dateField.value;
    taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;

    // saving to localStorage
    localStorage.setItem("listOfTasks", JSON.stringify(tasks));

    // clearning input field
    inputField.value = "";
    dateField.value = "";
  }
});

inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (inputField.value === "") {
      errorDialog.classList.add("showDialog");
      window.setTimeout(() => {
        errorDialog.classList.remove("showDialog");
      }, 3000);
    } else {
      tasks.push(
        new Task(
          inputField.value,
          dateField.value || new Date().toISOString().split("T")[0],
        ),
      );
      addDialog.classList.add("showDialog");
      window.setTimeout(() => {
        addDialog.classList.remove("showDialog");
      }, 3000);

      // displaying new task

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
      taskDiv.dataset.id = tasks.length;
      taskP.classList.add("task");
      taskCompleteBtn.classList.add("completeBtn");
      taskCompleteBtn.setAttribute("id", "js-completed-btn");
      taskDeleteBtn.classList.add("deleteBtn");
      taskDeleteBtn.setAttribute("id", "js-delete-btn");

      // assiding values
      taskP.innerText = inputField.value;
      taskDateP.textContent =
        dateField.value || new Date().toISOString().split("T")[0];
      taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
      taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;

      // saving to localStorage
      localStorage.setItem("listOfTasks", JSON.stringify(tasks));

      // clearning input field
      inputField.value = "";
      dateField.value = "";
    }
  }
});

function taskRendering(paramArray) {
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

    // assiding values
    taskP.innerText = tasks[index].taskName;
    taskDateP.innerText = tasks[index].targetDate;
    taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;
  });
}

taskField.addEventListener("click", (e) => {
  const targetBtn = e.target;
  const taskText = targetBtn.closest("div").querySelector("p");
  const targetBtnDataSet = e.target.closest("div").dataset.id;

  if (targetBtn.classList.contains("deleteBtn")) {
    const parentDiv = e.target.closest("div");
    const divContent = parentDiv.querySelector(".task").innerText;
    console.log(divContent);

    // remove the item from the task array
    tasks = tasks.filter((task) => {
      task.taskName !== divContent;
    });

    //remove the task from the display
    taskField.removeChild(parentDiv);

    //show dialog
    deleteDialog.classList.add("showDialog");

    //remove dialog after 3 sec
    window.setTimeout(() => {
      deleteDialog.classList.remove("showDialog");
    }, 3000);

    // saving to localStorage
    localStorage.setItem("listOfTasks", JSON.stringify(tasks));
  } else if (targetBtn.classList.contains("completeBtn")) {
    if (taskText.classList.contains("strike")) {
      // setting isCompleted to false
      tasks[targetBtnDataSet].isCompleted = false;

      //remove strike-through
      taskText.classList.remove("strike");

      //show dialog
      uncheckedDialog.classList.add("showDialog");

      //remove dialog after 3 sec
      window.setTimeout(() => {
        uncheckedDialog.classList.remove("showDialog");
      }, 3000);
    } else {
      // setting isCompleted to true
      tasks[targetBtnDataSet].isCompleted = true;

      // adding strike-through
      taskText.classList.add("strike");

      // show dialog
      completeDialog.classList.add("showDialog");

      // remove dialog after 3s
      window.setTimeout(() => {
        completeDialog.classList.remove("showDialog");
      }, 3000);

      // saving to localStorage
      localStorage.setItem("listOfTasks", JSON.stringify(tasks));
    }
  }
  console.log(tasks);
});
