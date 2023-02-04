    const APIKey = "451e60a05a73232b3bf03933f49433c3";

    let searchCity = "";
    let queryURL = "";
    
    $("#search-button").on("click", function() {
        searchCity = $("#search-input").val();
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&mode=json&units=metric&appid=" + APIKey;
        // console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                let APIResponse = {
                    city: response.name,
                    temp: response.main.temp,
                    humidity: response.main.humidity,
                    windSpeed: response.wind.speed,
                    latitude: response.coord.lat,
                    longtitude: response.coord.lon
                };
            console.log(APIResponse.city);
            APIData(APIResponse);        
        }); 
    });

    function APIData(APIResponse) {
        console.log("City: " + APIResponse.city)
    }



    // console.log("city: " + APIResponse.city); // return APIResponse is not defined


// console.log(response);


    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         // console.log(response);
    //         let city = response.name;
    //         console.log(city);
    //         let temp = response.main.temp;
    //         console.log(temp);
    //         let humidity = response.main.humidity;
    //         console.log(humidity);
    //         let windSpeed = response.wind.speed;
    //         console.log(windSpeed);
    //         let latitude = response.coord.lat;
    //         console.log(latitude);
    //         let longtitude = response.coord.lon;
    //         console.log(longtitude);
    //     });
    // });