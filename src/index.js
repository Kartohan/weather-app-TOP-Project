import "./style.css";
import { populateDaily } from "./populate_daily.js";
import { populateHourly } from "./populate_hourly.js";
import { populateTodayForecast } from "./populate_today_forecast.js";
import {
  getCoodrs,
  getFlag,
  getForecast,
  getForecastCurrent,
  getPhoto,
  fetchData,
} from "./fetch_data.js";
import { populateSearch } from "./populate_search.js";

// const searchInput = document.querySelector("#search");
// const searchOutput = document.querySelector(".search-output");

// searchInput.addEventListener("input", (e) => {
//   if (searchInput.value == null || searchInput.value === "") {
//     searchOutput.innerHTML = "";
//     return;
//   } else {
//     // populateSearch(getCoodrs(searchInput.value));
//     getCoodrs(searchInput.value).then((data) => populateSearch(data));
//   }
// });

// searchOutput.addEventListener("click", findForecast);

// function findForecast(e) {
//   if ((e.target.classList = "output")) {
//     searchInput.value = "";
//     searchOutput.innerHTML = "";
//     getForecast(e.target.dataset.lat, e.target.dataset.lon).then((data) =>
//       console.log(data)
//     );
//   }
// }
// function populateForecast(obj) {
//   const name = document.querySelector(".city-name");
//   const temp = document.querySelector(".temp");
//   const tempFeel = document.querySelector(".temp-feel");
//   name.innerText = obj.forecastCurrent.name;
//   temp.innerText = obj.forecastCurrent.main.temp;
//   tempFeel.innerText = obj.forecastCurrent.main.feels_like;
//   console.log(obj);
// }

// function populateSearch(arr) {
//   searchOutput.innerHTML = "";
//   arr.forEach((i) => {
//     const output = document.createElement("div");
//     output.classList.add("output");
//     output.dataset.lat = i.lat;
//     output.dataset.lon = i.lon;
//     const h2 = document.createElement("h2");
//     // if (i.local_names && i.local_names.uk) {
//     //   h2.innerText = i.local_names.uk;
//     // } else {
//     //   h2.innerText = i.name;
//     // }
//     h2.innerText = i.name;
//     const left = document.createElement("div");
//     left.classList.add("left-box");
//     const countryText = document.createElement("para");
//     countryText.innerText = `Country: ${i.country}`;
//     const para = document.createElement("p");
//     if (i.state) {
//       para.innerText = i.state;
//     } else {
//       para.innerText = "";
//     }
//     left.append(para, countryText);
//     output.append(h2, left);
//     searchOutput.append(output);
//   });
// }

// async function fetchData(url) {
//   try {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
// async function getFlag(url) {
//   try {
//     let img = await fetch(url);
//     if (img.ok) {
//       return img.url;
//     } else {
//       return;
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// async function getCoodrs(city) {
//   let data = await fetchData(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
//   );
//   return data;
// }

// async function getPhoto(query) {
//   try {
//     let data = await fetchData(
//       `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${query}&client_id=2HFabrQbOHDob2P2XG3G6gaEP7EDEYR2WcEVnqmnTbQ`
//     );
//     let randomPic = Math.floor(Math.random() * data.results.length);
//     return data.results[randomPic].urls.full;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
// async function getForecast(lat, lon, dim) {
//   if (dim === "metric") {
//     try {
//       let forecastDaily = await fetchData(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${dim}&exclude=alerts,current&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
//       );
//       return forecastDaily;
//     } catch (error) {
//       throw new Error(error);
//     }
//   } else if (dim === "imperial") {
//     try {
//       let forecastDaily = await fetchData(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${dim}&exclude=alerts,current&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
//       );
//       return forecastDaily;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }
// async function getForecastCurrent(lat, lon, dim) {
//   if (dim === "metric") {
//     try {
//       let forecastCurrent = await fetchData(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${dim}&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
//       );
//       return forecastCurrent;
//     } catch (error) {
//       throw new Error(error);
//     }
//   } else if (dim === "imperial") {
//     try {
//       let forecastCurrent = await fetchData(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${dim}&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
//       );
//       return forecastCurrent;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }

// getForecast(34, 54).then((data) => {
//   let dt = data.forecastCurrent.dt * 1000;
//   let date = new Date(dt);
//   console.log(date.toLocaleString("ru-RU"));
//   console.log(data);
// });
// getPhoto("clouds").then((data) => console.log(data));

