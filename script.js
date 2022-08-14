// api URL example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30d6578d03fd53edd07b515697cb941a

let queryFormEl = document.querySelector('#search-form');
let queryInputEl = document.querySelector('#search-input');
let weatherResultsEl = document.querySelector('#current-conditions-container');
let query = document.querySelector("#search-input").value;
let userInputEl = document.querySelector('#searched-city');
let searchHistoryBtnsEl = document.querySelector('#search-history-buttons');
let forecastResultsEl = document.querySelector('#fiver-container');
// modal declarations
let modal = document.getElementById('myModal');
let submitBtn = document.getElementById('submit-query');
let closingSpan = document.getElementsByClassName('close')[0];
const oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const apiKey = '30d6578d03fd53edd07b515697cb941a';
let history = JSON.parse(localStorage.getItem('query')) || [];
console.log(history);
const searchHistory = document.getElementById('search-history-buttons');


// click handler function with modal:
function buttonClickHandler(event) {
    event.preventDefault();

    var query = document.querySelector("#search-input").value.trim();

    if (!query) {
        //Modal variables at top
        console.error('do the thing');
        modal.style.display = 'block';
        return;
    } else {
        getWeatherResults(query);
        //getFiver(query);
        queryInputEl.value = '';
    }
    saveSearch();
}
 // modal close fn
var closeBtnClkHandler = function() {
    modal.style.display = 'none';
    
}
// modal close fn
var clickOffCloseModal = function(event) {
    if (event.target == modal) {
            modal.style.display = 'none';
    }
        
}

var saveSearch = function () {
    localStorage.setItem('history', JSON.stringify(history));
} 

var getLatLon = function(query) {
    
    fetch(geocodeApiUrl + query + '&limit=3&appid=' + apiKey)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            return response.json();
        }})
    
        .then(function (data) {
            console.log(data);
        })
        var lat = data.coord.lat;
        var lon = data.coord.lon;



}



var getWeatherResults = function(query) {
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=30d6578d03fd53edd07b515697cb941a';

    
    fetch(forecastApiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            return response.json();
        }})
            .then(function (data) {
                console.log(data);
                displayCurrent(data, query);
            })  
            var lat = data.coord.lat;
            var lon = data.coord.lon; 
            
}// var currentForecastApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=imperial';

// display current weather 
var displayCurrent = function (data, query) {
    query = document.querySelector("#search-input").value;
    weatherResultsEl.textContent = '';

    
    // date element:
    let currentDate = document.createElement('span');
    currentDate.textContent = moment().format("MM/DD/YYYY");
    userInputEl.appendChild(currentDate);

    // weather Icon image element:
    let weatherImg = document.createElement('img');
    let weatherImgVal = data.weather[0].icon;
    weatherImg.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherImgVal + '@2x.png');
    userInputEl.appendChild(weatherImg);

    // temperature
    var currentTempEl = document.createElement('span');
    currentTempEl.textContent = 'Current Temperature: ' + data.main.temp + ' degrees F'

    // humidity section:
    var currentHumidityEl = document.createElement('span');
    currentHumidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentHumidityEl.classList = 'list-group-item';

    // wind span
    var windEl = document.createElement('span');
    windEl.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
    windEl.classList = 'list-group-item';

    weatherResultsEl.appendChild(currentTempEl);
    weatherResultsEl.appendChild(currentHumidityEl);
    weatherResultsEl.appendChild(windEl);


}      








// do this later:
// var getCoordinates = function() {
//     var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=30d6578d03fd53edd07b515697cb941a';
    

// }




closingSpan.addEventListener('click', closeBtnClkHandler);
submitBtn.addEventListener('click', buttonClickHandler);
window.addEventListener('click', clickOffCloseModal);
    
  