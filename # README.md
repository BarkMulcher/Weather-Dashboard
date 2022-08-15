# README.md
---------------------
### Requirements:
https://courses.bootcampspot.com/courses/1742/assignments/33523?module_item_id=660602


### UV index color coded
### search history
### API doc Link:
https://openweathermap.org/api/one-call-api

### API call link template:
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
### Parameters
lat, lon 	required 	Geographical coordinates (latitude, longitude)
---
appid 	required 	Your unique API key (you can always find it on 
your account page under the "API key" tab)
----
exclude 	optional 	By using this parameter you can exclude some parts of the weather data from the API response. It should be a comma-delimited list (without spaces).

Available values:

    current
    minutely
    hourly
    daily
    alerts
---
units 	optional 	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more
----
lang 	optional 	You can use the lang parameter to get the output in your language. Learn more

api key: 30d6578d03fd53edd07b515697cb941a
current weather docs
api call
lat, lon is required?
a few hours before api key is active
