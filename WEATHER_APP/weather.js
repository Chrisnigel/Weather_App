const API_KEY = "enter_your_api_key"; // Replace with your OpenWeatherMap API Key

document.addEventListener("DOMContentLoaded", function () {
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    getWeatherBtn.addEventListener("click", getWeather);
});

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or API request failed.");
            }
            return response.json();
        })
        .then(data => {
            // Populate weather details
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weatherResult").classList.remove("hidden");
        })
        .catch(error => {
            alert(error.message || "Error fetching weather data. Please try again.");
        });
}
