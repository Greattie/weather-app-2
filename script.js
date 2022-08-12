const api = "619a074eba1f5b1661179dd6818eb12e";
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const cityEl = document.getElementById("city");
const cloudEl = document.getElementById("cloud");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const iconEl = document.getElementById("icon");
const descEl = document.getElementById("description");
const tempEl = document.getElementById("temp");
const form = document.getElementById("location-search");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          showWeather(data);
        });
    });
  } else {
    alert("Unable to get your location");
  }

  function showWeather(data) {
    const { temp } = data.main;
    const { all } = data.clouds;
    const { humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];

    cloudEl.innerText = all + "%";
    windEl.innerText = speed + "km/hr";
    tempEl.innerText = temp + "℃";
    humidityEl.innerText = humidity + "%";
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descEl.innerText = description;

    function getCity() {
      let city_name = "Lagos";
      let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api}`;
      fetch(cityUrl)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          showCity(data);
        });

      function showCity(data) {
        const { place } = data.name;
        console.log(place);
        // if (city_name === place) {
        //   cityEl.innerText = place;
        // }
        //else {
        //   // getWeather(getCity());
        // }
      }
    }
    getCity();

    let cityInput = "Lagos";
    cities.forEach((city) => {
      city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        console.log(cityInput);
        showWeather();
      });
    });
  }
}

getWeather();

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityEl.innerText = search.value;
    getWeather();
    search.value = "";
  }
  e.preventDefault();
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);
