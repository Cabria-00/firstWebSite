// html element to js object
const addButton = document.querySelector(".addBtn");
const inputField = document.querySelector("#js-input-field");
const dateField = document.querySelector("#js-datePicker");
const assignmentMethod = document.querySelector("#js-task-assignment");
const taskField = document.querySelector("section");
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");
const cbTracked = document.querySelector(".task-tracked");
const cbUntracked = document.querySelector(".task-untracked");
const main = document.querySelectorAll("main");
const sidebar = document.querySelector("aside");
const floatButton = document.querySelector(".float-container");
const tables = document.querySelectorAll("table");
const checkBoxes = document.querySelectorAll(".js-myCheckbox");

// task class blueprint
class Task {
  constructor(task, taskAssigment, shiftDate) {
    this.task = task;
    this.taskAssigment = taskAssigment || "-";
    this.shiftDate = shiftDate || new Date().toISOString().split("T")[0];
    // this.taskNotes = taskNotes;
    this.isCompleted = false;
    this.taskCreateDate = new Date().toISOString().split("T")[0];
    this.uniqueId = Date.now();
    this.isTracked = false;
  }

  // get taskName() {
  //   return this._taskName;
  // }

  // get shiftDate() {
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

// initial rendering of taskCount
updateTaskCount();

function showDialog(dialogType, timer = 3000) {
  document.querySelectorAll(".dialog").forEach((dialog) => {
    dialog.classList.remove("showDialog");
  });

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
        inputField.value.trim(),
        assignmentMethod.value,
        dateField.value,
      ),
    );
    showDialog(addDialog);

    // saving to localStorage
    save();

    //re-rendering of task to the display
    taskRendering(tasks);

    // clearning input field
    inputField.value = "";
    dateField.value = "";
    assignmentMethod.selectedIndex = 0; // selectedIndex is the method to reset the option of the select element to the first index

    // update task count
    updateTaskCount();
  }
}

function taskRendering(paramArray) {
  // reseting the task
  taskField.innerHTML = "";

  paramArray.forEach((task) => {
    // creating elements
    const taskDiv = document.createElement("div");
    const taskInfoDiv = document.createElement("div");
    const taskP = document.createElement("p");
    const taskCheckBox = document.createElement("input");
    const taskAssignmentP = document.createElement("p");
    const taskDateP = document.createElement("p");
    const taskCompleteBtn = document.createElement("button");
    const taskDeleteBtn = document.createElement("button");

    // append
    taskField.appendChild(taskDiv);
    taskDiv.appendChild(taskInfoDiv);
    taskInfoDiv.appendChild(taskP);
    taskInfoDiv.appendChild(taskAssignmentP);
    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(taskDateP);
    taskDiv.appendChild(taskCompleteBtn);
    taskDiv.appendChild(taskDeleteBtn);

    // adding attributes
    taskDiv.classList.add("task-container");
    taskDiv.dataset.id = task.uniqueId;
    taskInfoDiv.classList.add("task-info");
    taskP.classList.add("task");
    taskDateP.classList.add("shiftDate");
    taskAssignmentP.classList.add("task-sub");
    taskCheckBox.classList.add("js-myCheckbox");
    taskCheckBox.setAttribute("type", "checkbox");
    taskCompleteBtn.classList.add("completeBtn");
    taskCompleteBtn.setAttribute("id", "js-completed-btn");
    taskDeleteBtn.classList.add("deleteBtn");
    taskDeleteBtn.setAttribute("id", "js-delete-btn");

    // assiding values
    taskP.innerText = task.task;
    taskAssignmentP.innerText = task.taskAssigment;
    taskDateP.innerText = task.shiftDate;
    taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
    taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;

    // isCompleted strike-through
    if (task.isCompleted === true) {
      taskP.classList.add("strike");
      taskCompleteBtn.innerHTML = `<i class="fa fa-close"></i>`;
    } else {
      taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
    }

    if (task.isTracked === true) {
      taskCheckBox.checked = true;
    } else {
      taskCheckBox.checked = false;
    }
  });
}

