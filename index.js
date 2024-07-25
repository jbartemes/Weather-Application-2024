//Capability to refresh the weather elements
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#weather-humidity");
  let windElement = document.querySelector("#weather-wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = toTitleCase(
    response.data.condition.description
  );
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed}mph`;
  timeElement.innerHTML = `| ${formatDate(date)}`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;

  getForecast(response.data.city);
}

function toTitleCase(string) {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//Weather City and Date header
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  //make API call and update the interface
  let apiKey = `ft4830boc9b9a345e3ffa44748c5cd48`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(refreshWeather);
}
function getForecast(city) {
  let apiKey = `ft4830boc9b9a345e3ffa44748c5cd48`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-high">${Math.round(
              day.temperature.maximum
            )}°</div>
            <div class="weather-forecast-low">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

//City Search Engine Function
//SheCodes API
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity(`Paris`);
//Weather Form API - Descriptions
