// =========================================
// html element to js object
// =========================================

// ======= Buttons ==============
const addButton = document.querySelector(".addBtn");
const floatButton = document.querySelector(".float-container");
const searchBtn = document.querySelector(".searchBtn");
const changelogBtn = document.querySelector(".changelog");
const doDeleteAll = document.querySelector(".bulkDeleteBtn");
const bulkAgreeBtn = document.querySelector(".bulkDeleteAgree");
const bulkDisagreeBtn = document.querySelector(".bulkDeleteDisagree");
const filterViewBtn = document.querySelector(".filterBtn");

// ======= Inputs ==============
const inputField = document.querySelector("#js-input-field");
const dateField = document.querySelector("#js-datePicker");
const assignmentMethod = document.querySelector("#js-task-assignment");
const searchField = document.querySelector(".searchField");
const checkBoxes = document.querySelectorAll(".js-myCheckbox");
const filterInputContainer = document.querySelector(".filter-options");
const filterInput = document.querySelector("#js-filter-options");

// ======= Sidebars / other ==============
const sidebar = document.querySelector(".taskCount");
const changelogSidebar = document.querySelector(".changelog-sidebar");
const tables = document.querySelectorAll("table");
const changeSection = document.querySelector(".change-section");
const backDrop = document.querySelector(".backdropD");

// ======= For event delegation variables ==============
const taskField = document.querySelector("section");
const main = document.querySelectorAll("main");

// ======= Dialogs ==============
const errorDialog = document.querySelector(".no-task-input");
const completeDialog = document.querySelector(".task-completed");
const deleteDialog = document.querySelector(".task-deleted");
const addDialog = document.querySelector(".task-added");
const uncheckedDialog = document.querySelector(".task-unchecked");
const cbTracked = document.querySelector(".task-tracked");
const cbUntracked = document.querySelector(".task-untracked");
const duplicateDialog = document.querySelector(".duplicate");
const bulkDeleteDialog = document.querySelector(".bulkDeleteDialog");
const bulkDeleteSuccessDialog = document.querySelector(".bulkDeleteSuccess");
const bulkDeleteFailDialog = document.querySelector(".bulkDeleteFail");

// =========================================
//  Other
// =========================================

