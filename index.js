//City Search Engine Function
//SheCodes API
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  // let dayElement = document.querySelector("#");
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//Weather Form API - Descriptions
function weatherForm(response) {
  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.description;
  descriptionElement.innerHTML = description;

  let apiKey = "ft4830boc9b9a345e3ffa44748c5cd48";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={Paris}&key=${apiKey}`;

  Axios.get(apiUrl).then(displayWeather);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", weatherForm);
//weather-app-temperature

//weather-description
//weather-humidity
//weather-wind-speed

//let cityElement = document.querySelector("#current-location");
//let city = response.data.city;
// cityElement.innerHTML = city;
