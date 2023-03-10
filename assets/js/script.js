    const APIKey = "451e60a05a73232b3bf03933f49433c3";

    let todaysDate = moment();

    function saveCityButton(city) {
        let buttonList = document.getElementById("button-list");
        let buttonListElement = document.createElement("li");
        let button = document.createElement("button");

        button.innerHTML = city;
        buttonList.setAttribute("class", "listButton");
        buttonList.classList.add("city-btns");
        buttonListElement.appendChild(button);
        buttonList.appendChild(buttonListElement);
    };

    
    function display5Day(response) {
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;
    
        let forecastSection = document.getElementById("forecast-section");
        
        console.log(response);

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
                    }
                    console.log(day.icon);
                    fiveDayArray.push(day);
                };
                for (let i = 0; i < 5; i++) {
                    let cardDate = document.getElementById(`card${i+1}-date`);
                    let cardIcon = document.getElementById(`card${i+1}-img-top`); // NOT WORKING CORRECTLY
                    let cardTemp = document.getElementById(`card${i+1}-temp`);
                    let cardWind = document.getElementById(`card${i+1}-wind`);
                    let cardHumidity = document.getElementById(`card${i+1}-humidity`);
                    
                    cardDate.textContent = todaysDate.add(1, 'd').format("DD/M/YYYY"); // increment date for each card
                    // cardIcon.textContent = `https://openweathermap.org/img/wn/${fiveDayArray[i].icon}.png`;
                    cardTemp.textContent = `Temp: ${fiveDayArray[i].temp}\u00B0C`;
                    cardWind.textContent = `Wind: ${fiveDayArray[i].wind} m/sec`;
                    cardHumidity.textContent = `Humidity: ${fiveDayArray[i].humidity}%`;
                    // console.log(cardIcon);              
                };    
            });
    };

    function displayToday(response) {
        let todaySection = document.getElementById("today-section");
        let cityDisplay = document.getElementById("city");
        let todayTempDisplay = document.getElementById("today-temp");
        let todayHumidityDisplay = document.getElementById("today-humidity");
        let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

        // $(todaySection).show();

        // if (todaySection.style.display === "none") {
        //     todaySection.style.display = "block";
        // };

        cityDisplay.textContent = `${response.city} (${todaysDate.format("DD/MM/YYYY")})`;
        todayTempDisplay.textContent = `Temp: ${response.temp}\u00B0C`;
        todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
        todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;

        display5Day(response);
    };

    $("#search-button").on("click", function() {
        // event.preventdefault();
        let searchCity = $("#search-input").val();
        // $("#search-input").val(""); //??
        // $('input[type="text"]').val(""); //??
        // $('input[name="test"]').val(""); //??

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
                // display5Day(todayAndLatLon);
                // saveCityButton(searchCity);
            });
    });




