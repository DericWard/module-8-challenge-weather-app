    const APIKey = "451e60a05a73232b3bf03933f49433c3";

    let cityDisplay = document.getElementById("city");
    let todayDateDisplay = document.getElementById("today-date");
    let todayTempDisplay = document.getElementById("today-temp");
    let todayHumidityDisplay = document.getElementById("today-humidity");
    let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

    let todaysDate = moment();
    let searchCity = "";
    let queryLatLon = "";
    let queryURL = "";

    function displayToday(response) {
        cityDisplay.textContent = response.city + " " +  "(" + todaysDate.format("DD/MM/YYYY") + ")";
        todayTempDisplay.textContent = `Temp: ${response.temp} Degrees C`;
        todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
        todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;
    };

    function display5Day(response) {
        queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                let fiveDayArray = [];
                console.log(response);
                for(let i = 4; i < 37; i+= 8) {
                    let day = {
                    temp: response.list[i].main.temp,
                    wind: response.list[i].wind.speed,
                    humidity: response.list[i].main.humidity
                    }
                    fiveDayArray.push(day);
                    // console.log(temp); 
                    // console.log(wind);
                    // console.log(humidity + "%");
                };
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




