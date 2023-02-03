// $(document).ready(function () {

    const APIKey = "451e60a05a73232b3bf03933f49433c3";

    let myCity = "";
    let queryURL = "";
    
    $("#search-button").on("click", function() {
        myCity = $("search-input").val();
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&mode=json&units=metric&appid=" + APIKey;
        console.log(myCity);
        console.log(queryURL);
    });
    
    

    
    console.log(queryURL);
    
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     let city = response.name;
    //     console.log(city);
    //     let temp = response.main.temp;
    //     console.log(temp);
    //     let humidity = response.main.humidity;
    //     console.log(humidity);
    //     let windSpeed = response.wind.speed;
    //     console.log(windSpeed);
    //     let latitude = response.coord.lat;
    //     console.log(latitude);
    //     let longtitude = response.coord.lon;
    //     console.log(longtitude);
    //     // let icon = response.weather.0.icon;
    // });
    

// })


