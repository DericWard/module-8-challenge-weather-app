const APIKey = "451e60a05a73232b3bf03933f49433c3";

let cityDisplay = document.getElementById("city");
let todayDateDisplay = document.getElementById("today-date");
let todayTempDisplay = document.getElementById("today-temp");
let todayHumidityDisplay = document.getElementById("today-humidity");
let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

// start card display fields
let card0Temp = document.getElementById("card0"); // today
let card0WindSpeed = document.getElementById("card0"); // 
let card0Humidity = document.getElementById("card0"); // 

let card1Date = document.getElementById("card1-date"); // 
let card1Temp = document.getElementById("card1-temp"); // tomorrow
let card1WindSpeed = document.getElementById("card1-wind"); 
let card1Humidity = document.getElementById("card1-humidity"); 

let card2Temp = document.getElementById("card2-temp"); // day after tomorrow
let card2WindSpeed = document.getElementById("card2-wind"); 
let card2Humidity = document.getElementById("card2-humidity"); 

let card3Temp = document.getElementById("card3-temp"); // and so on
let card3WindSpeed = document.getElementById("card3-wind"); 
let card3Humidity = document.getElementById("card3-humidity"); 

let card4Temp = document.getElementById("card4-temp"); 
let card4WindSpeed = document.getElementById("card4-wind"); 
let card4Humidity = document.getElementById("card4-humidity"); 

let card5Temp = document.getElementById("card5-temp"); 
let card5WindSpeed = document.getElementById("card5-wind"); 
let card5Humidity = document.getElementById("card5-humidity"); 
// end card display fields

let K = 273.15;
let todaysDate = moment();
let searchCity = "";
let queryLatLon = "";
let queryURL = "";

// function displayToday(response) {
//     cityDisplay.textContent = `${response.city} (${todaysDate.format("DD/MM/YYYY")})`;
//     todayTempDisplay.textContent = `Temp: ${response.temp}\u00B0C`;
//     todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
//     todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;
// };

function display5Day(response) {

    // cityDisplay.textContent = `${response.city.name} (${todaysDate.format("DD/MM/YYYY")})`;
    // todayTempDisplay.textContent = `Temp: ${response.temp}\u00B0C`;
    // todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
    // todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;

// **************************************************************************
// FOR ALL 5 CARDS AND TODAY MAIN CARD, NEED DATE, ICON, TEMP, WIND, HUMIDITY
// **************************************************************************


    queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            let fiveDayArray = [];
            console.log(response);
            for(let i = 4; i < 37; i+= 8) {
                let day = {
                date: response.list[i].dt_txt, //maybe use moment.js offset instead
                temp: (response.list[i].main.temp - K).toFixed(2),
                wind: response.list[i].wind.speed,
                humidity: response.list[i].main.humidity
                }
                fiveDayArray.push(day);
            };
            for (i = 1; i < 6; i++) {
                //update each card's data fields, i is the card number
                console.log("card" + [i]);
                // `card[i]Temp.textContent` = fiveDayArray[i].temp;
            }

            // c = K - 273.15 kelvin to centigrade
            card1WindSpeed.textContent = `${fiveDayArray[0].date}`;
            card1Temp.textContent = `Temp: ${fiveDayArray[0].temp}\u00B0C`;
            card1WindSpeed.textContent = `Wind: ${fiveDayArray[0].wind}`;
            card1Humidity.textContent = `Humidity: ${fiveDayArray[0].humidity}%`;
            
            card2Temp.textContent = `Temp: ${fiveDayArray[1].temp}\u00B0C`;
            card2WindSpeed.textContent = `Wind: ${fiveDayArray[1].wind}`;
            card2Humidity.textContent = `Humidity: ${fiveDayArray[1].humidity}%`;

            card3Temp.textContent = `Temp: ${fiveDayArray[2].temp}\u00B0C`;
            card3WindSpeed.textContent = `Wind: ${fiveDayArray[2].wind}`;
            card3Humidity.textContent = `Humidity: ${fiveDayArray[2].humidity}%`;

            card4Temp.textContent = `Temp: ${fiveDayArray[3].temp}\u00B0C`;
            card4WindSpeed.textContent = `Wind: ${fiveDayArray[3].wind}`;
            card4Humidity.textContent = `Humidity: ${fiveDayArray[3].humidity}%`;

            card5Temp.textContent = `Temp: ${fiveDayArray[4].temp}\u00B0C`;
            card5WindSpeed.textContent = `Wind: ${fiveDayArray[4].wind}`;
            card5Humidity.textContent = `Humidity: ${fiveDayArray[4].humidity}%`;

            console.log(fiveDayArray);      
    });
};

$("#search-button").on("click", function() {
    searchCity = $("#search-input").val();
    queryLatLon = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&mode=json&units=metric&appid=${APIKey}`;    

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
            displayToday(todayAndLatLon)
            display5Day(todayAndLatLon); 
        });
});




