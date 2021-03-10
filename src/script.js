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
    let temperature = Math.round(response.data.main.temp);
    let tempDisplay = document.querySelector("#mainNumber");
    tempDisplay.innerHTML = temperature;
    let cityName = document.querySelector(".city");
    cityName.innerHTML = response.data.name;
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
  function changeToFahrenheit(event) {
    let tempC = document.querySelector("#mainNumber");
    let tempF = Math.round(tempC.textContent * (9 / 5) + 32);
    unit.text = `${tempF} °F`;
  }

  unit.addEventListener("click", changeToFahrenheit);


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
  