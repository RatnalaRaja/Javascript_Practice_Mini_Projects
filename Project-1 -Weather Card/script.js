const apikey = "356359179c41298b5b7295562cff7f56";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherico = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

     
        if (data.name && data.main && data.weather) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

         
            if (data.wind && data.wind.speed !== undefined) {
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
            } else {
                document.querySelector(".wind").innerHTML = "N/A";
            }

           
            if (data.weather[0].main === 'Clouds') {
                weatherico.src = "images/Clouds.png";
            } else if (data.weather[0].main === 'Clear') {
                weatherico.src = "images/clear.png";
            } else if (data.weather[0].main === 'Rain') {
                weatherico.src = "images/rain.png";
            } else if (data.weather[0].main === 'Mist') {
                weatherico.src = "images/mist.png";
            } else if (data.weather[0].main === 'Drizzle') {
                weatherico.src = "images/drizzle.png";
            }

            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
        } else {
            throw new Error("Unexpected response structure");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});
