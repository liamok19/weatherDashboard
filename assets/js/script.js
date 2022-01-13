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
var futureNameEl = document.querySelector('.futurename');
var futuredescEl = document.querySelector('.futuredesc');
var futuretempEl= document.querySelector('.futuretemp');
var futurewindEl = document.querySelector('.futurewind');
var futurehumidityEl = document.querySelector('.futurehumidity');
var futureuvIndex = document.querySelector('.futureuvIndex');

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
            var futurenameValue = data ['city']['name'];
            var futuredescValue = data ['list'][0]['weather']['description'];
            var futuretempValue = data ['list'][0]['main']['temp'];
            var futurewindValue = data ['list'][0]['wind']['speed'];
            var futurehumidityValue = data ['list'][0]['main']['humidity'];
            // var futureuvIndexValue = data ['id'];


            futureNameEl.innerHTML=futurenameValue;
            futuredescEl.innerHTML=futuredescValue;
            futuretempEl.innerHTML=futuretempValue;
            futurewindEl.innerHTML=futurewindValue;
            futurehumidityEl.innerHTML=futurehumidityValue;
            // futureuvIndex.innerHTML=futureuvIndexValue;
        })

    .catch(err => alert("City Name undefined"))
})