// Search logic
const LOCAL_STORAGE_DIM_VALUE = "weather.dim";
const LOCAL_STORAGE_METRIC_VALUE = "weather.metric";
const controls = document.querySelector(".controls");
const city = document.querySelector(".city-name");
let metric = localStorage.getItem(LOCAL_STORAGE_METRIC_VALUE) || true;
let dimension = localStorage.getItem(LOCAL_STORAGE_DIM_VALUE) || "metric";
metric = JSON.parse(metric);
const dim = document.querySelectorAll(".dim");
if (metric === true) {
  const controlsMetric = controls.querySelector("[data-dim='metric']");
  controlsMetric.classList.add("active");
  dimension = "metric";
} else {
  const controlsMetric = controls.querySelector("[data-dim='imperial']");
  controlsMetric.classList.add("active");
  dimension = "imperial";
}
dim.forEach((dim) => {
  if (metric) {
    dim.innerText = "℃";
  } else {
    dim.innerText = "℉";
  }
});
const dimSpeed = document.querySelectorAll(".speed-dim");
dimSpeed.forEach((dimSpeed) => {
  if (metric === true) {
    dimSpeed.innerText = "m/s";
  } else {
    dimSpeed.innerText = "mph";
  }
});

controls.addEventListener("click", changeDim);
function changeDim(e) {
  if (e.target.className === "active") {
    return;
  } else {
    const controlsItems = document.querySelectorAll("[data-dim]");
    controlsItems.forEach((item) => (item.className = ""));
    if (e.target.dataset.dim === "metric") {
      e.target.classList.add("active");
      dimension = "metric";
      metric = true;
      dim.forEach((dim) => {
        dim.innerText = "℃";
      });
      dimSpeed.forEach((dimSpeed) => {
        dimSpeed.innerText = "m/s";
      });
      populateForecast(city.dataset.lat, city.dataset.lon, dimension);
      saveMetric();
    } else if (e.target.dataset.dim === "imperial") {
      e.target.classList.add("active");
      dimension = "imperial";
      metric = false;
      dim.forEach((dim) => {
        dim.innerText = "℉";
      });
      dimSpeed.forEach((dimSpeed) => {
        dimSpeed.innerText = "mph";
      });
      populateForecast(city.dataset.lat, city.dataset.lon, dimension);
      saveMetric();
    }
  }
}

function saveMetric() {
  localStorage.setItem(LOCAL_STORAGE_DIM_VALUE, dimension);
  localStorage.setItem(LOCAL_STORAGE_METRIC_VALUE, metric);
}

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search");
const searchOutput = document.querySelector(".search-ul");
// const searchTemplate = document.querySelector(".search-box-template");

searchForm.addEventListener("submit", searchSubmit);
window.onclick = (e) => {
  if (e.path.find((i) => i.className === "searchbox") === undefined) {
    searchOutput.innerHTML = "";
  }
};

function searchSubmit(e) {
  searchOutput.innerHTML = "";
  let i = 0;
  e.preventDefault();
  if (searchInput.value == null || searchInput.value === "") {
    return;
  } else {
    getCoodrs(searchInput.value).then((data) => {
      for (let i = 0; i < data.length; i++) {
        getForecastCurrent(data[i].lat, data[i].lon, dimension).then(
          (weather) => {
            populateSearch(data[i], weather);
          }
        );
      }
    });
  }
}

// function populateSearch(searchResponse, weatherResponse) {
//   const searchElement = document.importNode(searchTemplate.content, true);
//   const li = searchElement.querySelector("li");
//   const searchName = searchElement.querySelector(".name");
//   const searchCloud = searchElement.querySelector(".cloud");
//   const searchTemp = searchElement.querySelector(".search-temp");
//   const searchState = searchElement.querySelector(".search-state");
//   let dimSearch = "";
//   searchCloud.src = `http://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}.png`;
//   getFlag(
//     `https://openweathermap.org/images/flags/${searchResponse.country.toLowerCase()}.png`
//   ).then((data) => {
//     if (data == undefined) {
//       searchName.innerHTML = `${searchResponse.name}, ${searchResponse.country}`;
//     } else {
//       searchName.innerHTML = `${searchResponse.name}, ${searchResponse.country} <img class="flag"
//   src="${data}"
//   alt="flag"
// />`;
//     }
//   });

