//type field for the user to type into and a button for the user to save their content.
var button = document.querySelector(".searchBtn");
var inputValue = document.querySelector(".inputValue");

//APIKey to call on for later
var APIKey = "&appid=00b640b6c43ad18944cc842b8bce44fb";

//current container variables
var cityNameEl = document.querySelector(".name");
var descEl = document.querySelector(".desc");
var tempEl = document.querySelector(".temp");
var uvIndex = document.querySelector(".uvIndex");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var dateEL = document.querySelector(".date");

//future container variables. Vanilla JS without using a for loop. This was the original process and I would like to keep it in the JS as a reminder of the 2 options. 
//Day 1
// var day1date = document.querySelector(".futuredate");
// var day1futuretempEl = document.querySelector(".futuretemp1");
// var day1futurewindEl = document.querySelector(".futurewind1");
// var day1futurehumidityEl = document.querySelector(".futurehumidity1");
// //Day2
// var day2futuretempEl = document.querySelector(".futuretemp2");
// var day2futurewindEl = document.querySelector(".futurewind2");
// var day2futurehumidityEl = document.querySelector(".futurehumidity2");
// //Day 3
// var day3futuretempEl = document.querySelector(".futuretemp3");
// var day3futurewindEl = document.querySelector(".futurewind3");
// var day3futurehumidityEl = document.querySelector(".futurehumidity3");
// //Day 4
// var day4futuretempEl = document.querySelector(".futuretemp4");
// var day4futurewindEl = document.querySelector(".futurewind4");
// var day4futurehumidityEl = document.querySelector(".futurehumidity4");
// //Day 5
// var day5futuretempEl = document.querySelector(".futuretemp5");
// var day5futurewindEl = document.querySelector(".futurewind5");
// var day5futurehumidityEl = document.querySelector(".futurehumidity5");

//func to call the saveLocations. By getting the field from the myRecentLocaions Key 
function getSavedLocations() {
    // Pull out the recent locations (if they exist) from the local storage
    var recentLocations = localStorage.getItem("myRecentLocations");
    //if recent locations has no properties currently then keep it at a empty array
    if (!recentLocations) {
    //empty array for the above if statement    
        recentLocations = [];
    } else {
        // if we're here, it exists - convert it from a JSON string to a javascript array
        recentLocations = JSON.parse(recentLocations);
    }
    return recentLocations;
}

//function to call the save the locations. 
function refreshCityList() {
    var recentLocations = getSavedLocations();

    document.getElementById("city-container").innerHTML = "";
    recentLocations.forEach((location) => {
        //creating a button element for the click function that way we can run the lookupweather call again. 
        var newButton = document.createElement("button");
        newButton.classList.add("pageRefreshText0");
        newButton.innerText = location;
        //when the new button that displays the previous looked up location has been clicked then look for the fucntion 'lookupWeather' and run that
        newButton.addEventListener("click", () => lookupWeather(location));
        //append the new button to the innerHTML container.
        document.getElementById("city-container").appendChild(newButton);
    });
}

