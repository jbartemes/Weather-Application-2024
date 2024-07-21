function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#weather-wind-speed");
  windElement.innerHTML = `Wind: ${response.data.wind.speed}mph`;
}

function searchCity(city) {
  //make API call and update the interface
  let apiKey = `ft4830boc9b9a345e3ffa44748c5cd48`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(refreshWeather);
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

//Weather Form API - Descriptions
//function weatherForm(response) {
//let descriptionElement = document.querySelector("#weather-description");
//let description = response.data.description;
//descriptionElement.innerHTML = description;
//}

//let city = document.querySelector("#search-form");
//city.addEventListener("submit", weatherForm);

//weather-app-temperature

//weather-description
//weather-humidity
//weather-wind-speed

//let cityElement = document.querySelector("#current-location");
//let city = response.data.city;
// cityElement.innerHTML = city;
