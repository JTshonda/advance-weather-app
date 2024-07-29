function searchCity(city) {
  let apiKey = "1d99d901f34da597o23a408fbateb9dc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newCityWeather);
}

function newCityWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let description = document.querySelector("#temp-description");
  let humidity = document.querySelector("#humidity-level");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#temp-icon");
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
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
    "Saturday"
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getCityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "1d99d901f34da597o23a408fbateb9dc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temps">
          <div class="forecast-temp">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="forecast-temp">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getCityInput);

searchCity("Kinshasa");
