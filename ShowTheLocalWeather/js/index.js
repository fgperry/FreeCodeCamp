//infosniper.net
$(document).ready(getLocationIpInfo);
var cityLocation = document.getElementById('cityLocation');
var temperature = document.getElementById('temperature');
var minMax = document.getElementById('minMax');
var weatherTypeBody = document.getElementById('weatherType');
var weatherIcon = document.getElementById('weatherIcon');
var temperatureState = "F";
var temperatureValue
//Not yet implemented
//var minTemperatureValue, maxTemperatureValue
var city
var state
var country
var weather
var latitude
var longitude
var apiKey = privateApiKey.openWeatherApiKey;
var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

// Uses http://ipinfo.io/ JQuery
//
// Return Example
// "ip": "203.205.28.14",
// "hostname": "static.cmcti.vn",
// "city": "Ho Chi Minh City",
// "region": "Ho Chi Minh City",
// "country": "VN",
// "loc": "10.8142,106.6438",
// "org": "AS45903 CMC Telecom Infrastructure Company"
function getLocationIpInfo() {
  $.getJSON('http://ipinfo.io', function(data) {

    city = data.city;
    state = data.region;
    country = data.country;
    var latLong = (data.loc).split(',');
    latitude = latLong[0];
    longitude = latLong[1];
    weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
    document.body.style.backgroundImage = "url('https://dl.dropboxusercontent.com/u/1995747/sunny.jpg')";
    cityLocation.innerHTML = city + ", " + state + ", " + country;
    getWeather();
  })
  .fail(function() {
			alert("Location not found! Please enable location based services.");
    console.log( "error" );
  })
}

function getWeather() {
  $.ajax({
    url: weatherApiUrl,
    dataType: "jsonp",
    success: function(result) {
      weather = result.weather[0].main;
      temperatureValue = result.main.temp.toFixed(0);
      //minTemperatureValue = result.main.temp_min.toFixed(0);
      //maxTemperatureValue = result.main.temp_max.toFixed(0);
      temperature.innerHTML = 'Current: ' + temperatureValue + ' <sup>o</sup>' + temperatureState;
      console.log(weather)
      console.log('http://openweathermap.org/img/w/'+result.weather[0].icon)
      console.log('here')
      console.log(weatherIcon.src)
      weatherIcon.src = 'http://openweathermap.org/img/w/'+result.weather[0].icon+'.png';
      console.log(weatherIcon.src)
      console.log(weatherTypeBody.innerHTML)
      //.append('<img src=' + weatherIcon.src + '/>')
  weatherTypeBody.append(weather);
      console.log(weatherTypeBody.innerHTML)
      weatherIcon.setAttribute("src", weatherIcon.src);
      console.log(weatherTypeBody.innerHTML)
      //minMax.innerHTML = 'Min: ' + minTemperatureValue + ' <sup>o</sup>' + temperatureState + ' / ' + 'Max: ' + maxTemperatureValue + ' <sup>o</sup>' + temperatureState;
      $('#switch').bootstrapToggle('enable');
      setBackgroundImage(weather);
    },
    error: function(errorCode) {
      alert("Search failed.")
    },

  });
}

function setBackgroundImage(weather) {
  weather = weather.toLowerCase();
  var weatherType = "N/A;"
  switch (weather) {
    case "thunderstorm":
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1MUo3eUp6RzI0ekU";
      break;
    case "drizzle":
    case "rain":
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1aEpzTk5OV1dNaHM";
      break;
    case "snow":
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1Qlh1VGxCQkFQUUE";
      break;
    case "clear":
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1YTU0aklxWXlWX2c";
      break;
    case "clouds":
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1MUY0N3NmbDBZSjQ";
      break;
    default:
      weatherType = "https://drive.google.com/uc?export=view&id=0B5l-IQ_jrWx1Qnd0WjgtU2lmMm8";
      break;
  }
  document.body.style.backgroundImage = 'url(' + weatherType + ')';
}

function changeUnits() {
  if (temperatureState == "F") {
    temperatureValue = ((temperatureValue - 32) * 5 / 9).toFixed(0);
    //minTemperatureValue = ((minTemperatureValue - 32) * 5 / 9).toFixed(0);
    //maxTemperatureValue = ((maxTemperatureValue - 32) * 5 / 9).toFixed(0);
    temperatureState = "C";
  } else {
    temperatureValue = (temperatureValue * 1.8 + 32).toFixed(0);
    //minTemperatureValue = (minTemperatureValue * 1.8 + 32).toFixed(0);
    //maxTemperatureValue = (maxTemperatureValue * 1.8 + 32).toFixed(0);
    temperatureState = "F";
  }
  document.getElementById("temperature").innerHTML = 'Current: ' + temperatureValue + ' <sup>o</sup>' + temperatureState;
  minMax.innerHTML = 'Min: ' + minTemperatureValue + ' <sup>o</sup>' + temperatureState + ' / ' + 'Max: ' + maxTemperatureValue + ' <sup>o</sup>' + temperatureState;
}

$(function() {
  $('#switch').change(function() {
    changeUnits();
  })
})

document.addEventListener("touchstart", function() {}, true)
