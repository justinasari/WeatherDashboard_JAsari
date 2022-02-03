# WeatherDashboard_JAsari

## Table of Content
- About the Project
- Project Walkthrough
- Links
- Languages/APIs Used
- Updates

## About the Project
This is a project that utilizes a third-party API, OpenWeather One Call API, to retrieve weather data from selected cities. The project allows the user to search for a specific city's current weather and five day forecast. It displays the temperature, humidity, wind speed, UV index, as well as the current time for the user. Users are able to also include a state and country code following the city for a more precise call (Salem, OR, US or Salem, MA, US). The user's inputs are saved to local storage and is included in the search history column where they are able to click and retrieve the data once again. Once finished, the user can clear the history. 

The current weather data and five day forecast are hidden until a user inputs a city for the API to call. Once called, the display is shown with the appropriate data and values. The project also checks the local storage if there is data the user has left from a previous visit. If there are cities in the local storage, the clear button will show. The clear button will be hidden until a city is inputted from the user. Once the user clears the history, the clear button will be hidden.

When a user input is called, a function creates the cards, data, and value for the five day forecast display.

## Project Walkthrough
![Project GIF](https://im5.ezgif.com/tmp/ezgif-5-5af93c1ce9.gif)

## Links
- Working Page: https://justinasari.github.io/WeatherDashboard_JAsari/
- GitHub Repository: https://github.com/justinasari/WeatherDashboard_JAsari

## Languages/APIs Used
Thank you to OpenWeather's team for allowing the use of their API and their extensive data for everyone to use. If you are looking for a great database for various calls for weather forecasting, check their website; https://openweathermap.org/. 

- HTML, CSS, JS
- Bootstrap
- JQuery
- FontAwesome
    - https://fontawesome.com/
- Moment.js
    - https://momentjs.com/

## Updates
- 2/2/2022: Published on GitHub
- 2/3/2022: Fixed formatting and typo issues, and replaced single quotations with double due to faulty 5 Day Forecast and Current Humidity, Wind Speed, and UV calls.
- 2/3/2022: Polished README
- 2/3/2022: Added Wind Speed to 5 Day Forecast and Color Variation for Temperature.