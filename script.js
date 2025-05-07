function calculateLoan() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const time = parseInt(document.getElementById('time').value);
  const type = document.getElementById('type').value;

  if (isNaN(principal) || principal <= 0 || isNaN(rate) || isNaN(time) || time <= 0) {
    alert("Please fill in all fields with valid numbers.");
    return;
  }

  let monthlyPayment, totalAmount, totalInterest;
  const tableBody = document.querySelector("#loan-table tbody");
  tableBody.innerHTML = '';
  let balance = principal;

  if (type === "compound") {
    monthlyPayment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
  } else if (type === "simple") {
    totalInterest = principal * rate * time;
    totalAmount = principal + totalInterest;
    monthlyPayment = totalAmount / time;
  } else if (type === "fixed") {
    totalInterest = principal * rate;
    totalAmount = principal + totalInterest;
    monthlyPayment = totalAmount / time;
  } else if (type === "amortized") {
    monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -time));
  }

  if (type === "simple" || type === "fixed") {
    for (let i = 1; i <= time; i++) {
      const interestPayment = (type === "simple") ? principal * rate : totalInterest / time;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      addRow(i, monthlyPayment, interestPayment, principalPayment, Math.max(0, balance));
    }
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-interest').textContent = totalInterest.toFixed(2);
  } else {
    totalAmount = monthlyPayment * time;
    totalInterest = totalAmount - principal;

    for (let i = 1; i <= time; i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      addRow(i, monthlyPayment, interestPayment, principalPayment, Math.max(0, balance));
    }

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-interest').textContent = totalInterest.toFixed(2);
  }
}

function addRow(month, payment, interest, principal, balance) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${month}</td>
    <td>${payment.toFixed(2)}</td>
    <td>${interest.toFixed(2)}</td>
    <td>${principal.toFixed(2)}</td>
    <td>${balance.toFixed(2)}</td>
  `;
  document.querySelector("#loan-table tbody").appendChild(row);
}

function clearForm() {
  document.getElementById('principal').value = '';
  document.getElementById('rate').value = '';
  document.getElementById('time').value = '';
  document.getElementById('total-amount').textContent = '0.00';
  document.getElementById('total-interest').textContent = '0.00';
  document.querySelector("#loan-table tbody").innerHTML = '';
}