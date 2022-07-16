import { capitalizeFirstLetter, metric, windDirection } from "./index.js";
import lightFormat from "date-fns/lightFormat";

function populateTodayForecast(data) {
  let locale = navigator.language;
  const todayName = document.querySelector(".city-name");
  const todayDate = document.querySelector(".today-date");
  const todayImg = document.querySelector(".today-weather-img");
  const todayTemp = document.querySelector(".temp");
  const todayFeels = document.querySelector(".temp-today-feel");
  const todayDes = document.querySelector(".today-des");
  const todayWind = document.querySelector(".today-wind");
  const todayWindDirection = document.querySelector(".today-wind-direction");
  const todayVisibility = document.querySelector(".today-visibility");
  const todayPressure = document.querySelector(".today-pressure");
  const todayHumidity = document.querySelector(".today-humidity");
  const todayCloudness = document.querySelector(".today-cloudness");
  const todaySunrise = document.querySelector(".today-sunrise");
  const todaySunset = document.querySelector(".today-sunset");
  const todayArrow = document.querySelector(".today-wind-arrow");
  const header = document.querySelector(".header");
  // getPhoto(data.weather[0].description).then((imgURL) => {
  //   header.style.backgroundImage = `url(${imgURL})`;
  // });
  let fullDateMs = new Date(data.dt * 1000);
  let date = fullDateMs.toLocaleString(locale);
  let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(locale);
  let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(locale);
  todayName.innerText = `${data.name}, ${data.sys.country}`;
  todayName.dataset.lat = data.coord.lat;
  todayName.dataset.lon = data.coord.lon;
  todayDate.innerHTML = date;
  todayImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  todayTemp.innerText = Math.round(data.main.temp);
  todayFeels.innerText = Math.round(data.main.feels_like);
  todayDes.innerText = capitalizeFirstLetter(data.weather[0].description);
  todayWind.innerText = data.wind.speed;
  todayWindDirection.innerText = windDirection(data.wind.deg);
  todayVisibility.innerText = data.visibility / 1000;
  todayPressure.innerText = data.main.pressure;
  todayHumidity.innerText = data.main.humidity;
  todayCloudness.innerText = data.clouds.all;
  todaySunrise.innerText = sunrise;
  todaySunset.innerText = sunset;
  todayArrow.style.transform = `rotate(${data.wind.deg + 180}deg)`;
}

export { populateTodayForecast };
