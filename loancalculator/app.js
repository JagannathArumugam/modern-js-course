// Listen for submit button
const submit = document.querySelector('#submit');
submit.addEventListener('click', function(e) {
  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Show the loader gif
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Function to calculate results
function calculateResults(e) {
  // UI variables
  const principal = parseFloat(document.querySelector('#principal').value);
  const rateOfInterest = parseFloat(document.querySelector('#interest-rate').value) / 100;
  const timeInYears = parseFloat(document.querySelector('#time').value);
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  // Calculate monthly payment
  const finalAmount = principal * (Math.pow(1 + (rateOfInterest / 12), timeInYears * 12));
  const monthly = finalAmount / (timeInYears * 12);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = finalAmount.toFixed(2);
    totalInterest.value = (finalAmount - principal).toFixed(2);

    // Hide the loader gif
    document.querySelector('#loading').style.display = 'none';

    // Show results
    document.querySelector('#results').style.display = 'block';
  } else {
    // Hide the loader gif
    document.querySelector('#loading').style.display = 'none';
    
    showError('Please check your numbers');
  }
}

// Function to show error
function showError(error) {
  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const results = document.querySelector('#results');

  // Add a class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, results);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Function to clear error
function clearError() {
  document.querySelector('.alert').remove();
}