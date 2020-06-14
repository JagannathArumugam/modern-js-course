class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-lodetailsation');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.visibility = document.getElementById('w-visibility');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = weather.name + ', ' + weather.sys.country;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = weather.main.temp + ' C';
    this.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
    this.feelsLike.textContent = `Feels Like: ${weather.main.temp_max} C`;
    this.visibility.textContent = `Visibility: ${(weather.visibility / 1000).toFixed(0)} km`;
    this.wind.textContent = `Wind: ${weather.wind.speed} m/s`;
  }
}