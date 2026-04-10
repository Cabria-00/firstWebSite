// html element to js object
const addButton = document.querySelector(".addBtn");
const inputField = document.querySelector("#js-input-field");
const dateField = document.querySelector("#js-datePicker");
const assignmentMethod = document.querySelector("#js-task-assignment");
const taskField = document.querySelector("section");
const main = document.querySelectorAll("main");
const sidebar = document.querySelector("aside");
const floatButton = document.querySelector(".float-container");
const tables = document.querySelectorAll("table");
const checkBoxes = document.querySelectorAll(".js-myCheckbox");
const searchField = document.querySelector(".searchField");
const searchBtn = document.querySelector(".searchBtn");
const changelogBtn = document.querySelector(".changelog");
const changelogSidebar = document.querySelector(".changelog-sidebar");
const changeSection = document.querySelector(".change-section");
// dialogs
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");
const cbTracked = document.querySelector(".task-tracked");
const cbUntracked = document.querySelector(".task-untracked");
const duplicateDialog = document.querySelector(".duplicate");

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

// changelog storage
const changelog = [
  {
    Date: "April 5, 2026",
    Summary: "Initial layout of the tracker. It only has add functionality.",
    Changes: [
      "Added 'add', 'mark as complete', and 'delete' button.",
      "Added 'addTask' function",
      "Added 'taskRendering' function",
    ],
  },
  {
    Date: "April 6, 2026",
    Summary:
      "Created a 'Task' class that would be the blueprint of the task. It has taskName, taskDate, and isCompleted as the keys. Also enable of saving the tasks in the localStorage. Adding task now prompts a dialog to appear and added the ability to add task by entering the 'enter' key.",
    Changes: [
      "Added 'Task' class",
      "Added 'save' to JSON",
      "Added 'dialog' popup",
      "Added 'addTask' by entering the 'enter' key",
      "Added 'date' field",
    ],
  },
  {
    Date: "April 7, 2026",
    Summary:
      "Added other dialogs that will pop up depending on the event.Created a function for each event for ease of use and triggering to make the project easily scalable. Added the delete and update functionality",
    Changes: [
      "Added 'showDialog' function",
      "Added 'save' function",
      "Added 'deleteTask' function",
      "Added 'updateCompleteStatus' function",
    ],
  },
  {
    Date: "April 8, 2026",
    Summary:
      "Added a sidebar that will show the total number of task depending if complete or not and task assignment.",
    Changes: [
      "Added 'task-assigment' input",
      "Added 'taskCount' function",
      "Added 'updateTaskCount' function",
      "Added 'sideBar'",
    ],
  },
  {
    Date: "April 9, 2026",
    Summary:
      "Added checkboxes that indicates if an item is tracked in the tracker. Refactor the code. Made the new task to appear on top.",
    Changes: [
      "Added 'checkboxes'.",
      "Added 'checkbox' dialogs",
      "Replace .pop() to .unshift()",
    ],
  },
  {
    Date: "April 10, 2026",
    Summary:
      "Added the function of checking if a duplicate is already in the list, Also added a search functionality that will render the item if it is found and will inform the user if it is not found. Added the changelog to track all the progress made.",
    Changes: [
      "Added 'duplicate' dialog",
      "Added 'duplicateChecker' function",
      "Added 'Search button'",
      "Added 'Seach field'",
      "Added 'createElement' function",
      "Added 'itemSearch' function",
      "Added 'closeSearch' function",
      "Added 'changelog'",
      "Added changelog to localStorage",
    ],
  },
  {
    Date: "Bug",
    Summary:
      "Found an issue with the rendering of the sidebar. Expected - If one sidebar is open the other will close. Actual - both are open at the same time",
    Changes: [
      "Added 'add', 'mark as complete', and 'delete' button.",
      "Added 'addTask' function",
      "Added 'taskRendering' function",
    ],
  },
];
saveChangelog();

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
    tasks.unshift(
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
  createElement(paramArray);
}
function createElement(paramArray) {
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
    const vr1 = document.createElement("hr");
    const vr2 = document.createElement("hr");
    const vr3 = document.createElement("hr");

    // append
    taskField.appendChild(taskDiv);
    taskDiv.appendChild(taskInfoDiv);
    taskInfoDiv.appendChild(taskP);
    taskInfoDiv.appendChild(taskAssignmentP);
    taskDiv.appendChild(vr1);
    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(vr2);
    taskDiv.appendChild(taskDateP);
    taskDiv.appendChild(vr3);
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
    vr1.classList.add("vr");
    vr2.classList.add("vr");
    vr3.classList.add("vr");

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
    floatButton.querySelector("button").innerHTML =
      `<i class="fa fa-plus"></i>`;
  } else {
    sidebar.classList.add("showSideBar");
    floatButton.querySelector("button").innerHTML =
      `<i class="fa fa-home"></i>`;
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
function duplicateChecker() {
  const isDuplicate = tasks.some(
    (item) => item.task === inputField.value.trim(),
  );
  if (isDuplicate) {
    showDialog(duplicateDialog);
    inputField.value = "";
  } else {
    addTask();
  }
}
function itemSearch() {
  const searchItem = searchField.value.trim();
  const result = tasks.filter((item) => item.task === searchItem);

  if (result.length > 0) {
    taskRendering(result);
  } else {
    taskField.innerHTML = "";
    // create element
    const errorDiv = document.createElement("div");
    const errorP = document.createElement("p");

    // append
    taskField.append(errorDiv);
    errorDiv.append(errorP);

    // adding attributes
    errorDiv.classList.add("errorFormat");

    // append
    errorP.textContent = `'${searchItem}' not found`;
  }
}
function closeSearch() {
  taskRendering(tasks);
}
function saveChangelog() {
  localStorage.setItem("changelog", JSON.stringify(changelog));
}

// button events
addButton.addEventListener("click", duplicateChecker);

inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    duplicateChecker();
  }
});

