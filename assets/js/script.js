//when user types in search field local storage saves it for listing purposes but all display weather snippets. 
var button = document.querySelector('.searchBtn');
var inputValue = document.querySelector('.inputValue');

//current container variables
var cityNameEl = document.querySelector('.name');
var descEl = document.querySelector('.desc');
var tempEl= document.querySelector('.temp');
var uvIndex = document.querySelector('.uvIndex');
var windEl = document.querySelector('.wind');
var humidityEl = document.querySelector('.humidity');

//future container variables
var day1futureNameEl = document.querySelector('.futurename1');
var day1futuredescEl = document.querySelector('.futuredesc1');
var day1futuretempEl= document.querySelector('.futuretemp1');
var day1futurewindEl = document.querySelector('.futurewind1');
var day1futurehumidityEl = document.querySelector('.futurehumidity1');
var day1futureuvIndex = document.querySelector('.futureuvIndex1');

var day2futureNameEl = document.querySelector('.futurename2');
var day2futuredescEl = document.querySelector('.futuredesc2');
var day2futuretempEl= document.querySelector('.futuretemp2');
var day2futurewindEl = document.querySelector('.futurewind2');
var day2futurehumidityEl = document.querySelector('.futurehumidity2');
var day2futureuvIndex = document.querySelector('.futureuvIndex2');


button.addEventListener('click', function(event){ 
    event.preventDefault()

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=00b640b6c43ad18944cc842b8bce44fb')
    .then(response => response.json())
    // .then(data => console.log (data))
    .then(data => {
        var nameValue = data ['name'];
        var descValue = data ['weather'][0]['description'];
        var tempValue = data ['main']['temp'];
        // var uvIndexValue = data ['id'];
        var windValue = data ['wind']['speed'];
        var humidityValue = data  ['main']['humidity'];

        cityNameEl.innerHTML=nameValue;
        descEl.innerHTML=descValue;
        tempEl.innerHTML=tempValue;
        // uvIndex.innerHTML=uvIndexValue;
        windEl.innerHTML=windValue;
        humidityEl.innerHTML=humidityValue;
        })
        
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=00b640b6c43ad18944cc842b8bce44fb')
        .then(response => response.json())
        // .then(data => console.log (data))
        .then(data => {
            //data attribute for furture forecast 
            var day1futurenameValue = data ['city']['name'];
            var day1futuredescValue = data ['list'][0]['weather'][0]['description'];
            var day1futuretempValue = data ['list'][0]['main']['temp'];
            var day1futurewindValue = data ['list'][0]['wind']['speed'];
            var day1futurehumidityValue = data ['list'][0]['main']['humidity'];
            var day1futureuvIndexValue = data ['city']['coord']['lat','lon'];

            day1futureNameEl.innerHTML=day1futurenameValue;
            day1futuredescEl.innerHTML=day1futuredescValue;
            day1futuretempEl.innerHTML=day1futuretempValue;
            day1futurewindEl.innerHTML=day1futurewindValue;
            day1futurehumidityEl.innerHTML=day1futurehumidityValue;
            day1futureuvIndex.innerHTML=day1futureuvIndexValue;

            var day2futurenameValue = data ['city']['name'];
            var day2futuredescValue = data ['list'][1]['weather'][0]['description'];
            var day2futuretempValue = data ['list'][1]['main']['temp'];
            var day2futurewindValue = data ['list'][1]['wind']['speed'];
            var day2futurehumidityValue = data ['list'][1]['main']['humidity'];
            var day2futureuvIndexValue = data ['city']['coord']['lat','lon'];

            day2futureNameEl.innerHTML=day2futurenameValue;
            day2futuredescEl.innerHTML=day2futuredescValue;
            day2futuretempEl.innerHTML=day2futuretempValue;
            day2futurewindEl.innerHTML=day2futurewindValue;
            day2futurehumidityEl.innerHTML=day2futurehumidityValue;
            day2futureuvIndex.innerHTML=day2futureuvIndexValue;


        })

    .catch(err => alert("City Name undefined"))
})
