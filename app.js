const addTaskButton = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#task-container");

document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

const toggleComplete = (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    updateLocalStorage();
  }
};
const removeItem = (event) => {
  taskList.removeChild(event.currentTarget.parentElement);
  updateLocalStorage();
};

const renderTaskItem = (taskText) => {
  const taskItem = document.createElement("li");
  taskItem.innerText = taskText;
  taskList.appendChild(taskItem);
  taskList.addEventListener("click", toggleComplete);

  const deleteButton = document.createElement("span");
  deleteButton.innerText = "\u00d7";
  deleteButton.addEventListener("click", removeItem);
  taskItem.appendChild(deleteButton);

  taskInput.value = "";
  taskInput.focus();

  updateLocalStorage();
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    renderTaskItem(taskText);
    taskInput.value = "";
  }
};
addTaskButton.addEventListener("click", addTask);

// Function to fetch tasks from localStorage
const getTasksFromLocalStorage = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
};

// Function to load tasks from localStorage
const loadTasks = () => {
  let storedTasks = getTasksFromLocalStorage();
  storedTasks.forEach((taskText) => {
    renderTaskItem(taskText);
  });
};

// localStorage update function
const updateLocalStorage = () => {
  const taskItems = Array.from(taskList.children);
  const tasks = taskItems.map((item) => item.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
