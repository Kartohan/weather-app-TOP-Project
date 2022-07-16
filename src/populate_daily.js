import { metric, capitalizeFirstLetter, windDirection } from "./index.js";

const dailyForecast = document.querySelector(".daily-forecast");
const dailyTemplate = document.querySelector(".daily-template");

function populateDaily(data) {
  let locale = navigator.language;
  dailyForecast.innerHTML = "";
  for (let i = 0; i < data.daily.length; i++) {
    const dailyElement = document.importNode(dailyTemplate.content, true);
    const dailyTime = dailyElement.querySelector(".daily-time");
    const dailyImg = dailyElement.querySelector(".daily-img");
    const dailyDayTemp = dailyElement.querySelector(".daily-day-temp");
    const dailyNightTemp = dailyElement.querySelector(".daily-night-temp");
    const dailyFeelsDay = dailyElement.querySelector(".daily-feels-day");
    const dailyFeelsNight = dailyElement.querySelector(".daily-feels-night");
    const dailyDes = dailyElement.querySelector(".daily-des");
    const dailyArrow = dailyElement.querySelector(".wind-arrow-daily");
    const dailyWindSpeed = dailyElement.querySelector(".daily-wind-speed");
    const dailyHumidity = dailyElement.querySelector(".humidity-daily");
    const dailyCloudness = dailyElement.querySelector(".cloudness-daily");
    const dailyPressure = dailyElement.querySelector(".pressure-daily");
    const dailySunrise = dailyElement.querySelector(".sunrise-daily");
    const dailySunset = dailyElement.querySelector(".sunset-daily");
    const dailyMoonrise = dailyElement.querySelector(".moonrise-daily");
    const dailyMoonset = dailyElement.querySelector(".moonset-daily");
    const dim = dailyElement.querySelectorAll(".dim");
    const dimSpeed = dailyElement.querySelectorAll(".dim-speed");
    const dailyWindDirection = dailyElement.querySelector(
      ".daily-wind-direction"
    );
    for (let i = 0; i < dim.length; i++) {
      if (metric == true) {
        dim[i].innerText = "℃";
      } else {
        dim[i].innerText = "°F";
      }
    }
    for (let i = 0; i < dimSpeed.length; i++) {
      if (metric == true) {
        dimSpeed[i].innerText = "m/s";
      } else {
        dimSpeed[i].innerText = "mph";
      }
    }
    let date = new Date(data.daily[i].dt * 1000).toLocaleString(locale);
    date = date.slice(0, 10);
    dailyTime.innerText = date;
    dailyImg.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
    dailyDayTemp.innerText = Math.round(data.daily[i].temp.day);
    dailyNightTemp.innerText = Math.round(data.daily[i].temp.night);
    dailyFeelsDay.innerText = Math.round(data.daily[i].feels_like.day);
    dailyFeelsNight.innerText = Math.round(data.daily[i].feels_like.night);
    dailyDes.innerText = capitalizeFirstLetter(
      data.daily[i].weather[0].description
    );
    dailyArrow.style.transform = `rotate(${data.daily[i].wind_deg + 180}deg)`;
    dailyWindSpeed.innerText = data.daily[i].wind_speed;
    dailyWindDirection.innerText = windDirection(data.daily[i].wind_deg);
    dailyHumidity.innerText = data.daily[i].humidity;
    dailyCloudness.innerText = data.daily[i].clouds;
    dailyPressure.innerText = data.daily[i].pressure;
    let sunriseDailyTime = new Date(
      data.daily[i].sunrise * 1000
    ).toLocaleTimeString(locale);
    let sunsetDailyTime = new Date(
      data.daily[i].sunset * 1000
    ).toLocaleTimeString(locale);
    let moonriseDailyTime = new Date(
      data.daily[i].moonrise * 1000
    ).toLocaleTimeString(locale);
    let moonsetDailyTime = new Date(
      data.daily[i].moonset * 1000
    ).toLocaleTimeString(locale);
    dailySunrise.innerText = sunriseDailyTime;
    dailySunset.innerText = sunsetDailyTime;
    dailyMoonrise.innerText = moonriseDailyTime;
    dailyMoonset.innerText = moonsetDailyTime;

    dailyForecast.append(dailyElement);
  }
}

export { populateDaily };