class Task {
  constructor(task, taskAssignment, shiftDate) {
    this.task = task;
    this.taskAssignment = taskAssignment || "Assigned task";
    this.shiftDate = shiftDate || new Date().toISOString().split("T")[0];
    // this.taskNotes = taskNotes;
    this.isCompleted = false;
    this.taskCreateDate = new Date().toISOString().split("T")[0];
    this.uniqueId = Date.now() + Math.random();
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
} // task class blueprint
let tasks = JSON.parse(localStorage.getItem("listOfTasks")) || []; // task storage
const changelog = [
  {
    Date: "April 5, 2026",
    Summary: "Created the initial tracker layout with task-adding support.",
    Changes: [
      "Added add, mark-as-complete, and delete buttons.",
      "Added the addTask function.",
      "Added the taskRendering function.",
    ],
  },
  {
    Date: "April 6, 2026",
    Summary:
      "Added a Task factory, localStorage support, dialog feedback, and Enter-key task submission.",
    Changes: [
      "Added the Task class.",
      "Added JSON saving.",
      "Added dialog popups.",
      "Enabled task creation with the Enter key.",
      "Added the date field.",
    ],
  },
  {
    Date: "April 7, 2026",
    Summary:
      "Added event-based dialogs and reusable handlers, along with delete and update functionality.",
    Changes: [
      "Added the showDialog function.",
      "Added the save function.",
      "Added the deleteTask function.",
      "Added the updateCompleteStatus function.",
    ],
  },
  {
    Date: "April 8, 2026",
    Summary:
      "Added a sidebar that displays task totals by completion status and task assignment.",
    Changes: [
      "Added the task-assignment input.",
      "Added the taskCount function.",
      "Added the updateTaskCount function.",
      "Added the sidebar.",
    ],
  },
  {
    Date: "April 9, 2026",
    Summary:
      "Added tracking checkboxes, refactored the codebase, and moved new tasks to the top of the list.",
    Changes: [
      "Added checkboxes.",
      "Added checkbox dialogs.",
      "Replaced pop() with unshift().",
    ],
  },
  {
    Date: "April 10, 2026",
    Summary:
      "Added duplicate detection, search with not-found feedback, and a changelog for tracking progress. Bug: both sidebars can stay open at the same time.",
    Changes: [
      "Added the duplicate dialog.",
      "Added the duplicateChecker function.",
      "Added the search button.",
      "Added the search field.",
      "Added the createElement function.",
      "Added the itemSearch function.",
      "Added the closeSearch function.",
      "Added the changelog.",
      "Saved the changelog to localStorage.",
    ],
  },
  {
    Date: "April 11, 2026",
    Summary:
      "Fixed the sidebar issue, added bulk delete, refreshed the task cards, introduced slide-in animations for new task, shrink animation for deleted tasks  and added filters for status and task assignment.",
    Changes: [
      "Fixed the sidebar bug.",
      "Added bulkDelete.",
      "Added bulk delete dialogs.",
      "Improved the task list styling.",
      "Refactored parts of the codebase.",
      "Added the filter function.",
      "Refactored the addTask function.",
      "Refactored the taskRendering function.",
      "Refactored the createElement function.",
    ],
  },
  {
    Date: "April 12, 2026",
    Summary:
      "Change the animation for new task to bounce and deleted task to elastic.",
    Changes: [
      "Added bounce animation for new task.",
      "Added elastic animation for deleted task.",
    ],
  },
  {
    Date: "May 8, 2026",
    Summary:
      "Implemented a copy button, improve UI for search button, set default task assigment to 'Assigned Task' and refined the sidebar layout.",
    Changes: [
      "Added copy functionality.",
      "Modified the width of the sidebar from 25vw to 400px.",
      "Set the default task assignment to 'Assigned Task",
      "Improve UI for search button. Can now close the search function by clicking the x button.",
    ],
  },
]; // changelog storage
saveChangelog();
taskRendering(tasks); //Initial rendering of task
updateTaskCount(); // initial rendering of taskCount
let isSearch = false;

// =========================================
//  Functions
// =========================================

// button function
function addTask() {
  if (inputField.value === "") {
    showDialog(errorDialog);
    return;
  }
  const newTask = new Task(
    inputField.value.trim(),
    assignmentMethod.value,
    dateField.value,
  );

  tasks.unshift(newTask);

  const newElement = createElement(newTask);
  newElement.classList.add("new");

  taskField.prepend(newElement);

  showDialog(addDialog);

  // saving to localStorage
  save();

  // clearning input field
  inputField.value = "";
  dateField.value = "";
  assignmentMethod.selectedIndex = 0; // selectedIndex is the method to reset the option of the select element to the first index

  // update task count
  updateTaskCount();
} // Add button
function deleteTask(index, taskItem) {
  // remove the item from the task array
  // Note:for arrow functions, if it is inside a curly braces, put "return", if not, no need to put one.

  // this returns an array wih the removed content
  tasks.splice(index, 1);

  // saving to localStorage
  save();

  //show/remove dialog
  showDialog(deleteDialog);

  // update ui
  // taskRendering(tasks);
  taskItem.classList.add("remove");

  setTimeout(() => {
    taskItem.remove();
  }, 900);

  // taskItem.addEventListener("transitionend", () => {
  //   taskItem.remove();
  // });
  // taskItem.classList.add("remove");
  // Ai suggested this because this is a better approach but it keeps messing up so i am refraining from using it until i understand what this is

  // task count
  updateTaskCount();
} // delete button
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
} // mark as complet button
function itemSearch() {
  if (isSearch) {
    closeSearch();
    searchField.value = "";
    return;
  }
  isSearch = true;

  const searchItem = searchField.value.trim();
  if (!searchItem) return;
  searchBtn.innerHTML = `<i class="fa fa-close"></i>`;
  const result = tasks.filter(
    (item) => item.task.toLowerCase() === searchItem.toLowerCase(),
  );

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
    errorP.textContent = `"${searchItem}" not found`;
  }
} // search button
function collapseSidebar() {
  toggleSidebar(sidebar);
} // open taskcount sidebar button
function renderChangeLog() {
  toggleSidebar(changelogSidebar);

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
} // open change log button
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
} // checkboxes check/uncheck
function bulkDelete() {
  if (tasks.length === 0) {
    closeBulkModal();
    showDialog(bulkDeleteFailDialog);
  } else {
    taskField
      .querySelectorAll(".task-container")
      .forEach((el) => el.classList.add("remove"));
    tasks = [];
    save();
    updateTaskCount();
    closeBulkModal();
    showDialog(bulkDeleteSuccessDialog);
    setTimeout(() => {
      taskRendering(tasks);
    }, 900);
  }
} // deleting all task in the list
function openBulkModal() {
  bulkDeleteDialog.style.opacity = 1;
  bulkDeleteDialog.style.pointerEvents = "auto";
  backDrop.classList.add("active");
} // open the dialog for delete all
function closeBulkModal() {
  bulkDeleteDialog.style.opacity = 0;
  backDrop.classList.remove("active");
} // close the dialog for delete all
function showFilterOptions() {
  const isOpen = filterInputContainer.classList.contains("show");

  if (isOpen) {
    filterInputContainer.classList.remove("show");
    taskRendering(tasks);
    filterInput.selectedIndex = 0;
  } else {
    filterInputContainer.classList.add("show");
  }
} // open the filter
function copyText(text) {
  navigator.clipboard.writeText(text);
} // copy the text

