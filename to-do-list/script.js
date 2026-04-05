// html element to js object
const addButton = document.querySelector(".addBtn");
const inputField = document.querySelector("#js-input-field");
const taskField = document.querySelector("section");
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");

// task storage
let tasks = ["taskOne", "taskTwo", "taskThree", "taskFour"];

// functions
taskRendering(tasks);
function addTask(paramTask) {
  if (paramTask === "") {
    errorDialog.classList.add("showDialog");
    window.setTimeout(() => {
      errorDialog.classList.remove("showDialog");
    }, 3000);
  } else {
    tasks.push(paramTask);
    addDialog.classList.add("showDialog");
    window.setTimeout(() => {
      addDialog.classList.remove("showDialog");
    }, 3000);

    // creating elements
    const taskDiv = document.createElement("div");
    const taskP = document.createElement("p");
    const taskCompleteBtn = document.createElement("button");
    const taskDeleteBtn = document.createElement("button");

    // append
    taskField.appendChild(taskDiv);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(taskCompleteBtn);
    taskDiv.appendChild(taskDeleteBtn);

    // adding attributes
    taskDiv.classList.add("task-container");
    taskP.classList.add("task");
    taskCompleteBtn.classList.add("completeBtn");
    taskCompleteBtn.setAttribute("id", "js-completed-btn");
    taskDeleteBtn.classList.add("deleteBtn");
    taskDeleteBtn.setAttribute("id", "js-delete-btn");

    // assiding values
    taskP.innerText = paramTask;
    taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;
  }
  console.log(tasks);
}

function taskRendering(paramArray) {
  paramArray.forEach((task, index) => {
    // creating elements
    const taskDiv = document.createElement("div");
    const taskP = document.createElement("p");
    const taskCompleteBtn = document.createElement("button");
    const taskDeleteBtn = document.createElement("button");

    // append
    taskField.appendChild(taskDiv);
    taskDiv.appendChild(taskP);
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
    taskP.innerText = tasks[index];
    taskCompleteBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;
  });
}

// button function

addButton.addEventListener("click", () => {
  addTask(inputField.value);
  inputField.value = "";
});

taskField.addEventListener("click", (e) => {
  const targetBtn = e.target;
  const taskText = targetBtn.closest("div").querySelector("p");
  const targetBtnDataSet = e.target.closest("div").dataset.id;

  if (targetBtn.classList.contains("deleteBtn")) {
    const parentDiv = e.target.closest("div");
    const divContent = parentDiv.querySelector(".task").innerText;

    //remove the item from the task array
    tasks = tasks.filter((task) => task !== divContent);

    //remove the task from the display
    taskField.removeChild(parentDiv);

    //show dialog
    deleteDialog.classList.add("showDialog");

    //remove dialog after 3 sec
    window.setTimeout(() => {
      deleteDialog.classList.remove("showDialog");
    }, 3000);
  } else if (targetBtn.classList.contains("completeBtn")) {
    if (taskText.classList.contains("strike")) {
      //remove strike-through
      taskText.classList.remove("strike");

      //show dialog
      uncheckedDialog.classList.add("showDialog");

      //remove dialog after 3 sec
      window.setTimeout(() => {
        uncheckedDialog.classList.remove("showDialog");
      }, 3000);
    } else {
      taskText.classList.add("strike");
      // show dialog
      completeDialog.classList.add("showDialog");
      // remove dialog after 3s
      window.setTimeout(() => {
        completeDialog.classList.remove("showDialog");
      }, 3000);
    }
  }

  console.log(tasks);
});
