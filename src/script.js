function getWeather() {
  let cityName = "";
  let cityId = "";
  
  if (document.getElementById("cityNameRadio").checked) {
    cityName = document.getElementById("cityInput").value;
  } else if (document.getElementById("cityIdRadio").checked) {
    cityId = document.getElementById("cityInput").value;
  }

  let url = "";

  if (cityName) {
    url = "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURIComponent(cityName) + "&units=metric&appid=8f9da1715ab2ab6be29f69a268e937a3";
  } else if (cityId) {
    url = "https://api.openweathermap.org/data/2.5/weather?id=" +
      cityId + "&units=metric&appid=8f9da1715ab2ab6be29f69a268e937a3";
  }

  if (url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Ошибка: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        document.getElementById("temperature").textContent = data.main.temp;
        document.getElementById("windSpeed").textContent = data.wind.speed;
        document.getElementById("humidity").textContent = data.main.humidity;
        let weatherIcon = document.getElementById("weatherIcon");
        let iconCode = data.weather[0].icon;
        let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        weatherIcon.src = iconUrl;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
