const addTaskButton = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#task-container");

const allEvents = () => {};

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
  taskItem.appendChild(document.createTextNode(taskText));

  const deleteButton = document.createElement("span");
  deleteButton.innerText = "\u00d7";
  deleteButton.addEventListener("click", removeItem);

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  taskList.addEventListener("click", toggleComplete);

  taskInput.value = "";
  taskInput.focus();
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    renderTaskItem(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
  }
};
addTaskButton.addEventListener("click", addTask);

// Function for saving task to localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
document.addEventListener("DOMContentLoaded", loadTasks);

// localStorage update function
const updateLocalStorage = () => {
  const taskItems = Array.from(taskList.children);
  console.log(taskItems);
  const tasks = taskItems.map((item) => item.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