dateField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    duplicateChecker();
  }
});

assignmentMethod.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    duplicateChecker();
  }
});

taskField.addEventListener("click", (e) => {
  // So my delete function uses splice method for deleting the task from the array list. It uses the data-id of the task to identify the task that needs to be removed. That is why it is necessary to get the it. In this code, it is stored in the variable "taskDataSetId".

  const targetBtn = e.target;
  const deleteBtn = targetBtn.closest(".deleteBtn");
  const completeBtn = targetBtn.closest(".completeBtn");
  const targetCB = targetBtn.matches(".js-myCheckbox");

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
searchBtn.addEventListener("click", itemSearch);
searchField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    itemSearch();
  } else if (e.key === "Escape") {
    closeSearch();
    searchField.value = "";
  } else if (!searchField.value) {
    closeSearch();
  }
});

changelogBtn.addEventListener("click", function () {
  if (changelogSidebar.classList.contains("showSideBar")) {
    changelogSidebar.classList.remove("showSideBar");
    changelogBtn.querySelector("button").innerHTML =
      `<i class="fa fa-info"></i>`;
  } else {
    changelogSidebar.classList.add("showSideBar");
    renderChangeLog();
    changelogBtn.querySelector("button").innerHTML =
      `<i class="fa fa-home"></i>`;
  }
});

function renderChangeLog() {
  document
    .querySelectorAll("aside")
    .forEach((aside) => aside.classList.remove("showSideBar"));

  changelogSidebar.classList.add("showSideBar");

  changeSection.innerHTML = "";
  const reversedChangelog = [...changelog].sort(
    (a, b) => new Date(b.Date) - new Date(a.Date),
  );

  reversedChangelog.forEach((change) => {
    // creating elements
    const changeContainer = document.createElement("div");
    const dateContainer = document.createElement("p");
    const summaryContainer = document.createElement("p");
    const hr = document.createElement("hr");

    // appending elements
    changeSection.appendChild(changeContainer);
    changeContainer.appendChild(dateContainer);
    changeContainer.appendChild(hr);
    changeContainer.appendChild(summaryContainer);

    // assigning attributes
    changeContainer.classList.add("div-section");
    dateContainer.classList.add("changeDate");
    summaryContainer.classList.add("changeSummary");

    // assigning text content
    dateContainer.innerText = `${change.Date}`;
    summaryContainer.innerText = `${change.Summary}`;
  });
}
