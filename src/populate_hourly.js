import {
  metric,
  capitalizeFirstLetter,
  windDirection,
  dataLang,
} from "./index.js";
import lightFormat from "date-fns/lightFormat";

const hourlyForecast = document.querySelector(".hourly-forecast");
const hourTemplate = document.querySelector(".hour-template");

function populateHourly(data, lang) {
  let locale = navigator.language;
  hourlyForecast.innerHTML = "";
  for (let i = 0; i < data.hourly.length; i++) {
    const hourlyElement = document.importNode(hourTemplate.content, true);
    const hourlyTime = hourlyElement.querySelector(".hourly-time");
    const hourlyImg = hourlyElement.querySelector(".hourly-img");
    const hourlyTemp = hourlyElement.querySelector(".hourly-temp");
    const hourlyFeels = hourlyElement.querySelector(".hourly-feels");
    const hourlyDes = hourlyElement.querySelector(".hourly-des");
    const hourlyArrow = hourlyElement.querySelector(".wind-arrow-hourly");
    const hourlyWind = hourlyElement.querySelector(".wind-speed-hourly");
    const hourlyPop = hourlyElement.querySelector(".pop-hourly");
    const hourlyPressure = hourlyElement.querySelector(".pressure-hourly");
    const hourlyCloudness = hourlyElement.querySelector(".cloudness-hourly");
    const hourlyWindDirection = hourlyElement.querySelector(
      ".wind-direction-hourly"
    );
    const langPressure = hourlyElement.querySelector(".lang-pressure");
    const langFeels = hourlyElement.querySelector(".lang-feels");
    const dim = hourlyElement.querySelectorAll(".dim");
    const dimSpeed = hourlyElement.querySelectorAll(".speed-dim");
    for (let i = 0; i < dim.length; i++) {
      if (metric == true) {
        dim[i].innerText = "℃";
      } else {
        dim[i].innerText = "°F";
      }
    }
    for (let i = 0; i < dimSpeed.length; i++) {
      if (metric == true) {
        dimSpeed[i].innerText = dataLang[lang].speed.metric;
      } else {
        dimSpeed[i].innerText = dataLang[lang].speed.imperial;
      }
    }
    let full = new Date(data.hourly[i].dt * 1000);
    let time = full.toLocaleTimeString(locale);
    time = time.slice(0, 5);
    let hours = full.getHours();
    let date = full.getDate();
    let month = full.getMonth();
    let year = full.getYear();
    let fullDate = lightFormat(new Date(year, month, date), "dd.MM");
    if (hours === 0) {
      hourlyTime.innerText = fullDate;
    } else {
      hourlyTime.innerText = time;
    }
    hourlyImg.src = `http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png`;
    hourlyTemp.innerText = Math.round(data.hourly[i].temp);
    hourlyFeels.innerText = Math.round(data.hourly[i].feels_like);
    hourlyDes.innerText = capitalizeFirstLetter(
      data.hourly[i].weather[0].description
    );
    hourlyArrow.style.transform = `rotate(${data.hourly[i].wind_deg + 180}deg)`;
    hourlyWind.innerText = data.hourly[i].wind_speed.toFixed(1);
    hourlyWindDirection.innerText = windDirection(
      data.hourly[i].wind_deg,
      lang
    );
    hourlyPop.innerText = Math.round(data.hourly[i].pop * 100);
    hourlyPressure.innerText = data.hourly[i].pressure;
    hourlyCloudness.innerText = data.hourly[i].clouds;
    langPressure.innerText = dataLang[lang].pressure;
    langFeels.innerText = dataLang[lang].feels;

    hourlyForecast.append(hourlyElement);
  }
}

export { populateHourly };
