// TASKS PAGE SCRIPTING

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("currentTaskList");

// LOAD TASKS FROM LOCAL STORAGE
const taskItems = JSON.parse(localStorage.getItem("tasks")) || []; {
    renderTasks();
};

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
        let li = document.createElement("li");
        li.textContent = item;

        const removeUserBtn = document.createElement("button");
        removeUserBtn.textContent = "❌";

        removeUserBtn.addEventListener("click", () => {
            taskItems.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(taskItems));
            renderTasks();
        });

        li.appendChild(removeUserBtn);
        taskList.appendChild(li);
    })
};