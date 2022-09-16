import "./style.css";
import { populateDaily } from "./populate_daily.js";
import { populateHourly } from "./populate_hourly.js";
import { populateTodayForecast } from "./populate_today_forecast.js";
import { getCoodrs, getForecast, getForecastCurrent } from "./fetch_data.js";
import { populateSearch } from "./populate_search.js";
import gitHubImg from "./GitHub.png";

// Langueage

const hourlyText = document.querySelector(".hourly-text");
const dailyText = document.querySelector(".daily-text");
const feelsToday = document.querySelector(".lang-feels-today");
const langSearch = document.querySelector(".lang-search");
const langDimMetric = document.querySelector(".lang-dim-metric");
const langDimImperial = document.querySelector(".lang-dim-imperial");
const langDimSpeedImperial = document.querySelector(".lang-dim-speed-imperial");
const langDimSpeedMetric = document.querySelector(".lang-dim-speed-metric");

const dataLang = {
  en: {
    feels: "Feels like",
    distance: "km",
    speed: {
      imperial: "mph",
      metric: "m/s",
    },
    pressure: "hPa",
    sunset: "Sunset:",
    humidity: "Humidity:",
    sunrise: "Sunrise:",
    moonset: "Moonset:",
    moonrise: "Moonrise:",
    daily: "Daily",
    hourly: "Hourly",
    search: "Search",
    placeholder: "Write a city name",
    imperial: "Imperial",
    metric: "Metric",
  },
  ua: {
    feels: "Відчувається як",
    distance: "км",
    speed: {
      imperial: "миль/год",
      metric: "м/с",
    },
    pressure: "ГПа",
    sunset: "Захід Сонця:",
    humidity: "Вологість:",
    sunrise: "Схід Сонця:",
    moonset: "Захід Місяця:",
    moonrise: "Схід Місяця:",
    daily: "Щоденно",
    hourly: "Погодинно",
    search: "Пошук",
    placeholder: "Напишіть назву міста",
    imperial: "Імперська",
    metric: "Метрична",
  },
};

const LOCAL_STORAGE_LANG = "weather.lang";
const userLang = localStorage.getItem(LOCAL_STORAGE_LANG) || navigator.language;
const langBox = document.querySelector(".lang");
let lang =
  userLang === "uk" || userLang === "ru" || userLang === "ua" ? "ua" : "en";
if (userLang === "uk" || userLang === "ru" || userLang === "ua") {
  lang = "ua";
  const langString = langBox.querySelector("[data-lang='UA']");
  langString.classList.add("active");
} else {
  lang = "en";
  const langString = langBox.querySelector("[data-lang='EN']");
  langString.classList.add("active");
}

hourlyText.innerText = dataLang[lang].hourly;
dailyText.innerText = dataLang[lang].daily;
langSearch.innerText = dataLang[lang].search;
langDimImperial.innerText = dataLang[lang].imperial;
langDimMetric.innerText = dataLang[lang].metric;
langDimSpeedMetric.innerText = dataLang[lang].speed.metric;
langDimSpeedImperial.innerText = dataLang[lang].speed.imperial;

langBox.addEventListener("click", (e) => {
  if (e.target.className === "active") {
    return;
  } else {
    const langItems = document.querySelectorAll("[data-lang]");
    langItems.forEach((item) => (item.className = ""));
    if (e.target.dataset.lang === "UA") {
      e.target.classList.add("active");
      lang = "ua";
      saveLang();
      changeLang();
      populateForecast(city.dataset.lat, city.dataset.lon, dimension, lang);
    } else if (e.target.dataset.lang === "EN") {
      e.target.classList.add("active");
      lang = "en";
      changeLang();
      saveLang();
      populateForecast(city.dataset.lat, city.dataset.lon, dimension, lang);
    }
  }
});

function changeLang() {
  dimSpeed.forEach((dimSpeed) => {
    dimSpeed.innerText = dataLang[lang].speed[dimension];
  });
  hourlyText.innerText = dataLang[lang].hourly;
  dailyText.innerText = dataLang[lang].daily;
  feelsToday.innerText = dataLang[lang].feels;
  langSearch.innerText = dataLang[lang].search;
  searchInput.setAttribute("Placeholder", dataLang[lang].placeholder);
  langDimImperial.innerText = dataLang[lang].imperial;
  langDimMetric.innerText = dataLang[lang].metric;
  langDimSpeedMetric.innerText = dataLang[lang].speed.metric;
  langDimSpeedImperial.innerText = dataLang[lang].speed.imperial;
}

function saveLang() {
  localStorage.setItem(LOCAL_STORAGE_LANG, lang);
}

// Search logic

