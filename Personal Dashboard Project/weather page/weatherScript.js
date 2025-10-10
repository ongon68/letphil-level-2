const locationInput = document.getElementById("locationInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const weekWeather = document.getElementById("weekWeather");

// API INFO URL https://api.openweathermap.org/data/2.5/weather?q={city}&appid=f30f8a7c50af2832bfbcab966c2b9f99

getWeatherBtn.addEventListener("click", async () => {
    const locationInputName = locationInput.value.toLowerCase().trim();
    const key = "f30f8a7c50af2832bfbcab966c2b9f99";
    const dayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInputName}&appid=${key}&units=metric`
    const weekUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInputName}&appid=${key}&units=metric`

    try {
        const response = await fetch(dayUrl);
        console.log(response);

        if (!response.ok) throw new Error("Failed to get location data");

        const data = await response.json();
        console.log(data);

        const weatherText = data.weather[0].main;
        const weatherImg = data.weather[0].icon;
        const temp = data.main.temp;
        const locationName = data.name;

        weatherDisplay.innerHTML = `<h2>${weatherText} in ${locationName}</h2>
        <img src="http://openweathermap.org/img/w/${weatherImg}.png" alt="there should be an image here"></img>
        <h3>The outside temperature is ${temp} °C</h3>`;
    }
    catch (error) {
        weatherDisplay.innerHTML = `<p>Failed to load location weather</p>`
    }

    try {
        weekWeather.innerHTML = "";
        const response = await fetch(weekUrl);
        console.log(response);

        if (!response.ok) throw new Error("Failed to load weekly forcast 1");

        const data = await response.json();
        console.log(data);

        for (let i = 0; i < 33; i += 8) {
            let weatherText = data.list[i].weather[0].main;
            let img = data.list[i].weather[0].icon;
            let temp = data.list[i].main.temp;
            let day = data.list[i].dt_txt;

            let newListItem = document.createElement("li");
            newListItem.innerHTML = `<h2>${day}</h2>
            <h3>${weatherText}</h3>
            <img src="http://openweathermap.org/img/w/${img}.png" alt="where img??"></img>
            <h3>${temp} °C</h3>`;

            weekWeather.appendChild(newListItem);
        }
    }
    catch (error) {
        weekWeather.innerHTML = `<p>Failed to load weekly forcast 2</p>`
    }
});