// api URL: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30d6578d03fd53edd07b515697cb941a
// unlock this later:
// var queryFormEl = document.getElementById('')
// get the modal:
var modal = document.getElementById('myModal');
// get button that opens modal - modify later to only open when form is blank!!
var submitBtn = document.getElementById('submit-query');
// get the <span> element that closes the modal:
var closingSpan = document.getElementsByClassName('close')[0];
// script the real button click handler way below later
    // preliminary button handler open modal function:
    var prelimBtnClkHandler = function() {
        modal.style.display = 'block';
    }
    // add eventListener for closing modal button <span> (x)
    closingSpan.addEventListener('click', prelimClsBtnClkHandler);
    // preliminary btn handler close modal function:
    var prelimClsBtnClkHandler = function() {
        modal.style.display = 'none';
    }
    // allow click-off to close modal:
    var clickOffCloseModal = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

// add eventListeners for clicking modal button
submitBtn.addEventListener('click', prelimBtnClkHandler);
closingSpan.addEventListener('click', prelimClsBtnClkHandler);
window.addEventListener('click', clickOffCloseModal);
// fkn hell yeah
var getForecastResults = function(query) {
    var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=30d6578d03fd53edd07b515697cb941a";


    fetch('apiUrletcetc.com"=${apiKey}');
        .then(function (response) {
   
        }
)}

var currentWeatherResults = function(query) {

}


// REVISE THIS LATER TO INCLUDE MODAL FOR EMPTY FORM
// var buttonClickHandler = function (event) {
//     var language = event.target.getAttribute('data-language');
  
//     if (!query) {
//         //Modal variables at top
//         //Modal script here:

//     }
  
//       repoContainerEl.textContent = '';
//     }
//   };

// queryFormEl.addEventListener('submit', searchFormSubmitHandler);