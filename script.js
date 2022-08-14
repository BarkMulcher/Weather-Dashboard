// api URL example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30d6578d03fd53edd07b515697cb941a

let queryFormEl = document.querySelector('#search-form');
let queryInputEl = document.querySelector('#search-input');
let weatherResultsEl = document.querySelector('#current-conditions');
let query = document.querySelector("#search-input").value;
let searchHistoryBtnsEl = document.querySelector('#search-history-buttons');
let forecastResultsEl = document.querySelector('#fiver-container');
// modal declarations
let modal = document.getElementById('myModal');
let submitBtn = document.getElementById('submit-query');
let closingSpan = document.getElementsByClassName('close')[0];
// let weatherIconUrl = 'https://'
// let searchParamsArr = document.location.search;
// let query = searchParamsArr

const oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const apiKey = '30d6578d03fd53edd07b515697cb941a';
let history = JSON.parse(localStorage.getItem('query')) || [];
console.log(history);

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
    
    getWeatherResults(query);
}

var closeBtnClkHandler = function() {
    modal.style.display = 'none';
    
}
var clickOffCloseModal = function(event) {
    if (event.target == modal) {
            modal.style.display = 'none';
    }
        
}

// one function to fetch location
// triggers 2nd function to use location data?
// 
var getWeatherResults = function(query) {
    // let lat = document.getElementById('latitude').value; // saving these for later
    // let lon = document.getElementById('longitude').value; // saving these for later
    // var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=30d6578d03fd53edd07b515697cb941a'; // saving for later
    var currentForecastApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=imperial';
    
    
// enter the lat/lon in / '' + lat/lon + '' / format

    fetch(currentForecastApiUrl)
        .then(function (response) {
            
            if (response.ok) {
                console.log(response);
                response.json()
                .then(function(data){
                    console.log(data);               
                displayCurrent(data, query);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
            
            
        // const tempF = response.weather.main;
        //     var weatherIcon = weather.icon;
        //     var weatherIconURL = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
        // .then(function (weatherResults) {
        //     weatherResultsEl.textContent = weatherResults.query;

        //     console.log(weatherResults);
        //       }
        
    // getCoordinates
}
// display current weather - just test - going to meet criteria after test
var displayCurrent = function (query, userInput) {
    query = document.querySelector("#search-input").value;
    weatherResultsEl.textContent = '';
    queryInputEl.textContent = userInput;
    
    // date element:
    let currentDate = document.createElement('span');
    currentDate.textContent = ' (' + moment().format("(MM/DD/YYYY)");

    // weather Icon image element:
    console.log(data);
    let weatherIcon = document.createElement('img');
    let weatherIconVal = data.weather[0].icon;
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherIconVal + '@2x.png');
    queryInputEl.classList = 'list-group-item';
}      
// do this later:
// var getCoordinates = function() {
//     var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=30d6578d03fd53edd07b515697cb941a';
    

// }




closingSpan.addEventListener('click', closeBtnClkHandler);
submitBtn.addEventListener('click', buttonClickHandler);
window.addEventListener('click', clickOffCloseModal);
    
  