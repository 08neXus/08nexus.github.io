function calculateLoan() {
  const principal = parseFloat(document.getElementById('principal').value) || 0;
  const rate = parseFloat(document.getElementById('rate').value) / 100 || 0;
  const time = parseInt(document.getElementById('time').value) || 0;

  if (principal <= 0 || rate <= 0 || time <= 0) {
    alert("Please enter positive values for all fields.");
    return;
  }

  let monthlyPayment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
  const totalAmount = monthlyPayment * time;
  const totalInterest = totalAmount - principal;

  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  document.getElementById('total-interest').textContent = totalInterest.toFixed(2);

  generatePaymentBreakdown(principal, rate, time, monthlyPayment);
}

function generatePaymentBreakdown(principal, rate, time, monthlyPayment) {
  const tableBody = document.getElementById('loan-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  let remainingBalance = principal;

  for (let month = 1; month <= time; month++) {
    let interestPayment = Math.round(remainingBalance * rate * 100) / 100;
    let principalPayment = Math.round((monthlyPayment - interestPayment) * 100) / 100;
    remainingBalance = Math.round((remainingBalance - principalPayment) * 100) / 100;

    let row = tableBody.insertRow();
    row.insertCell(0).textContent = month;
    row.insertCell(1).textContent = monthlyPayment.toFixed(2);
    row.insertCell(2).textContent = interestPayment.toFixed(2);
    row.insertCell(3).textContent = principalPayment.toFixed(2);
    row.insertCell(4).textContent = remainingBalance.toFixed(2);
  }
}

function clearForm() {
  document.getElementById('principal').value = '';
  document.getElementById('rate').value = '';
  document.getElementById('time').value = '';
  document.getElementById('total-amount').textContent = '0';
  document.getElementById('total-interest').textContent = '0';

  const tableBody = document.getElementById('loan-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
}

function saveAsImage() {
  html2canvas(document.querySelector(".container"))
    .then(canvas => {
      let link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'loan_calculator_output.png';
      link.click();
    })
    .catch(error => {
      alert('Error saving as image. Please try again.');
      console.error('Error:', error);
    });
}

function printTable() {
  const dateElement = document.getElementById('date-time');
  dateElement.textContent = new Date().toLocaleString();

  document.querySelector('h1').style.display = 'none';
  document.querySelector('#print-header').style.display = 'block';
  
  window.print();
  
  document.querySelector('h1').style.display = 'block';
  document.querySelector('#print-header').style.display = 'none';
}