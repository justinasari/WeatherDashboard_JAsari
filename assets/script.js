// Variables for Search Function
var searchCity = $("#search-city");
var searchBtn = $("#search-city-button");
var searchHistory = $("#search-history");
var clearHistory = $("#clear-history");
// Variables for Current Weather Data
var weatherContent = $("#weather-content");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var currentUVIndex = $("#uv-index");
// OpenWeather API Variable
var owAPI = "b283d83ebf4c93aec4888448e2c60dfc";
// Variable for Current Date
var currentDate = moment().format('LLL');
$("#current-date").text("(" + currentDate + ")");
// Variable for list of Cities
var cityList = [];

// Checks local storage
initializeHistory();
showClear();

// User input submission adds to local storage
$(document).on("submit", function(event) {
    event.preventDefault();
    var userInput = searchCity.val().trim();
    currentWeather(userInput);
    lookHistory(userInput);
    searchCity.val("");
});
searchBtn.on("click", function(event) {
    event.preventDefault();
    var userInput = searchCity.val().trim();
    currentWeather(userInput);
    lookHistory(userInput);
    searchCity.val("");
});

// Clears History
clearHistory.on("click", function() {
    cityList = [];
    listArray();
    $(this).addClass("hide");
});

// Function enables to go back to previously searched cities
searchHistory.on("click", "li.city-btn", function(event) {
    var value = $(this).data("value");
    currentWeather(value);
    lookHistory(value);
});

// Function requests User Input through API
function currentWeather(userInput) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + owAPI;
    $.ajax( {
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />")
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + owAPI;
        $.ajax( {
            url: uvURL,
            method: "GET"
        }).then(function(response) {
            currentUVIndex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + owAPI + "&lat=" + lat + "&lon=" + lon;
        $.ajax( {
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {
                var forecastDateString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDateString);
                var forecastColumn = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");

                $('#five-day-forecast').append(forecastColumn);
                forecastColumn.append(forecastCard);
                forecastCard.append(forecastCardBody);
                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
            }
        });
    });
};

// Search History display/save to local storage
function lookHistory(userInput) {
    if (userInput) {
        if (cityList.indexOf(userInput) === -1) {
            cityList.push(userInput);
            listArray();
            clearHistory.removeClass("hide");
            weatherContent.removeClass("hide");
        } else {
            var removeIndex = cityList.indexOf(userInput);
            cityList.splice(removeIndex, 1);
            cityList.push(userInput);
            listArray();
            clearHistory.removeClass("hide");
            weatherContent.removeClass("hide");
        }
    }
}

// List the cities in the search history
function listArray() {
    searchHistory.empty();
    cityList.forEach(function(city) {
        var searchItem = $('<li class="list-group-item city-btn">');
        searchItem.attr("data-value", city);
        searchItem.text(city);
        searchHistory.prepend(searchItem);
    });
    localStorage.setItem("cities", JSON.stringify(cityList));
}

// Grabs list of cities from local storage
function initializeHistory() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        listArray();
        if (cityList.length !== 0) {
            currentWeather(cityList[lastIndex]);
            weatherContent.removeClass("hide");
        }
    }
}

// Checks elements to in search history to show clear button
function showClear() {
    if (searchHistory.text() !== "") {
        clearHistory.removeClass("hide");
    }
}