//DATE&TIME
let now = new Date();
let minutes = now.getMinutes();
let hour = now.getHours();
let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let h4 = document.querySelector('h4');
h4.innerHTML = `${weekDay[now.getDay()]}, ${hour}:${minutes}`;

//CITY&SEARCHING
let unit = document.querySelector("#unitC");


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



  //this is to change units from Celcius to Fahrenheit
  /*function changeToFahrenheit(event) {
    let tempC = document.querySelector("#mainNumber");
    let tempF = Math.round(tempC.textContent * (9 / 5) + 32);
    unit.text = `${tempF} °F`;
  }

  unit.addEventListener("click", changeToFahrenheit);*/

  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#mainNumber");
  
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  }
  
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#mainNumber");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  


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
  