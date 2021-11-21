let apiKey = "a3884259e65dd8019ea13ff5e3dffbcf";
let input = document.querySelector("#inlineFormInputGroupUsername");
let searchLocation = document.querySelector("#location");
let temperatureElement = document.querySelector("#temp");
let tempDescription = document.querySelector("#temp-description");

let enterLocation = document.querySelector("#search-form");
enterLocation.addEventListener("submit", locationSubmit);

let gpsLocation = document.querySelector("#current-location-input");
gpsLocation.addEventListener("click", getPosition);

let farenheit = document.querySelector("#unitFar");
farenheit.addEventListener("click", convertToFarenheit);
let celcius = document.querySelector("#unitCel");
celcius.addEventListener("click", convertToCelcius);

let daysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let date = [now.getDate()];
let monthFull = monthsFull[now.getMonth()];
let dayFull = daysFull[now.getDay()];
let hours = [now.getHours()];
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = [now.getMinutes()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = now.toLocaleTimeString();
let todayDate = document.querySelector("h1");
todayDate.innerHTML = `${date}`;
let month = document.querySelector("h2");
month.innerHTML = `${monthFull}`;
let day = document.querySelector("h3");
day.innerHTML = `${dayFull} ${hours}:${minutes}`;

navigator.geolocation.getCurrentPosition(showPosition);

//Show temperature
function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  tempDescription.innerHTML = response.data.weather[0].description;
}
//Convert temperatures
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innterHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 89;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innterHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 32;
}

//based on searching/submitting for location/city
function locationSubmit(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
  searchLocation.innerHTML = `${input.value}`;
}

//Based on GPS coordinates/location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let gpsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let nameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  axios.get(`${gpsUrl}`).then(showTemp);
  axios.get(`${nameUrl}`).then(showName);
  function showName(response) {
    console.log(response.data);
    let cityName = response.data[0].name;
    let countryName = response.data[0].country;
    searchLocation.innerHTML = `${cityName}, ${countryName}`;
  }
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  document.getElementById("inlineFormInputGroupUsername").value = "";
}
