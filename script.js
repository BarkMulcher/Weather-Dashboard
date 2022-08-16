// api URL example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30d6578d03fd53edd07b515697cb941a

let history = [];
let queryFormEl = document.querySelector('#search-form');
let queryInputEl = document.querySelector('#search-input');
let weatherResultsEl = document.querySelector('#current-conditions-container');
let query = document.querySelector("#search-input").value;
let userInputEl = document.querySelector('#searched-city');

let forecastHeadline = document.querySelector('#forecast');
let forecastResultsEl = document.querySelector('#fiver-container');

// modal declarations
let modal = document.getElementById('myModal');
let submitBtn = document.getElementById('submit-query');
let closingSpan = document.getElementsByClassName('close')[0];
const oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const apiKey = '30d6578d03fd53edd07b515697cb941a';

// capitalization function:
// var queryCapitalizer = function(query) {
//     var splitStr = query.toLowerCase().split(' ');
//     for (i = 0; i < splitStr.length; i++) {
        
//         splitStr[i] =
//     splitStr[i].charAt(0).toUpperCase() +
//     splitStr[i].substring(1).toLowerCase();
//     }

//     return splitStr.join(' ');
// }

// not work :()

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
        history.unshift({query});
        queryInputEl.value = '';
    }
    saveSearch();
    searchHistory();
}
 // modal close fn
var closeBtnClkHandler = function() {
    modal.style.display = 'none';
    
}
// modal close fn by click-away:
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

}

var getWeatherResults = function(query) {
    getLatLon(query); 
        fetch(geocodeApiUrl + query + '&limit=3&appid=' + apiKey)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }})
    
            .then(function (data) {
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;
            
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=30d6578d03fd53edd07b515697cb941a&units=imperial';

    fetch(forecastApiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            return response.json();
        }})
            .then(function (data) {
                console.log(data);
                displayWeather(data, query);
            })  

        })
            
}

// display current weather 
var displayWeather = function (data, query) {
    weatherResultsEl.textContent = ' ';
    userInputEl.textContent = query;
    query = document.querySelector("#search-input").value;
    weatherResultsEl.textContent = '';

    
    // date element:
    let currentDate = document.createElement('span');
    currentDate.textContent = moment().format(" MM/DD/YYYY");
    userInputEl.appendChild(currentDate);

    // weather Icon image element:
    let weatherImg = document.createElement('img');
    let weatherImgVal = data.current.weather[0].icon;
    weatherImg.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherImgVal + '@2x.png');
    userInputEl.appendChild(weatherImg);

    // temperature
    var currentTempEl = document.createElement('span');
    currentTempEl.textContent = 'Current Temperature: ' + data.current.temp + ' degrees F'
    currentTempEl.classList = 'list-group-item';

    // humidity section:
    var currentHumidityEl = document.createElement('span');
    currentHumidityEl.textContent = 'Humidity: ' + data.current.humidity + '%';
    currentHumidityEl.classList = 'list-group-item';

    // wind span
    var windEl = document.createElement('span');
    windEl.textContent = 'Wind Speed: ' + data.current.wind_speed + 'MPH';
    windEl.classList = 'list-group-item';

    // UV index span:
    var uvIndexEl = document.createElement('div');
    uvIndexEl.textContent = 'UV Index: ' + data.current.uvi;
    uvIndexEl.classList = 'list-group-item';

    // UV index indicator:
    var uvIndexIndicatorEl = document.createElement('span');
    var uviValue = data.current.uvi;
    if (uviValue < 4) {
        uvIndexIndicatorEl.setAttribute('class', 'badge bg-success rounded-pill d-flex align-items-center'); 
    } else if (uviValue < 8) {
        uvIndexIndicatorEl.setAttribute('class', 'badge bg-warning rounded-pill d-flex align-items-center');
    } else {
        uvIndexIndicatorEl.setAttribute('class', 'badge bg-danger rounded-pill d-flex align-items-center')
    }

    uvIndexEl.appendChild(uvIndexIndicatorEl);
  



    weatherResultsEl.appendChild(currentTempEl);
    weatherResultsEl.appendChild(currentHumidityEl);
    weatherResultsEl.appendChild(windEl);
    weatherResultsEl.appendChild(uvIndexEl);

    forecastResultsEl.textContent = '';
    forecastHeadline.textContent = '5-day Forecast:';

    var forecast = data.daily;
        for (i = 0; i < 5; i++) {
            var dailyForecast = data.daily[i];
        
    
        var forecastEl = document.createElement('div');
        forecastEl.classList = 'card bg-primary text-light m-2';

        var forecastDay = document.createElement('h5');
        forecastDay.textContent = moment.unix(dailyForecast.dt).format('MMM D');
        forecastDay.classList = 'card-header text-center';
        forecastEl.appendChild(forecastDay);

        var forecastImg = document.createElement('img');
        forecastImg.classList = 'card-body text-center';
        let forecastImgVal = dailyForecast.weather[0].icon;
        forecastImg.setAttribute('src', 'https://openweathermap.org/img/wn/' + forecastImgVal + '@2x.png');
        forecastEl.appendChild(forecastImg);

        var forecastTempEl = document.createElement('span');
        forecastTempEl.textContent = dailyForecast.temp.day + ' °F';
        forecastEl.appendChild(forecastTempEl);
         
        var forecastHumidityEl = document.createElement('span');
        forecastHumidityEl.textContent = dailyForecast.humidity + '%';
        forecastHumidityEl.classList = 'card-body text-center';
        forecastEl.appendChild(forecastHumidityEl);

        forecastResultsEl.appendChild(forecastEl);
        }
}      
// let forecastHeadline = document.querySelector('#forecast');
// let forecastResultsEl = document.querySelector('#fiver-container');


var getCoordinates = function() {
    var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + query + '&limit=3&appid=30d6578d03fd53edd07b515697cb941a';
    fetch(geocodeApiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            return response.json();

        }
    })

}

// let history = JSON.parse(localStorage.getItem(query)) || [];
console.log(history);
// const searchHistory = document.getElementById('search-history-buttons');
let searchHistoryBtnsEl = document.querySelector('#search-history-buttons');

var searchHistory = function(searchHistory) {

     // make buttons
    var searchHistoryEl = document.createElement('button');
    searchHistoryEl.textContent = searchHistory;
    searchHistoryEl.classList = 'w-100 btn-light border d-flex p-2';
    searchHistoryEl.setAttribute('city-input', searchHistory);
    searchHistoryEl.setAttribute('type', 'submit');

    searchHistoryBtnsEl.prepend(searchHistoryEl);
}

var searchHistoryBtnHandler = function(event) {
    var query = event.target.getAttribute('city-input');
    if (query) {
        getWeatherResults(query);
    }
}




closingSpan.addEventListener('click', closeBtnClkHandler);
submitBtn.addEventListener('click', buttonClickHandler);
window.addEventListener('click', clickOffCloseModal);
    
  