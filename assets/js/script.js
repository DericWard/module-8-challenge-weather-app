    const APIKey = "451e60a05a73232b3bf03933f49433c3";

    let cityDisplay = document.getElementById("city");
    let todayDateDisplay = document.getElementById("today-date");
    let todayTempDisplay = document.getElementById("today-temp");
    let todayHumidityDisplay = document.getElementById("today-humidity");
    let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

    let todaysDate = moment();
    let searchCity = "";
    let queryURL = "";
    
    $("#search-button").on("click", function() {
        searchCity = $("#search-input").val();
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&mode=json&units=metric&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                let APIResponse = {
                    city: response.name,
                    temp: response.main.temp,
                    humidity: response.main.humidity,
                    windSpeed: response.wind.speed,
                    lat: response.coord.lat,
                    lon: response.coord.lon
                };  
            displayWeather(APIResponse);  
        }); 
    });

    function displayWeather(APIResponse) {
        cityDisplay.textContent = APIResponse.city + " " +  "(" + todaysDate.format("DD/MM/YYYY") + ")";
        todayTempDisplay.textContent = "Temp: " + APIResponse.temp + " Degrees C";
        todayHumidityDisplay.textContent = "Humidity: " + APIResponse.humidity + "%";
        todayWindSpeedDisplay.textContent = "Wind: " + APIResponse.windSpeed + " m/s";

        console.log("City: ", APIResponse.city);
        console.log("Temp: ", APIResponse.temp);
        console.log("Humidity: ", APIResponse.humidity);
        console.log("Wind speed: ", APIResponse.windSpeed);
        console.log("Lat : ", APIResponse.lat);
        console.log("Lon : ", APIResponse.lon);
    };