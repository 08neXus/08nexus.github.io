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
  const totalAmount = monthlyPayment * time;
  const totalInterest = totalAmount - principal;

  // Display results
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  document.getElementById('total-interest').textContent = totalInterest.toFixed(2);

  generatePaymentBreakdown(principal, rate, time, monthlyPayment);
}

// Function to generate the payment breakdown table
function generatePaymentBreakdown(principal, rate, time, monthlyPayment) {
  const tableBody = document.getElementById('loan-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the table

  let remainingBalance = principal;

  for (let month = 1; month <= time; month++) {
    let interestPayment = Math.round(remainingBalance * rate * 100) / 100;
    let principalPayment = Math.round((monthlyPayment - interestPayment) * 100) / 100;
    remainingBalance = Math.round((remainingBalance - principalPayment) * 100) / 100;

    // Handle floating-point precision issues to prevent showing -0
    if (remainingBalance < 0 && remainingBalance > -0.01) {
      remainingBalance = 0;
    }

    // Insert row in the table
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

// Function to save the content as an image
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

// Function to format the current date and time
function getCurrentDateTime() {
  const now = new Date();
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

// Function to set date and time for print
function setDateTimeForPrint() {
  const dateTimeElement = document.getElementById('date-time');
  if (dateTimeElement) {
    dateTimeElement.textContent = getCurrentDateTime();
  }
}

// Function to print the table and results
function printTable() {
  setDateTimeForPrint();

  // Hide regular heading and show custom print header
  document.querySelector('h1').style.display = 'none';
  document.querySelector('#print-header').style.display = 'block';

  // Hide buttons during printing
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.style.display = 'none');

  // Trigger the print action
  window.print();

  // Revert changes after printing
  document.querySelector('h1').style.display = 'block';
  document.querySelector('#print-header').style.display = 'none';
  buttons.forEach(button => button.style.display = 'inline-block');
}