//DATE&TIME
let now = new Date();
let minutes = now.getMinutes();
let hour = now.getHours();
let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let h4 = document.querySelector('h4');
h4.innerHTML = `${weekDay[now.getDay()]}, ${hour}:${minutes}`;

//this is to change and show the temperature and the name of the city
function showTempAndName(response) {
    let tempDisplay = document.querySelector("#mainNumber");
    let cityName = document.querySelector(".city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let temperature = Math.round(response.data.main.temp);
  
    tempDisplay.innerHTML = temperature;
    cityName.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      'http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png'
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "d34052a4c2a560f7da6f367f25941f71";
  let searchInput = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempAndName);
}

searchCity("Seoul");

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input").value;
    searchCity(searchInput);
  }

let form = document.querySelector("#searchEngine");
form.addEventListener("submit", handleSubmit);

let tempElement = document.querySelector("#mainNumber");
  //this is to change units from Celsius to Fahrenheit
function changeToFahrenheit(event) {
    event.preventDefault();
    let tempF = Math.round(tempC.textContent * (9 / 5) + 32);
    tempElement.innerHTML = tempF;
  }

  let letterF = document.querySelector("#fahrenheit-link")
  letterF.addEventListener("click", changeToFahrenheit);
  
function changeToCelsius(event) {
    event.preventDefault();
    let tempC = Math.round((tempF.textContent - 32) * (5/9));
    tempElement.innerHTML = tempC;
  }

  let letterC = document.querySelector("#celcius-link");
  letterC.addEventListener("click", changeToCelsius);

  //this is to locate by geolocation
  function searchLocation(position) {
    let apiKey = "d34052a4c2a560f7da6f367f25941f71";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    
    axios.get(apiUrl).then(showTempAndName);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
    }

  
  let locate = document.querySelector("#current");
  locate.addEventListener("click", getCurrentLocation);
  