// backend function
function showDialog(dialogType, timer = 3000) {
  document.querySelectorAll(".dialog").forEach((dialog) => {
    dialog.classList.remove("showDialog");
  });

  dialogType.classList.add("showDialog");

  window.setTimeout(() => {
    dialogType.classList.remove("showDialog");
  }, timer);
}
function taskRendering(paramArray) {
  // reseting the task
  taskField.innerHTML = "";
  paramArray.forEach((task) => {
    const el = createElement(task);
    taskField.appendChild(el);
    // // creating elements
    // const taskDiv = document.createElement("div");
    // const taskInfoDiv = document.createElement("div");
    // const taskP = document.createElement("p");
    // const taskCheckBox = document.createElement("input");
    // const taskAssignmentP = document.createElement("p");
    // const taskDateP = document.createElement("p");
    // const taskCompleteBtn = document.createElement("button");
    // const taskDeleteBtn = document.createElement("button");
    // const vr1 = document.createElement("hr");
    // const vr2 = document.createElement("hr");
    // const vr3 = document.createElement("hr");

    // // append
    // taskField.appendChild(taskDiv);
    // taskDiv.appendChild(taskInfoDiv);
    // taskInfoDiv.appendChild(taskP);
    // taskInfoDiv.appendChild(taskAssignmentP);
    // taskDiv.appendChild(vr1);
    // taskDiv.appendChild(taskCheckBox);
    // taskDiv.appendChild(vr2);
    // taskDiv.appendChild(taskDateP);
    // taskDiv.appendChild(vr3);
    // taskDiv.appendChild(taskCompleteBtn);
    // taskDiv.appendChild(taskDeleteBtn);

    // // adding attributes
    // taskDiv.classList.add("task-container");
    // taskDiv.dataset.id = task.uniqueId;
    // taskInfoDiv.classList.add("task-info");
    // taskP.classList.add("task");
    // taskDateP.classList.add("shiftDate");
    // taskAssignmentP.classList.add("task-sub");
    // taskCheckBox.classList.add("js-myCheckbox");
    // taskCheckBox.setAttribute("type", "checkbox");
    // taskCompleteBtn.classList.add("completeBtn");
    // taskCompleteBtn.setAttribute("id", "js-completed-btn");
    // taskDeleteBtn.classList.add("deleteBtn");
    // taskDeleteBtn.setAttribute("id", "js-delete-btn");
    // vr1.classList.add("vr");
    // vr2.classList.add("vr");
    // vr3.classList.add("vr");

    // // assiding values
    // taskP.innerText = task.task;
    // taskAssignmentP.innerText = task.taskAssignment;
    // taskDateP.innerText = task.shiftDate;
    // taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
    // taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;

    // // isCompleted strike-through
    // if (task.isCompleted === true) {
    //   taskP.classList.add("strike");
    //   taskCompleteBtn.innerHTML = `<i class="fa fa-close"></i>`;
    // } else {
    //   taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
    // }
    // // isChecked
    // if (task.isTracked === true) {
    //   taskCheckBox.checked = true;
    // } else {
    //   taskCheckBox.checked = false;
    // }
  });
}
function createElement(object) {
  // creating elements
  const taskDiv = document.createElement("div");
  const taskInfoDiv = document.createElement("div");
  const taskP = document.createElement("p");
  const taskCheckBox = document.createElement("input");
  const taskAssignmentP = document.createElement("p");
  const taskAssignmentPCopyBtn = document.createElement("button");
  const taskAssignmentPCopyBtnIcon = document.createElement("i");
  const taskDateP = document.createElement("p");
  const taskCompleteBtn = document.createElement("button");
  const taskDeleteBtn = document.createElement("button");
  const vr1 = document.createElement("hr");
  const vr2 = document.createElement("hr");
  const vr3 = document.createElement("hr");

  // append
  taskDiv.appendChild(taskInfoDiv);
  taskInfoDiv.appendChild(taskP);
  taskInfoDiv.appendChild(taskAssignmentP);
  taskDiv.appendChild(taskAssignmentPCopyBtn);
  taskAssignmentPCopyBtn.appendChild(taskAssignmentPCopyBtnIcon);
  taskDiv.appendChild(vr1);
  taskDiv.appendChild(taskCheckBox);
  taskDiv.appendChild(vr2);
  taskDiv.appendChild(taskDateP);
  taskDiv.appendChild(vr3);
  taskDiv.appendChild(taskCompleteBtn);
  taskDiv.appendChild(taskDeleteBtn);

  // adding attributes
  taskDiv.classList.add("task-container");
  taskDiv.dataset.id = object.uniqueId;
  taskInfoDiv.classList.add("task-info");
  taskP.classList.add("task");
  taskDateP.classList.add("shiftDate");
  taskAssignmentP.classList.add("task-sub");
  taskCheckBox.classList.add("js-myCheckbox");
  taskCheckBox.setAttribute("type", "checkbox");
  taskAssignmentPCopyBtn.classList.add("copy-Btn");
  taskCompleteBtn.classList.add("completeBtn");
  taskCompleteBtn.setAttribute("id", "js-completed-btn");
  taskDeleteBtn.classList.add("deleteBtn");
  taskDeleteBtn.setAttribute("id", "js-delete-btn");
  vr1.classList.add("vr");
  vr2.classList.add("vr");
  vr3.classList.add("vr");

  // assiding values
  taskP.innerText = object.task;
  taskAssignmentP.innerText = object.taskAssignment || "Assigned task";
  taskAssignmentPCopyBtnIcon.innerHTML = `<i class="fa fa-copy"></i>`;
  taskDateP.innerText = object.shiftDate;
  taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
  taskDeleteBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;

  // isCompleted strike-through
  if (object.isCompleted === true) {
    taskP.classList.add("strike");
    taskCompleteBtn.innerHTML = `<i class="fa fa-close"></i>`;
  } else {
    taskCompleteBtn.innerHTML = `<i class="fa fa-check"></i>`;
  }
  // isChecked
  if (object.isTracked === true) {
    taskCheckBox.checked = true;
  } else {
    taskCheckBox.checked = false;
  }
  // if (isNew) {
  //   taskDiv.classList.add("new");
  // }

  return taskDiv; //because all the elements are in this div. It is like the final product fully assembled
}
function save() {
  localStorage.setItem("listOfTasks", JSON.stringify(tasks));
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
    "taskAssignment",
    "Assigned task",
  );
  tables[1].querySelector(".js-grabbed").innerText = countTask(
    tasks,
    "taskAssignment",
    "Grabbed task",
  );
  tables[1].querySelector(".js-previously").innerText = countTask(
    tasks,
    "taskAssignment",
    "Previously worked on",
  );
  tables[1].querySelector(".js-endorsed").innerText = countTask(
    tasks,
    "taskAssignment",
    "Endorsed to me",
  );
  tables[1].querySelector(".js-none").innerText = countTask(
    tasks,
    "taskAssignment",
    "-",
    ``,
  );
}
function duplicateChecker() {
  const isDuplicate = tasks.some(
    (item) => item.task.toLowerCase() === inputField.value.trim().toLowerCase(),
    // Ai suggested to add .toLowerCase() for case-sensitive searches
    // I added toLowerCase at the end to complete the comparison.
  );
  if (isDuplicate) {
    showDialog(duplicateDialog);
    inputField.value = "";
  } else {
    addTask();
  }
}
function closeSearch() {
  searchBtn.innerHTML = `<i class="fa fa-search"></i>`;
  taskRendering(tasks);
}
function saveChangelog() {
  localStorage.setItem("changelog", JSON.stringify(changelog));
}
function resetSidebar() {
  document
    .querySelectorAll(".sidebar")
    .forEach((aside) => aside.classList.remove("showSideBar"));
}
function toggleSidebar(targetSidebar) {
  const isOpen = targetSidebar.classList.contains("showSideBar");

  resetSidebar();

  if (!isOpen) {
    targetSidebar.classList.add("showSideBar");
  }
}
function filterArray(paramArray, filterBy, filterValue) {
  const filteredArray = paramArray.filter(
    (item) => item[filterBy] === filterValue,
  );

  if (filteredArray.length === 0) {
    taskField.innerHTML = `<p class='errorFormat'>No results found<p>`;
    return;
  }

  taskRendering(filteredArray);
}
function showCopySuccess(element, text) {
  navigator.clipboard.writeText(text);
  element.innerHTML = `<i class="fa fa-check"></i>`;
  setTimeout(() => {
    element.innerHTML = `<i class="fa fa-copy"></i>`;
  }, 1500);
}

