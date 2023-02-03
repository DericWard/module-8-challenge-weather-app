text field to enter city name
button listener for the city name submit
save city to a variable
save api to a variable

retrieve city name coordinates
send city-name in API call
send coordinates in API for 5-day forecast
send API call for icons/images

parse the return data for the relevant weather info
including icons/images etc

display the city name
display the required weather data
display relevant icons/images

display above data & images in bootstrap(?) cards

Store each searched city in localstorage
display each searched city as a button

Visual layout:
city search field on top left
previous citys on centre/lower left
current weather for current city top centre
5-day forecast lower centre 

must include:
The city name
The date
An icon representation of weather conditions
The temperature
The humidity
The wind speed


API response:
=============
main.name (city name)
main.temp (avg temp)
main.humidity (humidity)
wind.speed (wind speed KPH)

coord.lat (city latitude)
coord.lon (city longtitude)

weather.0.icon (weather icon)