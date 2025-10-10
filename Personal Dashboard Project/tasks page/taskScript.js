// TASKS PAGE SCRIPTING

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// LOAD TASKS FROM LOCAL STORAGE
const taskItems = JSON.parse(localStorage.getItem("tasks")) || []; {
    renderTasks();
}

// ADD TASK
addTaskBtn.addEventListener("click", () => {
    const taskString = taskInput.value.trim() + " ";
    taskItems.push(taskString);
    localStorage.setItem("tasks", JSON.stringify(taskItems));
    renderTasks();
    taskInput.value = "";
});

// RENDER TASKS
function renderTasks() {
    taskList.innerHTML = "";
    taskItems.forEach((item, index) => {
        const newListItem = document.createElement("li");
        newListItem.textContent = item;

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.textContent = "❌";
        removeTaskBtn.addEventListener("click", () => {
            taskItems.splice(index, 1);
            localStorage.setItem("item", JSON.stringify(item));
            renderTasks();
        });
        newListItem.appendChild(removeTaskBtn);
        taskList.appendChild(newListItem);
    });
}