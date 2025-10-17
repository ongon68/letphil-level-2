// TASKS PAGE SCRIPTING

// --- Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const lists = {
  pending: document.getElementById("pendingTaskList"),
  low: document.getElementById("lowPriorityTasks"),
  mid: document.getElementById("midPriorityTasks"),
  high: document.getElementById("highPriorityTasks"),
  completed: document.getElementById("completedTaskList")
};

// --- Data model: each task is { id: string, text: string }
const STORAGE_KEY = "taskData";
let taskData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  pending: [],
  low: [],
  mid: [],
  high: [],
  completed: []
};

// --- Helpers
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskData));
}

function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

// Creates an <li> element for a task object and wires listeners
function createTaskElement(taskObj, listName) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = taskObj.id;
  li.dataset.list = listName;
  li.setAttribute("draggable", "true");

  // content span (so text is separate from button)
  const span = document.createElement("span");
  span.textContent = taskObj.text;
  span.style.marginRight = "10px";
  li.appendChild(span);

  // remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.title = "Remove task";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeTaskById(taskObj.id);
  });
  li.appendChild(removeBtn);

  // drag handlers
  li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: taskObj.id, from: listName }));
    // show that it's being dragged
    setTimeout(() => li.style.display = "none", 0);
  });

  li.addEventListener("dragend", () => {
    // restore display after drag
    li.style.display = "block";
  });

  return li;
}

// Remove task by id from whichever list it's in
function removeTaskById(id) {
  for (const key of Object.keys(taskData)) {
    const idx = taskData[key].findIndex(t => t.id === id);
    if (idx !== -1) {
      taskData[key].splice(idx, 1);
      saveData();
      renderAll();
      return;
    }
  }
}

// Render all lists from the model
function renderAll() {
  // clear all lists
  for (const key of Object.keys(lists)) {
    lists[key].innerHTML = "";
  }

  // append each task
  for (const key of Object.keys(taskData)) {
    taskData[key].forEach(taskObj => {
      const li = createTaskElement(taskObj, key);
      lists[key].appendChild(li);
    });
  }

  // ensure drop listeners present after render
  enableDropZones();
}

// --- Add Task
addTaskBtn.addEventListener("click", () => {
  const raw = taskInput.value.trim();
  if (!raw) {
    alert("Please enter a task.");
    return;
  }
  const newTask = { id: makeId(), text: raw };
  taskData.pending.push(newTask);
  saveData();
  renderAll();
  taskInput.value = "";
});

// --- Drag & Drop for lists
function enableDropZones() {
  Object.values(lists).forEach(ul => {
    // dragover to allow drop
    ul.addEventListener("dragover", (e) => {
      e.preventDefault();
      ul.classList.add("drag-over");
    });

    ul.addEventListener("dragleave", () => {
      ul.classList.remove("drag-over");
    });

    ul.addEventListener("drop", (e) => {
      e.preventDefault();
      ul.classList.remove("drag-over");
      const raw = e.dataTransfer.getData("text/plain");
      if (!raw) return;

      let payload;
      try {
        payload = JSON.parse(raw);
      } catch {
        return;
      }
      const { id, from } = payload;
      const targetListName = getListNameFromElement(ul);
      if (!targetListName) return;

      // If dropping back into same list, do nothing
      if (from === targetListName) {
        // ensure the element is visible again (dragend might not fire)
        renderAll();
        return;
      }

      // find and move the task object in the model
      const fromArr = taskData[from];
      if (!fromArr) return;
      const idx = fromArr.findIndex(t => t.id === id);
      if (idx === -1) return;
      const [taskObj] = fromArr.splice(idx, 1);
      taskData[targetListName].push(taskObj);

      saveData();
      renderAll();
    });
  });
}

// utility: given a UL element, return its name in the model
function getListNameFromElement(ul) {
  if (ul === lists.pending) return "pending";
  if (ul === lists.low) return "low";
  if (ul === lists.mid) return "mid";
  if (ul === lists.high) return "high";
  if (ul === lists.completed) return "completed";
  return null;
}

// init
renderAll();

// Optional: expose a quick keyboard-friendly way to add a task by pressing Enter
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});




// // TASKS PAGE SCRIPTING

// const taskInput = document.getElementById("taskInput");
// const addTaskBtn = document.getElementById("addTaskBtn");
// const taskList = document.getElementById("pendingTaskList");

// // LOAD TASKS FROM LOCAL STORAGE
// const taskItems = JSON.parse(localStorage.getItem("tasks")) || []; {
//     renderTasks();
// };

// // ADD TASK
// addTaskBtn.addEventListener("click", () => {
//     const taskString = taskInput.value.trim() + " ";

//     if(!taskString) {
//         alert("Please enter a task.");
//     }

