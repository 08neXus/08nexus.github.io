// Function to calculate the loan
function calculateLoan() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const time = parseInt(document.getElementById('time').value);

  // Validation for input fields
  if (isNaN(principal) || principal <= 0 || isNaN(rate) || rate <= 0 || isNaN(time) || time <= 0) {
    alert("Please fill in all fields with valid positive numbers.");
    return;
  }

  // Formula for monthly payment
  let monthlyPayment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
  const totalAmount = monthlyPayment * time; // Total amount paid over the loan period
  const totalInterest = totalAmount - principal;

  // Display results
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  document.getElementById('total-interest').textContent = totalInterest.toFixed(2);

  generatePaymentBreakdown(principal, rate, time, monthlyPayment); // Generate the breakdown
}

// Function to generate the payment breakdown table
function generatePaymentBreakdown(principal, rate, time, monthlyPayment) {
  const tableBody = document.getElementById('loan-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear previous rows

  let remainingBalance = principal;
  for (let month = 1; month <= time; month++) {
    let interestPayment = remainingBalance * rate;
    let principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    let row = tableBody.insertRow();
    row.insertCell(0).textContent = month;
    row.insertCell(1).textContent = monthlyPayment.toFixed(2);
    row.insertCell(2).textContent = interestPayment.toFixed(2);
    row.insertCell(3).textContent = principalPayment.toFixed(2);
    row.insertCell(4).textContent = remainingBalance.toFixed(2);
  }
}

// Function to clear the form inputs and results
function clearForm() {
  document.getElementById('principal').value = '';
  document.getElementById('rate').value = '';
  document.getElementById('time').value = '';
  document.getElementById('total-amount').textContent = '0';
  document.getElementById('total-interest').textContent = '0';
  document.getElementById('loan-table').getElementsByTagName('tbody')[0].innerHTML = '';
}

// Function to print the table and results
function printTable() {
  window.print();
}

// Function to save the container content as an image
function saveAsImage() {
  try {
    html2canvas(document.querySelector(".container")).then(canvas => {
      let link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'loan_calculator_output.png';
      link.click();
    });
  } catch (error) {
    console.error('Error generating image:', error);
  }
}