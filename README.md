# Weather Dashboard - Per City (Current and 5-Day Forecast)

## Links
Github Link:
https://github.com/liamok19/weatherDashboard.git

        Contact Information in the below link:

Website Link:
https://liamok19.github.io/weatherDashboard/


## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```


## Table of Contents
- [Strategy](#strategy)
- [Assets](#assets)
- [Links](#links)
- [Technologies Implemented](#Technologies)
- [Credits](#credits)
- [License](#license)


### State of Play - Strategy

| Task       | Progress      | 
| ------------- |:-------------:| 
| Build HTML containers based on mockup provided by lead. | Completed | 
| Search field container to allow user to search a City. | Completed | 
| Present that above searched city with current weather conditions 1 container and 5 furture panels with weather conditions in another container. | Completed | 
| The city searched must be saved to local storage able listed once you refresh. Also click sensitive so a user can call on that city's weather fields again | Completed | 
| The fields for the city search must contain: city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index | Completed | 
| UV index colour changes colour based on favorable, moderate, or severe | Completed  | 
| Apply additional CSS. Not required but would like to have | InP  | 


## Assets
![weatherdashboardref](./assets/images/WeatherDashboard.gif)

## Technologies:
- HTML 
- CSS
- JavaScript 
- Jquery
- moment.js
- Bootstrap 
- Github

## Credits

Based on the research I found the following sources that I would like to credit for this project: 
| Source        | Platform      | Other  |
| ------------- |:-------------:| -----:|
|  iEatWebsites | Youtube      | TItle: LocalStorage for beginners (HTML and Javascript)
  | 
| #ask your classmaters | Slack      |Conversations between instructors and classmates |
| Tutor: Renato Stretti | USYD: Zoom Private Class    | Title:Sunday Session. UVI linking |
| Code Explained  |  Youtube  |Title: Create a Weather App Using JavaScript, HTML and CSS | JavaScript Project For Beginners |
| Talented Developer  |  Yotube   | Title: 3 Ways to Convert Int to String in Java
|
| Ranjan-Beginner's Guide  |  Yotuve   | Title:5-Days Weather Application using Simple JavaScript | Weather Application
 |
 |WSchools| Tutorial |JavaScript if...else '+' JavaScript if else and else if '+' JavaScript Comparison and Logical Operators '+' JavaScript For Loop '+' Web APIs - Introduction |


## License
- Existing projects and communities, this README file is publicly open for reference and review. 


## Notes
11/01/2022 - Build HTML, CSS and JS files. Use the search field completed in the dayplanner as a base for the city field.  I have created the API key ID for the openweather app. Initially it came up with a 404 that's no longer the case but I have a 401. The doc mentioned it's because the ID need a couple of hours for it process. Once I have that I can look back into the fetchAPI URL.
Notes for pickup: Display previous searches from the API search. https://openweathermap.org/faq#error401 

12/01/2022 - Reviewed process in JS and research more on what was the purpose of the fetch. Also the API key is now working. Rolling this out.

14/01/2022 
current and furture forecast is shwoging everything other then the date and the icon. Need to research how to convert the interger field I can grab from the API and convert into a JSON string. The icons for each weathr is my next focus. Oustanding task are:
- Icons on the furture weather forcast 
- UVI index for current weather only 
- Date for each day 
- local storgae for previous searches and then calling those previous searched cities to display weather information again. 

15/01/2022
Need to call the UVI link from the main currentforecats link by using lat and lon. Wiht those fields you can fetch the UVI data. 