// =============================================
// Adding button events
// =============================================

// button
addButton.addEventListener("click", duplicateChecker);
floatButton.addEventListener("click", collapseSidebar);
searchBtn.addEventListener("click", itemSearch);
changelogBtn.addEventListener("click", renderChangeLog);
doDeleteAll.addEventListener("click", openBulkModal);
bulkAgreeBtn.addEventListener("click", bulkDelete);
bulkDisagreeBtn.addEventListener("click", closeBulkModal);
filterViewBtn.addEventListener("click", showFilterOptions);
filterInput.addEventListener("change", (e) => {
  const selectedOption = e.target.value;

  switch (selectedOption) {
    case "isCompletedTrue":
      filterArray(tasks, "isCompleted", true);
      break;
    case "isCompletedFalse":
      filterArray(tasks, "isCompleted", false);
      break;
    case "isTrackedTrue":
      filterArray(tasks, "isTracked", true);
      break;
    case "assigned":
      filterArray(tasks, "taskAssignment", "Assigned task");
      break;
    case "grabbed":
      filterArray(tasks, "taskAssignment", "Grabbed task");
      break;
    case "previously-worked":
      filterArray(tasks, "taskAssignment", "Previously worked on");
      break;
    case "endorsed":
      filterArray(tasks, "taskAssignment", "Endorsed to me");
      break;
    case "no-tag":
      filterArray(tasks, "taskAssignment", "-");
      break;
    default:
      console.log("None selected");
  }
});

// event delegation / other
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
  const copyBtn = targetBtn.closest(".copy-Btn");
  const deleteBtn = targetBtn.closest(".deleteBtn");
  const completeBtn = targetBtn.closest(".completeBtn");
  const targetCB = targetBtn.matches(".js-myCheckbox");

  if (!deleteBtn && !completeBtn && !targetCB && !copyBtn) return;

  const targetBtnDiv = e.target.closest(".task-container");
  const taskName = targetBtnDiv.querySelector(".task");
  const taskDataSetId = Number(targetBtnDiv.dataset.id);

  // the index of the object related to the button.
  const index = tasks.findIndex((item) => item.uniqueId === taskDataSetId);

  if (deleteBtn) {
    deleteTask(index, targetBtnDiv);
  } else if (completeBtn) {
    updateCompleteStatus(index, taskName, completeBtn);
  } else if (targetCB) {
    updateTrackerStatus(index, targetBtn);
  } else if (copyBtn) {
    const targetText = copyBtn.parentElement.querySelector(".task").textContent; // needs to be inside for proper deletion
    showCopySuccess(copyBtn, targetText);
  }
});
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
