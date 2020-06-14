// Initialise storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Initialise the weather object
const weather = new Weather(weatherLocation.city);

// Initialise UI object
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;

  // Change location
  weather.changeLocation(city);

  // Set location in local storage
  storage.setLocationData(city);

  // Get and Display weather again
  getWeather();

  // Close modal (jQuery needed here for bootstrap)
  $('#locModal').modal('hide');

});

// Function to get the weather
function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}