const LOCAL_STORAGE_DIM_VALUE = "weather.dim";
const LOCAL_STORAGE_METRIC_VALUE = "weather.metric";
const LOCAL_STORAGE_LAST_CITY_LAT = "weather.lat";
const LOCAL_STORAGE_LAST_CITY_LON = "weather.lon";
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
    dimSpeed.innerText = dataLang[lang].speed.metric;
  } else {
    dimSpeed.innerText = dataLang[lang].speed.imperial;
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
        dimSpeed.innerText = dataLang[lang].speed.metric;
      });
      populateForecast(city.dataset.lat, city.dataset.lon, dimension, lang);
      saveMetric();
    } else if (e.target.dataset.dim === "imperial") {
      e.target.classList.add("active");
      dimension = "imperial";
      metric = false;
      dim.forEach((dim) => {
        dim.innerText = "℉";
      });
      dimSpeed.forEach((dimSpeed) => {
        dimSpeed.innerText = dataLang[lang].speed.imperial;
      });
      populateForecast(city.dataset.lat, city.dataset.lon, dimension, lang);
      saveMetric();
    }
  }
}

function saveMetric() {
  localStorage.setItem(LOCAL_STORAGE_DIM_VALUE, dimension);
  localStorage.setItem(LOCAL_STORAGE_METRIC_VALUE, metric);
}

function saveCoords(lat, lon) {
  localStorage.setItem(LOCAL_STORAGE_LAST_CITY_LAT, lat);
  localStorage.setItem(LOCAL_STORAGE_LAST_CITY_LON, lon);
}

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search");
const searchOutput = document.querySelector(".search-ul");

searchInput.setAttribute("Placeholder", dataLang[lang].placeholder);

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
        getForecastCurrent(data[i].lat, data[i].lon, dimension, lang).then(
          (weather) => {
            populateSearch(data[i], weather, lang);
          }
        );
      }
    });
  }
}

// TodayForecast logic

searchOutput.addEventListener("click", searchForecast);

function searchForecast(e) {
  let lat = e.target.dataset.lat;
  let lon = e.target.dataset.lon;
  populateForecast(lat, lon, dimension, lang);
  saveCoords(lat, lon);
  searchOutput.innerHTML = "";
}

// Other

function populateForecast(lat, lon, dimension, lang) {
  getForecastCurrent(lat, lon, dimension, lang).then((data) => {
    populateTodayForecast(data, lang);
    getForecast(lat, lon, dimension, lang).then((wdata) => {
      populateHourly(wdata, lang);
      populateDaily(wdata, lang);
    });
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function windDirection(deg, lang) {
  let result = "";
  if (lang === "ua") {
    if (deg >= 0 && deg < 11.25) {
      result = "Пн";
    } else if (deg >= 11.25 && deg < 33.75) {
      result = "Пн-Сх";
    } else if (deg >= 33.75 && deg < 56.25) {
      result = "Пн-Сх";
    } else if (deg >= 56.25 && deg < 78.75) {
      result = "Пн-Сх";
    } else if (deg >= 78.75 && deg < 101.25) {
      result = "Сх";
    } else if (deg >= 101.25 && deg < 123.75) {
      result = "Пд-Сх";
    } else if (deg >= 123.75 && deg < 146.25) {
      result = "Пд-Сх";
    } else if (deg >= 146.25 && deg < 168.75) {
      result = "Пд-Сх";
    } else if (deg >= 168.75 && deg < 191.25) {
      result = "Пд";
    } else if (deg >= 191.25 && deg < 213.75) {
      result = "Пд-Зх";
    } else if (deg >= 213.75 && deg < 236.25) {
      result = "Пд-Зх";
    } else if (deg >= 236.25 && deg < 258.75) {
      result = "Пд-Зх";
    } else if (deg >= 258.75 && deg < 281.25) {
      result = "Зх";
    } else if (deg >= 281.25 && deg < 303.75) {
      result = "Пн-Зх";
    } else if (deg >= 303.75 && deg < 326.25) {
      result = "Пн-Зх";
    } else if (deg >= 326.25 && deg < 348.75) {
      result = "Пн-Зх";
    } else if (deg >= 348.75 && deg < 360) {
      result = "Пн";
    }
  } else {
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
  }
  return result;
}

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

let onOpenLat =
  localStorage.getItem(LOCAL_STORAGE_LAST_CITY_LAT) || cities[randomCity].lat;
let onOpenLon =
  localStorage.getItem(LOCAL_STORAGE_LAST_CITY_LON) || cities[randomCity].lon;

populateForecast(onOpenLat, onOpenLon, dimension, lang);

const imgGitHub = document.querySelector(".gitHub");
imgGitHub.src = gitHubImg;

export { metric, capitalizeFirstLetter, windDirection, dataLang };
