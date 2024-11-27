function displayTemperature(response) {
  let description = document.querySelector("#description");
  let temperature = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#wind-speed");
  let currentDateELement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  temperature.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windspeed.innerHTML = `${response.data.wind.speed}k/h`;
  currentDateELement.innerHTML = formatDate(date);
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
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