//fetching the data for the current and furture forecast. Calling the fucntion lookupWeather
function lookupWeather(location) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + APIKey //applying APIkey variable as the end parameter as per documentation from openweathermap.com
    )
        .then((response) => response.json())
        // .then(data => console.log (data))
        .then((data) => {
            console.log("data", data);
            //the below variables are equal to the field we're looking at fetching from openweaher map
            var nameValue = data["name"];
            var descValue = data["weather"][0]["description"];
            var tempValue = data["main"]["temp"];
            var windValue = data["wind"]["speed"];
            var humidityValue = data["main"]["humidity"]; 
            //lat and lon variables are required for the script so we can call on them in the future  
            var latitude = data ['coord']['lat'];
            var longitude = data ['coord']['lon'];
            //once the variable is pointing to a field that we're fetching below we're assigning the HTML element it's property. Symbols, letters and desription additions have been added for the user 
            dateEL.innerHTML = moment().format("MMM Do YY");
            cityNameEl.innerHTML = nameValue;
            descEl.innerHTML = "Weather Description: " + descValue;
            tempEl.innerHTML = "Temp: " + tempValue + "F";
            windEl.innerHTML = "Wind: " + windValue + "MPH";
            humidityEl.innerHTML = "Humidity: " + humidityValue + "%";
            //we're fetching the UVI for the search city an dusing the lat and lon from the previous fetch URL>
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + APIKey)

                .then(response => response.json())
                // .then(data => console.log (data))
                .then(data => {
                    //fetching the field data from the UVI API 
                    var uvIndexValue = data ['current']['uvi'];
                    uvIndex.innerHTML=uvIndexValue;
                    console.log(data);
                //if and else statement: If the UVI value is above red and background red is presented. Above 6 is orange and 'else' is green  
                    if (uvIndexValue > 10 ) {
                        uvIndex.style.backgroundColor = '#d86666';
                    } else if (uvIndexValue > 6) {
                        uvIndex.style.backgroundColor = '#ffb600';
                    }
                    else {
                        uvIndex.style.backgroundColor = '#c9d3a6';
                    }

                });
    });
    
    //variables for the date time for each furture forecast container.
    var datELtomorrow = document.querySelector(".dateDay0");
    var datELday3 = document.querySelector(".dateDay1");
    var datELday4 = document.querySelector(".dateDay2");
    var datELday5 = document.querySelector(".dateDay3");
    var datELday6 = document.querySelector(".dateDay4");

    //creating a global scope variable to attache to the start of the iconSrc
    var iconURL = "https://openweathermap.org/img/wn/";

    // fetching the future forcast with API key
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + location + APIKey
    )
        .then((response) => response.json())
        // .then(data => console.log (data))
        .then((data) => {
            //moment.js has been applied. But the function will be applied when with the search button or a myRecentLocations button has been 'clicked'
            datELtomorrow.innerHTML = moment().add(1, "days").calendar();
            datELday3.innerHTML = moment().add(2, "days").calendar();
            datELday4.innerHTML = moment().add(3, "day   s").calendar();
            datELday5.innerHTML = moment().add(4, "days").calendar();
            datELday6.innerHTML = moment().add(5, "days").calendar();
            // var iconurl = 'http://openweathermap.org/img/wn/';
            //for loop for each field of the furture forecast. Index = I. 
            for (i = 0; i < 5; i++) {
                //currentDay has already been called. Therefore a + 1 was added so that the first index called for starts 'tomorrow'
                var currentDay = data["list"][i + 1];
                
                var iconImage = document.getElementById("wicon" + i);
                var futuretemp = document.querySelector(".futuretemp" + i);
                var futurewind = document.querySelector(".futurewind" + i);
                var futurehumidity = document.querySelector(".futurehumidity" + i);

                var weatherIcon = currentDay["weather"][0]["icon"];
                var iconSrc = iconURL + weatherIcon + ".png";
                //setattribute of the Image Src to the weathericon provided on openweathermap
                iconImage.setAttribute("src", iconSrc);

                var futuretempValue = currentDay["main"]["temp"];
                futuretemp.innerHTML = "Temp: " + futuretempValue + "F";

                var windValue = currentDay['wind']['speed'];
                futurewind.innerHTML = "Wind: " + windValue + "MPH";

                var humidityValue = currentDay['main']['humidity'];
                futurehumidity.innerHTML = "Humidity: " + humidityValue + "%"


            }
        })
        .catch((err) => {
            // console.log("caught errr", err);
            alert("City Name undefined");
        });
}

//click event provided from the search button
button.addEventListener("click", function (event) {
    event.preventDefault();

    let location = inputValue.value;

    // 1. Do a lookup and running the function for the current furture forecast
    lookupWeather(location);

    // 2. Add to recent locations. 
    let recentLocations = getSavedLocations();

    // adds it to the start of the array
    recentLocations.unshift(location);

    // convert the javascript array to a JSON string and save it in the local storage
    localStorage.setItem("myRecentLocations", JSON.stringify(recentLocations));

    // 3. Display recent locations
    refreshCityList();

    return;
});

//calling refresh city List again so on page load it picks up new search.  
refreshCityList();
