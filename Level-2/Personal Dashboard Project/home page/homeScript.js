document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessageByTime = document.getElementById("welcomeMessageByTime");
    const timeOfDay = document.getElementById("currentLocalTime");
    const homePageImage = document.querySelector(".homePageImage");

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