const APIKey = "451e60a05a73232b3bf03933f49433c3";

let todaysDate = moment();

function displayToday(response) {
    let cityDisplay = document.getElementById("city");
    let timeDisplay = document.getElementsByClassName("today-time");
    let todayTempDisplay = document.getElementById("today-temp");
    let todayHumidityDisplay = document.getElementById("today-humidity");
    let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

    cityDisplay.textContent = `${response.city} (${todaysDate.format("DD/MM/YYYY")})`;
    // timeDisplay.textContent = `@${}`
    todayTempDisplay.textContent = `Temp: ${response.temp}\u00B0C`;
    todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
    todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;
};

function display5Day(response) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            let fiveDayArray = [];
            let K = 273.15; // c = K - 273.15 (kelvin to centigrade conversion)
            console.log(response);
            for(let i = 0; i < 33; i+= 8) {
                let day = {
                date: response.list[i].dt_txt,
                icon: response.list[i].weather[0].icon,
                temp: (response.list[i].main.temp - K).toFixed(2),
                wind: response.list[i].wind.speed,
                humidity: response.list[i].main.humidity
                };

                let dateYear = day.date.slice(0, 4);
                let dateMonth = day.date.slice(5, 7);
                let dateDay = day.date.slice(8, 10);
                let dayTime = day.date.slice(11, 16);

                day.time = `${dayTime}`;             
                day.date = `${dateDay}/${dateMonth}/${dateYear}`;
                fiveDayArray.push(day);   
            };
            
            for (let i = 0; i < 5; i++) {
                let cardDate = document.getElementById(`card${i+1}-date`);
                let cardTime = document.getElementById(`card${i+1}-time`);
                // let cardIcon = document.getElementById(`card${i+1}-img-top`); // NOT WORKING CORRECTLY
                let cardIcon = document.getElementById(`card${i+1}-icon`);
                let cardTemp = document.getElementById(`card${i+1}-temp`);
                let cardWind = document.getElementById(`card${i+1}-wind`);
                let cardHumidity = document.getElementById(`card${i+1}-humidity`);
                
                cardDate.textContent = `(${fiveDayArray[i].date})`;// increment date for each card
                cardTime.textContent = `@${fiveDayArray[i].time}`;
                // cardIcon.textContent = `https://openweathermap.org/img/wn/${fiveDayArray[i].icon}.png`;
                // cardIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>`;
                cardTemp.textContent = `Temp: ${fiveDayArray[i].temp}\u00B0C`;
                cardWind.textContent = `Wind: ${fiveDayArray[i].wind} m/sec`;
                cardHumidity.textContent = `Humidity: ${fiveDayArray[i].humidity}%`;
                // console.log(cardIcon);                      
            };  
        });
};

function saveCityButton(city) {
    let buttonList = document.getElementById("button-list");
    let buttonListElement = document.createElement("li");
    let button = document.createElement("button");

    button.innerHTML = city;
    button.setAttribute("class", "city-button");
    buttonList.setAttribute("class", "listButton");
    buttonList.classList.add("city-btns");
    buttonListElement.appendChild(button);
    buttonList.appendChild(buttonListElement);
};

function getLatAndLon(searchCity) {
    let queryLatLon = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&mode=json&units=metric&appid=${APIKey}`;    

    $.ajax({
        url: queryLatLon,
        method: "GET"
        }).then(function(response) {
            let todayAndLatLon = {
                city: response.name,
                temp: response.main.temp,
                humidity: response.main.humidity,
                windSpeed: response.wind.speed,
                lat: response.coord.lat,
                lon: response.coord.lon
            };
            displayToday(todayAndLatLon);
            display5Day(todayAndLatLon);
            saveCityButton(searchCity);
        });
};

$(".city-button").on("click", function() {
    console.log("test");
});

$("#search-button").on("click", function() {
    let searchCity = $("#search-input").val();
    console.log(searchCity);
    getLatAndLon(searchCity);
    console.log(moment());
  
});