function displayTemperature(response) {
  let description = document.querySelector("#description");
  let temperature = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#wind-speed");
  let currentDateELement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperature.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windspeed.innerHTML = `${response.data.wind.speed}k/h`;
  currentDateELement.innerHTML = formatDate(date) + ",";
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}

function citys(event) {
  event.preventDefault();

  let h1 = document.querySelector("#current-city");
  let searchinput = document.querySelector("#search-input");
  let apiKey = "42205924203081247ba4o2b1310et7f4";
  let city = searchinput.value;
  h1.innerHTML = city;
  let Urlapi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(Urlapi).then(displayTemperature);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", citys);

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

function getForecast(city) {
  let apiKey = "42205924203081247ba4o2b1310et7f4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div >${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
        <img src ="${day.condition.icon_url}"class="weather-forecast-date"/>
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
