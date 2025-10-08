// HOME PAGE SCRIPTING

document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessageByTime = document.getElementById("welcomeMessageByTime");
    const timeOfDay = document.getElementById("currentLocalTime");
    const homePageImage = document.querySelector(".homePageImage");
    const homePagetext = document.querySelector(".homePageText");

    // Greetings by time
    function localTimeGreeting(hour) {
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        }
        else if (hour >= 12 && hour < 17) {
            return "Good afternoon";
        }
        else if (hour >= 17 && hour < 21) {
            return "Good evening";
        }
        else {
            return "Good night";
        }
    }

    // Background by time
    function backgroundByTime(hour) {
        if (hour >= 5 && hour < 12) {
            return "url(https://images.pexels.com/photos/29641463/pexels-photo-29641463.jpeg)";
        }
        else if (hour >= 12 && hour < 17) {
            return "url(https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg)";
        }
        else if (hour >= 17 && hour < 21) {
            return "url(https://images.pexels.com/photos/29893940/pexels-photo-29893940.jpeg)";
        }
        else {
            return "url(https://images.pexels.com/photos/15191505/pexels-photo-15191505.jpeg)";
        }
    }

    function updateTime() {
        const hour = new Date().getHours();
        const greetingText = localTimeGreeting(hour);
        welcomeMessageByTime.textContent = greetingText;
        homePageImage.style.backgroundImage = backgroundByTime(hour);
        timeOfDay.textContent = `The current local time is: ${new Date().toLocaleTimeString()}`;
    }

    updateTime();

    setInterval(updateTime, 1000);
});


// WEATHER PAGE SCRIPTING

const locationInput = document.getElementById("locationInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");

// API INFO URL https://api.openweathermap.org/data/2.5/weather?q={city}&appid=f30f8a7c50af2832bfbcab966c2b9f99

getWeatherBtn.addEventListener("click", async () => {
    try {
        const locationInputName = locationInput.value.trim();
        console.log(locationInputName);

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInputName}&appid=f30f8a7c50af2832bfbcab966c2b9f99`
        console.log(weatherUrl)
        
        const weatherResponse = await axios.get(weatherUrl);
        console.log(weatherResponse); // error here, no idea why

        const data = weatherResponse.data[0];
        const locationWeather = data.main.temp;

        weatherDisplay.innerHTML = `<h2>${locationWeather.toUpperCase()}<h2>`;
    }
    catch (error) {
        weatherDisplay.innerHTML = `<p>Failed to load location weather</p>`
    }
})



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



// NOTES PAGE SCRITPING