let weather = {
    apiKey: "5e26ef1d2e7209339190c0222ecfbd52",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("New Delhi");

/*{
   "coord":{
      "lon":77.33,
      "lat":28.58
   },
   "weather":[
      {
         "id":804,
         "main":"Clouds",
         "description":"overcast clouds",
         "icon":"04d"
      }
   ],
   "base":"stations",
   "main":{
      "temp":28.16,
      "feels_like":26.97,
      "temp_min":28.16,
      "temp_max":28.16,
      "pressure":1010,
      "humidity":24,
      "sea_level":1010,
      "grnd_level":987
   },
   "visibility":10000,
   "wind":{
      "speed":3.32,
      "deg":307,
      "gust":5.24
   },
   "clouds":{
      "all":93
   },
   "dt":1667461329,
   "sys":{
      "type":1,
      "id":9165,
      "country":"IN",
      "sunrise":1667437425,
      "sunset":1667477078
   },
   "timezone":19800,
   "id":7279746,
   "name":"Noida",
   "cod":200
}*/
