const APIKey = "451e60a05a73232b3bf03933f49433c3";

// un-hide the 5-day forecast section and loop through the API data to build and display each of the next 5 
// days forecasts, find and extract the same time of day from the API data for each of these forecasts, 
// and display on each card, (get the icon for the forecast and display it
function display5Day(response) {
    let forecastSection = document.getElementById("forecast-section");
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;

    $(forecastSection).show();

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            let fiveDayArray = [];
            let K = 273.15; // c = K - 273.15 (kelvin to centigrade conversion)
            for(let i = 0; i < 37; i+= 8) {
                let day = {
                date: response.list[i].dt_txt,
                icon: response.list[i].weather[0].icon,
                temp: Math.ceil(response.list[i].main.temp - K),
                wind: Math.ceil(response.list[i].wind.speed),
                humidity: response.list[i].main.humidity
                };

                let dateYear = day.date.slice(0, 4);
                let dateMonth = day.date.slice(5, 7);
                let dateDay = day.date.slice(8, 10);
                // let dayTime = day.date.slice(11, 16); //removed time display as it was confusing for the user
                // - being the time local to the user, not the time at the searched city
                // day.time = `${dayTime}`;             
                day.date = `${dateDay}/${dateMonth}/${dateYear}`;
                fiveDayArray.push(day);   
            };
            
            for (let i = 0; i < 5; i++) {
                let cardDate = document.getElementById(`card${i+1}-date`);
                // let cardTime = document.getElementById(`card${i+1}-time`);
                let cardTemp = document.getElementById(`card${i+1}-temp`);
                let cardWind = document.getElementById(`card${i+1}-wind`);
                let cardHumidity = document.getElementById(`card${i+1}-humidity`);
                
                let cardIconURL =  `https://openweathermap.org/img/wn/${fiveDayArray[i].icon}@2x.png`;
                document.querySelector('#card' + (i+1) + '-icon').setAttribute('src', cardIconURL);

                cardDate.textContent = `(${fiveDayArray[i].date})`;// increment date for each card
                // cardTime.textContent = `@${fiveDayArray[i].time}`;    
                cardTemp.textContent = `Temp: ${fiveDayArray[i].temp}\u00B0C`;
                cardWind.textContent = `Wind: ${fiveDayArray[i].wind} m/sec`;
                cardHumidity.textContent = `Humidity: ${fiveDayArray[i].humidity}%`;                     
            };  
        });
};

// un-hide the display for today and use the API data to write to display today's current forecast
function displayToday(response) {  
    let todaySection = document.getElementById("today-section");
    let cityDisplay = document.getElementById("city");
    let todayTempDisplay = document.getElementById("today-temp");
    let todayHumidityDisplay = document.getElementById("today-humidity");
    let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

    let todayIconURL =  `https://openweathermap.org/img/wn/${response.icon}@2x.png`;
    document.querySelector('#today-icon').setAttribute('src', todayIconURL);
    
    todaySection.style.display = "flex";
    $(todaySection).show();

    cityDisplay.textContent = `${response.city}: `;
    temp = Math.ceil(response.temp);
    wind = Math.ceil(response.windSpeed);
    todayTempDisplay.textContent = `Temp: ${temp}\u00B0C\u00A0\u00A0\u00A0`;
    todayWindSpeedDisplay.textContent = `Wind: ${wind}m/s\u00A0\u00A0\u00A0`;
    todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;

    display5Day(response);
};

// create the buttons for previously-searched cities
function createCityButton(city) {
    let button = document.createElement("button");
    let buttonListElement = document.createElement("li");
    let buttonList = document.getElementById("button-list");

    button.innerHTML = city;
    button.setAttribute("class", "city-button");
    buttonListElement.appendChild(button);
    buttonList.appendChild(buttonListElement);
};

// save currently-searched city to local storage and display the city's button,
// if it doesn't already exist in local storage
function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem("cities"));
    if (!cities) cities = [];
    for(let i = 0; i < cities.length; i++) {
        if (city === cities[i]) {
            return;
        };
    };
    cities.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    createCityButton(city);
};

// retrieve list of previously-searched cities from local storage
function getFromLocalStorage(){
    let citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
    for(let i = 0; i < citiesArray.length; i++) {
        createCityButton(citiesArray[i]);
    };
};

// send off the initial API call to obtain the latitude and longitude of the
// searched city, and extract today's data from it to display on today's forecast
function getLatAndLon(searchCity) {
    let queryLatLon = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&mode=json&units=metric&appid=${APIKey}`;    

    $.ajax({
        url: queryLatLon,
        method: "GET"
        }).then(function(response) {
            let todayAndLatLon = {
                city: response.name,
                icon: response.weather[0].icon, 
                temp: response.main.temp,
                humidity: response.main.humidity,
                windSpeed: response.wind.speed,
                lat: response.coord.lat,
                lon: response.coord.lon
            };
            displayToday(todayAndLatLon);
            saveCity(response.name);
        });
};

// run function getFromLocalStorage to start the process of displaying
// previously-searched cities buttons
getFromLocalStorage();

// listen to the search button being clicked and extract the city name
// from the user city name search field, send it to the API call function
$("#search-button").on("click", function() {
    let searchCity = $("#search-input").val();
    $("#search-input").val("");
    getLatAndLon(searchCity);
});

// listen for the previously-searched city buttons, extract the city name of the
// button, send the city name to the API call function
$(".city-button").on("click", function(event) {
    let searchCity = event.target.innerHTML;
    getLatAndLon(searchCity);
});

// listen for the 'clear previously-searched city buttons' to be clicked,
// clear the local storage of the searched cities, hide the buttons from 
// the display.
$("#clear-button").on("click", function() {
    localStorage.setItem("cities", JSON.stringify([]));
    $("#button-list").html("");
});