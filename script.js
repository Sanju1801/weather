var inputValue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "3171ff394ca126b7df6bc0a63dea52a0";

function convert(val) {
    return (val - 273.15).toFixed(2);     // formula to convert Kelvin to Celsius
}

btn.addEventListener('click', function() {
    var cityName = inputValue.value;
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    // Fetch weather data from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            var nameVal = data['name'];
            var descrip = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var windSpeed = data['wind']['speed'];

            city.innerHTML = `Weather of <span>${nameVal}</span>`;
            temp.innerHTML = `Temperature: <span>${convert(temperature)}°C</span>`;
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windSpeed} m/s</span>`;
        })
        .catch(err => {
            alert('You entered a wrong city name or there was a problem with the request.');
            console.error(err);
        });
});
