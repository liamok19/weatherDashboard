//when user types in search field local storage saves it for listing purposes but all display weather snippets.
var button = document.querySelector(".searchBtn");
var inputValue = document.querySelector(".inputValue");
var languageButtonsEl = document.getElementById("#language-buttons");

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

//future container variables
//Day 1
var day1date = document.querySelector(".futuredate");
var day1futuretempEl = document.querySelector(".futuretemp1");
var day1futurewindEl = document.querySelector(".futurewind1");
var day1futurehumidityEl = document.querySelector(".futurehumidity1");
//Day2
var day2futuretempEl = document.querySelector(".futuretemp2");
var day2futurewindEl = document.querySelector(".futurewind2");
var day2futurehumidityEl = document.querySelector(".futurehumidity2");
//Day 3
var day3futuretempEl = document.querySelector(".futuretemp3");
var day3futurewindEl = document.querySelector(".futurewind3");
var day3futurehumidityEl = document.querySelector(".futurehumidity3");
//Day 4
var day4futuretempEl = document.querySelector(".futuretemp4");
var day4futurewindEl = document.querySelector(".futurewind4");
var day4futurehumidityEl = document.querySelector(".futurehumidity4");
//Day 5
var day5futuretempEl = document.querySelector(".futuretemp5");
var day5futurewindEl = document.querySelector(".futurewind5");
var day5futurehumidityEl = document.querySelector(".futurehumidity5");

//when the searchbutton is click the current weather will be listed and the future forecast
var displayCity = button;

function getSavedLocations() {
    // Pull out the recent locations (if they exist) from the local storage
    var recentLocations = localStorage.getItem("myRecentLocations");
    if (!recentLocations) {
        recentLocations = [];
    } else {
        // if we're here, it exists - convert it from a JSON string to a javascript array
        recentLocations = JSON.parse(recentLocations);
    }

    return recentLocations;
}

function refreshCityList() {
    var recentLocations = getSavedLocations();

    document.getElementById("city-container").innerHTML = "";
    recentLocations.forEach((location) => {
        var newButton = document.createElement("button");
        newButton.classList.add("pageRefreshText0");
        newButton.innerText = location;
        newButton.addEventListener("click", () => lookupWeather(location));

        document.getElementById("city-container").appendChild(newButton);
    });
}

function lookupWeather(location) {
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" + location + APIKey
    )
        .then((response) => response.json())
        // .then(data => console.log (data))
        .then((data) => {
            console.log("data", data);
            var nameValue = data["name"];
            var descValue = data["weather"][0]["description"];
            var tempValue = data["main"]["temp"];
            var windValue = data["wind"]["speed"];
            var humidityValue = data["main"]["humidity"];   
            var latitude = data ['coord']['lat'];
            var longitude = data ['coord']['lon'];

            dateEL.innerHTML = moment().format("MMM Do YY");
            cityNameEl.innerHTML = nameValue;
            descEl.innerHTML = "Weather Description: " + descValue;
            tempEl.innerHTML = "Temp: " + tempValue + "F";
            windEl.innerHTML = "Wind: " + windValue + "MPH";
            humidityEl.innerHTML = "Humidity: " + humidityValue + "%";

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + APIKey)

                .then(response => response.json())
                // .then(data => console.log (data))
                .then(data => {
                    var uvIndexValue = data ['current']['uvi'];
                    uvIndex.innerHTML=uvIndexValue;
                    console.log(data);
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
    
    var datELtomorrow = document.querySelector(".dateDay0");
    var datELday3 = document.querySelector(".dateDay1");
    var datELday4 = document.querySelector(".dateDay2");
    var datELday5 = document.querySelector(".dateDay3");
    var datELday6 = document.querySelector(".dateDay4");

    var iconURL = "http://openweathermap.org/img/wn/";

    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" + location + APIKey
    )
        .then((response) => response.json())
        // .then(data => console.log (data))
        .then((data) => {
            datELtomorrow.innerHTML = moment().add(1, "days").calendar();
            datELday3.innerHTML = moment().add(2, "days").calendar();
            datELday4.innerHTML = moment().add(3, "day   s").calendar();
            datELday5.innerHTML = moment().add(4, "days").calendar();
            datELday6.innerHTML = moment().add(5, "days").calendar();
            // var iconurl = 'http://openweathermap.org/img/wn/';

            for (i = 0; i < 5; i++) {
                var currentDay = data["list"][i + 1];

                var iconImage = document.getElementById("wicon" + i);
                var futuretemp = document.querySelector(".futuretemp" + i);
                var futurewind = document.querySelector(".futurewind" + i);
                var futurehumidity = document.querySelector(".futurehumidity" + i);

                var weatherIcon = currentDay["weather"][0]["icon"];
                var iconSrc = iconURL + weatherIcon + ".png";
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


button.addEventListener("click", function (event) {
    event.preventDefault();

    let location = inputValue.value;

    // 1. Do a lookup
    lookupWeather(location);

    // 2. Add to recent locations
    let recentLocations = getSavedLocations();

    // adds it to the start of the array
    recentLocations.unshift(location);

    // convert the javascript array to a JSON string and save it in the local storage
    localStorage.setItem("myRecentLocations", JSON.stringify(recentLocations));

    // 3. Display recent locations
    refreshCityList();

    return;
});

refreshCityList();
