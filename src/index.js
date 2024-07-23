function newCityWeather(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity-level");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let iconElement = document.querySelector("#temp-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "1d99d901f34da597o23a408fbateb9dc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(newCityWeather);
}
function getCityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="forecast-day">
            <div class="forecast-date">${day}</div>
            <div class="forecast-icon">⛈️</div>
            <div class="forecast-temps">
              <div class="forecast-temp"><strong>15°</strong></div>
              <div class="forecast-temp">12°</div>
            </div>
          </div>`;
  });
  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getCityInput);
searchCity("Kinshasa");
displayForecast();
