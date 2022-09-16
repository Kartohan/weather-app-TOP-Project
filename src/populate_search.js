import { getFlag } from "./fetch_data.js";
import { metric } from "./index.js";

const searchOutput = document.querySelector(".search-ul");
const searchTemplate = document.querySelector(".search-box-template");

function populateSearch(searchResponse, weatherResponse, lang) {
  const searchElement = document.importNode(searchTemplate.content, true);
  const li = searchElement.querySelector("li");
  const searchName = searchElement.querySelector(".name");
  const searchCloud = searchElement.querySelector(".cloud");
  const searchTemp = searchElement.querySelector(".search-temp");
  const searchState = searchElement.querySelector(".search-state");
  let dimSearch = "";
  searchCloud.src = `http://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}.png`;
  getFlag(
    `https://openweathermap.org/images/flags/${searchResponse.country.toLowerCase()}.png`
  ).then((data) => {
    if (data == undefined) {
      searchName.innerHTML = `${searchResponse.name}, ${searchResponse.country}`;
    } else {
      searchName.innerHTML = `${searchResponse.name}, ${searchResponse.country} <img class="flag"
    src="${data}"
    alt="flag"
  />`;
    }
  });

  if (metric == true) {
    dimSearch = "℃";
  } else {
    dimSearch = "℉";
  }
  searchTemp.innerHTML = `${Math.round(
    weatherResponse.main.temp
  )} <span class="dim">${dimSearch}</span>`;
  if (searchResponse.state) {
    searchState.innerText = searchResponse.state;
  } else {
    searchState.innerText = `${searchResponse.lat.toFixed(
      4
    )}, ${searchResponse.lon.toFixed(4)}`;
  }
  li.dataset.lat = searchResponse.lat;
  li.dataset.lon = searchResponse.lon;
  searchOutput.append(searchElement);
}

export { populateSearch };