//     taskItems.push(taskString);
//     localStorage.setItem("tasks", JSON.stringify(taskItems));
//     renderTasks();
//     taskInput.value = "";
// });

// // RENDER TASKS
// function renderTasks() {
//     taskList.innerHTML = "";

//     taskItems.forEach((item, index) => {
//         let li = document.createElement("li");
//         li.textContent = item;

//         const removeUserBtn = document.createElement("button");
//         removeUserBtn.textContent = "❌";

//         removeUserBtn.addEventListener("click", () => {
//             taskItems.splice(index, 1);
//             localStorage.setItem("tasks", JSON.stringify(taskItems));
//             renderTasks();
//         });

//         li.appendChild(removeUserBtn);
//         taskList.appendChild(li);
//     });
// };


// /* ------------------------
// Drag and Drop scripting
// ------------------------ */

// // Get all task lists
// const taskLists = document.querySelectorAll(".taskList");

// // Handle the element currently being dragged
// let draggedItem = null;

// // Make existing and new list items draggable
// function enableDragAndDrop() {
//     const allTasks = document.querySelectorAll(".taskList li");

//     allTasks.forEach(task => {
//         task.setAttribute("draggable", true);

//         // When drag starts
//         task.addEventListener("dragstart", (e) => {
//             draggedItem = task;
//             setTimeout(() => task.style.display = "none", 0);
//         });

//         // When drag ends
//         task.addEventListener("dragend", (e) => {
//             setTimeout(() => {
//                 task.style.display = "block";
//                 draggedItem = null;
//             }, 0);
//         });
//     });

//     // For each list, set up drop zones
//     taskLists.forEach(list => {
//         // Allow dropping by preventing default
//         list.addEventListener("dragover", (e) => {
//             e.preventDefault();
//             list.classList.add("drag-over");
//         });

//         // Remove highlight when leaving the area
//         list.addEventListener("dragleave", () => {
//             list.classList.remove("drag-over");
//         });

//         // When dropped
//         list.addEventListener("drop", () => {
//             list.classList.remove("drag-over");
//             if (draggedItem) {
//                 list.appendChild(draggedItem);
//                 saveAllLists(); // optional: persist tasks if you want
//             }
//         });
//     });
// }

// // Save all lists back to localStorage (optional)
// function saveAllLists() {
//     const allData = {
//         pending: Array.from(document.querySelectorAll("#pendingTaskList li")).map(li => li.firstChild.textContent.trim()),
//         low: Array.from(document.querySelectorAll("#lowPriorityTasks li")).map(li => li.firstChild.textContent.trim()),
//         mid: Array.from(document.querySelectorAll("#midPriorityTasks li")).map(li => li.firstChild.textContent.trim()),
//         high: Array.from(document.querySelectorAll("#highPriorityTasks li")).map(li => li.firstChild.textContent.trim()),
//         completed: Array.from(document.querySelectorAll("#completedTaskList li")).map(li => li.firstChild.textContent.trim())
//     };
//     localStorage.setItem("taskData", JSON.stringify(allData));
// }

// // Enable drag and drop once tasks are rendered
// enableDragAndDrop();

// // Also call it again after rendering tasks dynamically
// const originalRenderTasks = renderTasks;
// renderTasks = function() {
//     originalRenderTasks();
//     enableDragAndDrop();
// };


// // enableDragAndDrop(taskList, taskItems, () => {
// //     localStorage.setItem("tasks", JSON.stringify(taskItems));
// //     renderTasks();
// // });

// // function enableDragAndDrop(listEl, itemsArray, onChange) {
// //     listEl.addEventListener("dragover", (e) => e.prventDefault());

// //     listEl.addEventListener("drop", (e) => {
// //         e.prventDefault();
// //         const from = Number(e.dataTransfer.getData("text/plain"));
// //         const to = [...listEl.children].indexOf(e.target.closest("li"));

// //         if (Number.isNaN(from) || to < 0 || from === to) return;

// //         const [moved] = itemsArray.splice(from, 1);
// //         itemsArray.splice(to, 0, moved);
// //         onChange?.();
// //     });

// //     const markDraggable = () => {
// //         [...listEl.children].forEach((li, idx) => {
// //             li.draggable = true;

// //             li.addEventListener("dragstart", (e) => {
// //                 e.dataTransfer.setData("text/plain", String(idx));
// //             });

// //             li.addEventListener("dragenter", () => li.classList.add("drag-over"));
// //             li.addEventListener("dragleave", () => li.classList.remove("drag-over"));
// //             li.addEventListener("drop", () => li.classList.remove("drag-over"));
// //         });
// //     };

// //     const observer = new MutationObserver(markDraggable);
// //     observer.observe(listEl, {childList: true});
// //     markDraggable();
// // }