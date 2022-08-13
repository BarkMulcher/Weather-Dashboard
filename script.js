// api URL example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30d6578d03fd53edd07b515697cb941a

let queryFormEl = document.querySelector('#search-form');
let queryInputEl = document.querySelector('#search-input');
// modal declarations
let modal = document.getElementById('myModal');
let submitBtn = document.getElementById('submit-query');
let closingSpan = document.getElementsByClassName('close')[0];
// let searchParamsArr = document.location.search.split('//'); //some character here that delineates between lat/long :()
// let query = searchParamsArr


// one function to fetch location
// triggers 2nd function to pull location data
// prof3ssorSt3v3 on gist.github
// 
// "city" parameter to be named later
var getWeatherResults = function(query) {
    let lat = document.getElementById('latitude').value; // maybe?
    let lon = document.getElementById('longitude').value; // maybe?
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=30d6578d03fd53edd07b515697cb941a';
    
// enter the lat/lon in / '' + lat/lon + '' / format

    fetch(forecastApiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
    getCoordinates
}

var getCoordinates = function() {
    var geocodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=30d6578d03fd53edd07b515697cb941a';
    

}

// var currentWeatherResults = function(query) {}


// REVISE THIS LATER TO INCLUDE the above MODAL FOR EMPTY FORM
function buttonClickHandler(event) {
    event.preventDefault();

    var userInput = document.querySelector("#search-input").value;

    if (!userInput) {
        //Modal variables at top
        console.error('do the thing');
        modal.style.display = 'block';
        return;
    } else {
        
    }
}
var closeBtnClkHandler = function() {
    modal.style.display = 'none';
    
}
var clickOffCloseModal = function(event) {
    if (event.target == modal) {
            modal.style.display = 'none';
    }
        
}
// fkn hell yeah ^

closingSpan.addEventListener('click', closeBtnClkHandler);
submitBtn.addEventListener('click', buttonClickHandler);
window.addEventListener('click', clickOffCloseModal);
    
  