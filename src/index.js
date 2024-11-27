function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
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

let now = new Date();
let datetime = document.querySelector("#date-time");
datetime.innerHTML = now;
