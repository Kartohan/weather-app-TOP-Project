async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
async function getFlag(url) {
  try {
    let img = await fetch(url);
    if (img.ok) {
      return img.url;
    } else {
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function getCoodrs(city) {
  let data = await fetchData(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
  );
  return data;
}

async function getPhoto(query) {
  try {
    let data = await fetchData(
      `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${query}&client_id=2HFabrQbOHDob2P2XG3G6gaEP7EDEYR2WcEVnqmnTbQ`
    );
    let randomPic = Math.floor(Math.random() * data.results.length);
    return data.results[randomPic].urls.full;
  } catch (error) {
    throw new Error(error);
  }
}
async function getForecast(lat, lon, dim) {
  if (dim === "metric") {
    try {
      let forecastDaily = await fetchData(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${dim}&exclude=alerts,current&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
      );
      return forecastDaily;
    } catch (error) {
      throw new Error(error);
    }
  } else if (dim === "imperial") {
    try {
      let forecastDaily = await fetchData(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${dim}&exclude=alerts,current&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
      );
      return forecastDaily;
    } catch (error) {
      throw new Error(error);
    }
  }
}
async function getForecastCurrent(lat, lon, dim) {
  if (dim === "metric") {
    try {
      let forecastCurrent = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${dim}&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
      );
      return forecastCurrent;
    } catch (error) {
      throw new Error(error);
    }
  } else if (dim === "imperial") {
    try {
      let forecastCurrent = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${dim}&appid=173ad0ecb6f3381ea8adf069b81fb2fe`
      );
      return forecastCurrent;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export {
  getCoodrs,
  getFlag,
  getForecast,
  getForecastCurrent,
  getPhoto,
  fetchData,
};