function deleteTask(index) {
  // remove the item from the task array
  // Note:for arrow functions, if it is inside a curly braces, put "return", if not, no need to put one.

  // this returns an array wih the removed content
  tasks.splice(index, 1);

  // update ui
  taskRendering(tasks);

  //show/remove dialog
  showDialog(deleteDialog);

  // saving to localStorage
  save();

  // task count
  updateTaskCount();
}

function updateCompleteStatus(index, taskName, taskButton) {
  if (taskName.classList.contains("strike")) {
    //remove strike-through
    taskName.classList.remove("strike");

    // setting isCompleted to false
    tasks[index].isCompleted = false;

    // change icon
    taskButton.innerHTML = `<i class="fa fa-check"></i>`;

    //show/remove dialog
    showDialog(uncheckedDialog);

    // saving to localStorage
    save();
    // task count
    updateTaskCount();
  } else {
    // adding strike-through
    taskName.classList.add("strike");
    // setting isCompleted to true
    tasks[index].isCompleted = true;

    // change icon
    taskButton.innerHTML = `<i class="fa fa-close"></i>`;

    // show dialog
    showDialog(completeDialog);
    // saving to localStorage
    save();
    // task count
    updateTaskCount();
  }
}

function save() {
  localStorage.setItem("listOfTasks", JSON.stringify(tasks));
}

function collapseSidebar() {
  if (sidebar.classList.contains("showSideBar")) {
    sidebar.classList.remove("showSideBar");
  } else {
    sidebar.classList.add("showSideBar");
  }
}

function countTask(array, key = "all", value) {
  if (key === "all") {
    return array.length;
  } else {
    let count = array.filter((item) => item[key] === value); //use bracket notation for dynamic key
    return count.length;
  }
}

function updateTaskCount() {
  tables[0].querySelector(".js-total-task").innerText = countTask(tasks);
  tables[0].querySelector(".js-touched").innerText = countTask(
    tasks,
    "isCompleted",
    true,
  );
  tables[0].querySelector(".js-not-touched").innerText = countTask(
    tasks,
    "isCompleted",
    false,
  );
  tables[1].querySelector(".js-assigned").innerText = countTask(
    tasks,
    "taskAssigment",
    "Assigned task",
  );
  tables[1].querySelector(".js-grabbed").innerText = countTask(
    tasks,
    "taskAssigment",
    "Grabbed task",
  );
  tables[1].querySelector(".js-previously").innerText = countTask(
    tasks,
    "taskAssigment",
    "Previously worked on",
  );
  tables[1].querySelector(".js-endorsed").innerText = countTask(
    tasks,
    "taskAssigment",
    "Endorsed to me",
  );
  tables[1].querySelector(".js-none").innerText = countTask(
    tasks,
    "taskAssigment",
    " - ",
  );
}
function updateTrackerStatus(index, targetBtn) {
  if (targetBtn.checked) {
    tasks[index].isTracked = true;
    showDialog(cbTracked);
    save();
  } else {
    tasks[index].isTracked = false;
    showDialog(cbUntracked);
    save();
  }
}

// button events
addButton.addEventListener("click", addTask);

inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

dateField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

assignmentMethod.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

taskField.addEventListener("click", (e) => {
  // So my delete function uses splice method for deleting the task from the array list. It uses the data-id of the task to identify the task that needs to be removed. That is why it is necessary to get the it. In this code, it is stored in the variable "taskDataSetId".

  const targetBtn = e.target;
  const deleteBtn = targetBtn.closest(".deleteBtn");
  const completeBtn = targetBtn.closest(".completeBtn");
  const targetCB = targetBtn
    .closest(".task-container")
    .querySelector(".js-myCheckbox");

  if (!deleteBtn && !completeBtn && !targetCB) return;

  const targetBtnDiv = e.target.closest(".task-container");
  const taskName = targetBtnDiv.querySelector(".task");
  const taskDataSetId = Number(targetBtnDiv.dataset.id);
  // the index of the object related to the button.
  const index = tasks.findIndex((item) => item.uniqueId === taskDataSetId);

  if (deleteBtn) {
    deleteTask(index, taskDataSetId);
  } else if (completeBtn) {
    updateCompleteStatus(index, taskName, completeBtn);
  } else if (targetCB) {
    updateTrackerStatus(index, targetBtn);
  }
});

floatButton.addEventListener("click", collapseSidebar);
