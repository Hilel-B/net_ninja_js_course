const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");



const updateDetails = (data) => {

  const {
    cityDetails,
    cityWeather
} = data;

  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${cityWeather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
    `;
    time.setAttribute('src', cityWeather.IsDayTime? 'images/day.svg':'images/night.svg');
    icon.setAttribute('src', `images/${cityWeather.WeatherIcon}.svg`)
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getCondition(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather,
  };
};

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
    .then((data) => {
      updateDetails(data);
    })
    .catch((err) => console.log(err));
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = e.target.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => {
      updateDetails(data);
      localStorage.setItem('city', city);
    })
    .catch((err) => console.log(err));
});
