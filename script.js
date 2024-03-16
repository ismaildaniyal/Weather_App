// Fetch weather data function
// Fetch weather data function
var lat = 0.0,
lon = 0.0;

// Get user's location using ipinfo.io
$.getJSON('https://ipinfo.io', function (data) {
console.log(data);
var loc = data.loc;
lat = loc.split(",")[0];
lon = loc.split(",")[1];
display(lat, lon);
});

// Display latitude and longitude
function display(x, y) {
$("#pos1").html("<b>" + x + "</b>");
$("#pos2").html("<b>" + y + "</b>");
}

// Function to convert temperature from Kelvin to Celsius
function convertTemp(currTemp) {
return Math.round(currTemp - 273.15);
}

// Function to calculate wind direction from degrees
function degToCompass(num) {
var val = Math.floor((num / 22.5) + 0.5);
var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
return arr[(val % 16)];
}

// Fetch weather data from OpenWeatherMap API
// Fetch weather data from OpenWeatherMap API
function getWeather() {
    var city = document.getElementById('city-input').value;
    var apiKey = '192ee76194639db08984e0e875ebe942';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var currentTime = new Date();
            var currentHour = currentTime.getHours();
            var weatherIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
           // $("#weather-icon").html('<img src="' + weatherIcon + '">');
            // Display temperature in Celsius
            var curTempCelsius = convertTemp(data.main.temp);
            $("#tempe").html('<img src="' + weatherIcon + '">'+"   " + curTempCelsius + "°C    " +city + ", " + data.sys.country);

             // Show the detail button when temperature is displayed
             $("#show-details-button").show();
             $(".heading").css("text-align","left");
             $(".right-panel").show();

             
            // Display current time
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
            $("#current-time").html("<br>Current Time: " + timeString + "</b>");

            // Display current date
            var month = currentTime.toLocaleString('default', { month: 'long' });
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            var dateString = month + " " + day + ", " + year;
            $("#current-date").html("<b>Current Date: " + dateString + "</b>");

            // Display weather condition

            // Display wind speed and direction
            var windSpeed = degToCompass(data.wind.deg) + ' ' + data.wind.speed + ' m/s';
            $("#wind-speed").html("<b>" + windSpeed + "</b>");

            var temperature = convertTemp(data.main.temp);
            $(".cloud").text(temperature + "°C");
            
            // Display feels like temperature
            var feelsLike = convertTemp(data.main.feels_like);
            $(".humidity").text(feelsLike + "°C");
            
            // Display minimum temperature
            var minTemp = convertTemp(data.main.temp_min);
            $(".wind").eq(0).text(minTemp + "°C");
            
            // Display maximum temperature
            var maxTemp = convertTemp(data.main.temp_max);
            $(".wind").eq(1).text(maxTemp + "°C");
            
            // Display pressure
            $(".wind").eq(2).text(data.main.pressure + " m/s");
            
            // Display humidity
            $(".wind").eq(3).text(data.main.humidity + "%");
            
            // Display visibility
            $(".wind").eq(4).text(data.visibility + " m");
            // Determine the time of day based on the hour
            var timeOfDay;
            if (currentHour >= 5 && currentHour < 12) {
                timeOfDay = "Morning";
            } else if (currentHour >= 12 && currentHour < 18) {
                timeOfDay = "Afternoon";
            } else if (currentHour >= 18 && currentHour < 22) {
                timeOfDay = "Evening";
            } else {
                timeOfDay = "Night";
            }

            // Call the changeBackground function with weather condition and time of day
           // changeBackground(data.weather[0].main, timeOfDay);
           fetchRandomImage(timeOfDay);
        },
        error: function (err) {
            // Handle error
        }
    });
}



// Function to change background image based on weather condition
// Function to change background image based on time of day
function changeBackground(weatherCondition, timeOfDay) {
    var weatherBackgroundUrl = "";

    // Set background image based on weather condition and time of day
    switch (weatherCondition) {
        case "Clear":
            weatherBackgroundUrl = 'clear.jpg';
            break;
        case "Clouds":
            weatherBackgroundUrl = 'clouds.jpg';
            break;
        case "Rain":
            weatherBackgroundUrl = 'rain.jpg';
            break;
        default:
            weatherBackgroundUrl = 'default.jpg';
            break;
    }

    // Set background image based on time of day
    var timeBackgroundUrl = "";
    switch (timeOfDay) {
        case "Morning":
            timeBackgroundUrl = 'morning.jpg';
            break;
        case "Afternoon":
            timeBackgroundUrl = 'afternoon.jpg';
            break;
        case "Evening":
            timeBackgroundUrl = 'evening.jpg';
            break;
        case "Night":
            timeBackgroundUrl = 'night.jpg';
            break;
        default:
            timeBackgroundUrl = 'default-time.jpg';
            break;
    }

    $('body').css('background-image', 'url(' + weatherBackgroundUrl + ')');
    $('#time-background').css('background-image', 'url(' + timeBackgroundUrl + ')');
}



$(document).ready(function() {
    // Hide the panel initially
    $(".panel").hide();

    $(".right-panel").hide();

    // Show the detail button initially
    $("#show-details-button").hide();

    // Function to show the panel and hide the detail button
    $("#show-details-button").click(function() {
        $(".panel").show();
        $(this).hide();
    });

    // Function to hide the panel and show the detail button
    $(".fa-times").click(function() {
        $(".panel").hide();
        $("#show-details-button").show();
    });

    // Fetch weather data when the city input changes
  


    

    // Fetch weather data when Enter key is pressed in the city input
    $("#city-input").on("keypress", function(event) {
        // Check if Enter key was pressed
        if (event.key === "Enter") {
            // Call getWeather function
            getWeather();
        }
    });


     // Function to fetch weather data when the city input changes
     $("#city-input").on("input", function() {
        var cityInput = $(this).val().trim(); // Trim to remove leading and trailing whitespace

        // Check if the input value is empty
        if (cityInput === "") {
            // Hide the right panel and the detail button
            $(".right-panel").hide();
            $("#show-details-button").hide();
            $(".panel").hide();
        } else {
            // Call getWeather function
            getWeather();
        }
    });

});



// Function to fetch random image from Unsplash API
function fetchRandomImage(timeOfDay) {
    // Set keywords based on time of day
    var keywords = "";
    switch (timeOfDay) {
        case "Morning":
            keywords = "morning";
            break;
        case "Afternoon":
            keywords = "afternoon";
            break;
        case "Evening":
            keywords = "evening";
            break;
        case "Night":
            keywords = "night";
            break;
        default:
            keywords = "nature"; // Default keyword
            break;
    }

    // Fetch random image from Unsplash API based on keywords
    var apiUrl = "https://api.unsplash.com/photos/random?query=" + keywords + "&client_id=YOUR_UNSPLASH_ACCESS_KEY";
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Set background image
            var imageUrl = data.urls.regular;
            $('body').css('background-image', 'url(' + weatherBackgroundUrl + ')');
    $('#time-background').css('background-image', 'url(' + timeBackgroundUrl + ')');
        },
        error: function (err) {
            console.log("Error fetching image:", err);
        }
    });
}

// Example usage
var currentTime = new Date();
var currentHour = currentTime.getHours();

// Determine the time of day based on the hour
var timeOfDay;
if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "Morning";
} else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "Afternoon";
} else if (currentHour >= 18 && currentHour < 22) {
    timeOfDay = "Evening";
} else {
    timeOfDay = "Night";
}

// Fetch random image based on time of day
fetchRandomImage(timeOfDay);

// Rest of the JavaScript code...