//   if (metric == true) {
//     dimSearch = "℃";
//   } else {
//     dimSearch = "℉";
//   }
//   searchTemp.innerHTML = `${Math.round(
//     weatherResponse.main.temp
//   )} <span class="dim">${dimSearch}</span>`;
//   if (searchResponse.state) {
//     searchState.innerText = searchResponse.state;
//   } else {
//     searchState.innerText = `${searchResponse.lat.toFixed(
//       4
//     )}, ${searchResponse.lon.toFixed(4)}`;
//   }
//   li.dataset.lat = searchResponse.lat;
//   li.dataset.lon = searchResponse.lon;
//   searchOutput.append(searchElement);
// }

// TodayForecast logic

searchOutput.addEventListener("click", searchForecast);

function searchForecast(e) {
  let lat = e.target.dataset.lat;
  let lon = e.target.dataset.lon;
  populateForecast(lat, lon, dimension);
  searchOutput.innerHTML = "";
}

function populateForecast(lat, lon, dimension) {
  getForecastCurrent(lat, lon, dimension).then((data) => {
    populateTodayForecast(data);
    getForecast(lat, lon, dimension).then((wdata) => {
      populateHourly(wdata);
      populateDaily(wdata);
    });
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function windDirection(deg) {
  let result = "";
  if (deg >= 0 && deg < 11.25) {
    result = "N";
  } else if (deg >= 11.25 && deg < 33.75) {
    result = "NNE";
  } else if (deg >= 33.75 && deg < 56.25) {
    result = "NE";
  } else if (deg >= 56.25 && deg < 78.75) {
    result = "ENE";
  } else if (deg >= 78.75 && deg < 101.25) {
    result = "E";
  } else if (deg >= 101.25 && deg < 123.75) {
    result = "ESE";
  } else if (deg >= 123.75 && deg < 146.25) {
    result = "SE";
  } else if (deg >= 146.25 && deg < 168.75) {
    result = "SSE";
  } else if (deg >= 168.75 && deg < 191.25) {
    result = "S";
  } else if (deg >= 191.25 && deg < 213.75) {
    result = "SSW";
  } else if (deg >= 213.75 && deg < 236.25) {
    result = "SW";
  } else if (deg >= 236.25 && deg < 258.75) {
    result = "WSW";
  } else if (deg >= 258.75 && deg < 281.25) {
    result = "W";
  } else if (deg >= 281.25 && deg < 303.75) {
    result = "WNW";
  } else if (deg >= 303.75 && deg < 326.25) {
    result = "NW";
  } else if (deg >= 326.25 && deg < 348.75) {
    result = "NNW";
  } else if (deg >= 348.75 && deg < 360) {
    result = "N";
  }
  return result;
}

// function populateTodayForecast(data) {
//   const todayName = document.querySelector(".city-name");
//   const todayDate = document.querySelector(".today-date");
//   const todayImg = document.querySelector(".today-weather-img");
//   const todayTemp = document.querySelector(".temp");
//   const todayFeels = document.querySelector(".temp-today-feel");
//   const todayDes = document.querySelector(".today-des");
//   const todayWind = document.querySelector(".today-wind");
//   const todayWindDirection = document.querySelector(".today-wind-direction");
//   const todayVisibility = document.querySelector(".today-visibility");
//   const todayPressure = document.querySelector(".today-pressure");
//   const todayHumidity = document.querySelector(".today-humidity");
//   const todayCloudness = document.querySelector(".today-cloudness");
//   const todaySunrise = document.querySelector(".today-sunrise");
//   const todaySunset = document.querySelector(".today-sunset");
//   const todayArrow = document.querySelector(".today-wind-arrow");
//   const header = document.querySelector(".header");
//   // getPhoto(data.weather[0].description).then((imgURL) => {
//   //   header.style.backgroundImage = `url(${imgURL})`;
//   // });
//   let fullDateMs = data.dt * 1000;
//   let date = new Date(fullDateMs).toLocaleString(data.sys.country);
//   let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
//     data.sys.country
//   );
//   let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
//     data.sys.country
//   );
//   todayName.innerText = `${data.name}, ${data.sys.country}`;
//   todayName.dataset.lat = data.coord.lat;
//   todayName.dataset.lon = data.coord.lon;
//   todayDate.innerHTML = date;
//   todayImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//   todayTemp.innerText = Math.round(data.main.temp);
//   todayFeels.innerText = Math.round(data.main.feels_like);
//   todayDes.innerText = capitalizeFirstLetter(data.weather[0].description);
//   todayWind.innerText = data.wind.speed;
//   todayWindDirection.innerText = windDirection(data.wind.deg);
//   todayVisibility.innerText = data.visibility / 1000;
//   todayPressure.innerText = data.main.pressure;
//   todayHumidity.innerText = data.main.humidity;
//   todayCloudness.innerText = data.clouds.all;
//   todaySunrise.innerText = sunrise;
//   todaySunset.innerText = sunset;
//   todayArrow.style.transform = `rotate(${data.wind.deg + 180}deg)`;
// }

// Hourly Forecast

// const hourlyForecast = document.querySelector(".hourly-forecast");
// const hourTemplate = document.querySelector(".hour-template");

// function populateHourly(data, country) {
//   hourlyForecast.innerHTML = "";
//   for (let i = 0; i < data.hourly.length; i++) {
//     const hourlyElement = document.importNode(hourTemplate.content, true);
//     const hourlyTime = hourlyElement.querySelector(".hourly-time");
//     const hourlyImg = hourlyElement.querySelector(".hourly-img");
//     const hourlyTemp = hourlyElement.querySelector(".hourly-temp");
//     const hourlyFeels = hourlyElement.querySelector(".hourly-feels");
//     const hourlyDes = hourlyElement.querySelector(".hourly-des");
//     const hourlyArrow = hourlyElement.querySelector(".wind-arrow-hourly");
//     const hourlyWind = hourlyElement.querySelector(".wind-speed-hourly");
//     const hourlyHumidity = hourlyElement.querySelector(".humidity-hourly");
//     const hourlyPressure = hourlyElement.querySelector(".pressure-hourly");
//     const hourlyCloudness = hourlyElement.querySelector(".cloudness-hourly");
//     const hourlyWindDirection = hourlyElement.querySelector(
//       ".wind-direction-hourly"
//     );
//     const dim = hourlyElement.querySelectorAll(".dim");
//     const dimSpeed = hourlyElement.querySelectorAll(".speed-dim");
//     for (let i = 0; i < dim.length; i++) {
//       if (metric == true) {
//         dim[i].innerText = "℃";
//       } else {
//         dim[i].innerText = "°F";
//       }
//     }
//     for (let i = 0; i < dimSpeed.length; i++) {
//       if (metric == true) {
//         dimSpeed[i].innerText = "m/s";
//       } else {
//         dimSpeed[i].innerText = "mph";
//       }
//     }
//     let time = new Date(data.hourly[i].dt * 1000).toLocaleTimeString(country);
//     hourlyTime.innerText = time;
//     hourlyImg.src = `http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png`;
//     hourlyTemp.innerText = Math.round(data.hourly[i].temp);
//     hourlyFeels.innerText = Math.round(data.hourly[i].feels_like);
//     hourlyDes.innerText = capitalizeFirstLetter(
//       data.hourly[i].weather[0].description
//     );
//     hourlyArrow.style.transform = `rotate(${data.hourly[i].wind_deg + 180}deg)`;
//     hourlyWind.innerText = data.hourly[i].wind_speed;
//     hourlyWindDirection.innerText = windDirection(data.hourly[i].wind_deg);
//     hourlyHumidity.innerText = data.hourly[i].humidity;
//     hourlyPressure.innerText = data.hourly[i].pressure;
//     hourlyCloudness.innerText = data.hourly[i].clouds;

//     hourlyForecast.append(hourlyElement);
//   }
// }

// Daily forecast
// const dailyForecast = document.querySelector(".daily-forecast");
// const dailyTemplate = document.querySelector(".daily-template");

// function populateDaily(data, country) {
//   dailyForecast.innerHTML = "";
//   for (let i = 0; i < data.daily.length; i++) {
//     const dailyElement = document.importNode(dailyTemplate.content, true);
//     const dailyTime = dailyElement.querySelector(".daily-time");
//     const dailyImg = dailyElement.querySelector(".daily-img");
//     const dailyDayTemp = dailyElement.querySelector(".daily-day-temp");
//     const dailyNightTemp = dailyElement.querySelector(".daily-night-temp");
//     const dailyFeelsDay = dailyElement.querySelector(".daily-feels-day");
//     const dailyFeelsNight = dailyElement.querySelector(".daily-feels-night");
//     const dailyDes = dailyElement.querySelector(".daily-des");
//     const dailyArrow = dailyElement.querySelector(".wind-arrow-daily");
//     const dailyWindSpeed = dailyElement.querySelector(".daily-wind-speed");
//     const dailyHumidity = dailyElement.querySelector(".humidity-daily");
//     const dailyCloudness = dailyElement.querySelector(".cloudness-daily");
//     const dailyPressure = dailyElement.querySelector(".pressure-daily");
//     const dailySunrise = dailyElement.querySelector(".sunrise-daily");
//     const dailySunset = dailyElement.querySelector(".sunset-daily");
//     const dailyMoonrise = dailyElement.querySelector(".moonrise-daily");
//     const dailyMoonset = dailyElement.querySelector(".moonset-daily");
//     const dim = dailyElement.querySelectorAll(".dim");
//     const dimSpeed = dailyElement.querySelectorAll(".dim-speed");
//     const dailyWindDirection = dailyElement.querySelector(
//       ".daily-wind-direction"
//     );
//     for (let i = 0; i < dim.length; i++) {
//       if (metric == true) {
//         dim[i].innerText = "℃";
//       } else {
//         dim[i].innerText = "°F";
//       }
//     }
//     for (let i = 0; i < dimSpeed.length; i++) {
//       if (metric == true) {
//         dimSpeed[i].innerText = "m/s";
//       } else {
//         dimSpeed[i].innerText = "mph";
//       }
//     }
//     let date = new Date(data.daily[i].dt * 1000).toLocaleString(country);
//     dailyTime.innerText = date;
//     dailyImg.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
//     dailyDayTemp.innerText = Math.round(data.daily[i].temp.day);
//     dailyNightTemp.innerText = Math.round(data.daily[i].temp.night);
//     dailyFeelsDay.innerText = Math.round(data.daily[i].feels_like.day);
//     dailyFeelsNight.innerText = Math.round(data.daily[i].feels_like.night);
//     dailyDes.innerText = capitalizeFirstLetter(
//       data.daily[i].weather[0].description
//     );
//     dailyArrow.style.transform = `rotate(${data.daily[i].wind_deg + 180}deg)`;
//     dailyWindSpeed.innerText = data.daily[i].wind_speed;
//     dailyWindDirection.innerText = windDirection(data.daily[i].wind_deg);
//     dailyHumidity.innerText = data.daily[i].humidity;
//     dailyCloudness.innerText = data.daily[i].clouds;
//     dailyPressure.innerText = data.daily[i].pressure;
//     let sunriseDailyTime = new Date(
//       data.daily[i].sunrise * 1000
//     ).toLocaleTimeString(country);
//     let sunsetDailyTime = new Date(
//       data.daily[i].sunset * 1000
//     ).toLocaleTimeString(country);
//     let moonriseDailyTime = new Date(
//       data.daily[i].moonrise * 1000
//     ).toLocaleTimeString(country);
//     let moonsetDailyTime = new Date(
//       data.daily[i].moonset * 1000
//     ).toLocaleTimeString(country);
//     dailySunrise.innerText = sunriseDailyTime;
//     dailySunset.innerText = sunsetDailyTime;
//     dailyMoonrise.innerText = moonriseDailyTime;
//     dailyMoonset.innerText = moonsetDailyTime;

//     dailyForecast.append(dailyElement);
//   }
// }

const cities = [
  {
    lat: 51.5156177,
    lon: -0.0919983,
  },
  {
    lat: 40.7127281,
    lon: -74.0060152,
  },
  {
    lat: 48.8588897,
    lon: 2.32004102,
  },
  {
    lat: 52.3727598,
    lon: 4.8936041,
  },
  {
    lat: 35.6828387,
    lon: 139.7594549,
  },
  {
    lat: -33.768528,
    lon: 150.956855,
  },
];

let randomCity = Math.floor(Math.random() * cities.length);
populateForecast(cities[randomCity].lat, cities[randomCity].lon, dimension);
// getForecastCurrent(
//   cities[randomCity].lat,
//   cities[randomCity].lon,
//   dimension
// ).then((data) => {
//   populateTodayForecast(data);
//   getForecast(cities[randomCity].lat, cities[randomCity].lon, dimension).then(
//     (wdata) => {
//       populateHourly(wdata, data.sys.country);
//       populateDaily(wdata, data.sys.country);
//     }
//   );
// });

export { metric, capitalizeFirstLetter, windDirection };
