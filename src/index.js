function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current) + "°C";
}

function citys(event) {
  event.preventDefault();

  let h1 = document.querySelector("#city");
  let enterCity = document.querySelector("#enterCity");
  let apiKey = "42205924203081247ba4o2b1310et7f4";
  let city = enterCity.value;
  let Urlapi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(Urlapi).then(displayTemperature);
  h1.innerHTML = city;
}
let searching = document.querySelector("#searching");
searching.addEventListener("submit", citys);

let now = new Date();
let datetime = document.querySelector("#date-time");
datetime.innerHTML = now;
