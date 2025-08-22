function setComputation(title, eq, sub, notes = "") {
  document.getElementById("formula-title").textContent = title;
  document.getElementById("formula-eq").textContent = eq;
  document.getElementById("formula-sub").textContent = sub;
  document.getElementById("formula-notes").textContent = notes;
}

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

  // === Formula Explanations ===
  const P = principal;
  const r = rate;
  const t = time;

  if (type === "compound") {
    setComputation(
      "Compound Interest (Annuity Formula)",
      "M = P · r · (1 + r)^t / ((1 + r)^t − 1)\nTotal Amount = M · t\nTotal Interest = Total Amount − P",
      `M = ${P} · ${r.toFixed(6)} · (1 + ${r.toFixed(6)})^${t} / ((1 + ${r.toFixed(6)})^${t} − 1)\n` +
      `M = ${monthlyPayment.toFixed(2)} per month\n` +
      `Total Amount = ${monthlyPayment.toFixed(2)} × ${t} = ${totalAmount.toFixed(2)}\n` +
      `Total Interest = ${totalAmount.toFixed(2)} − ${P.toFixed(2)} = ${totalInterest.toFixed(2)}`,
      "Note: Uses monthly interest rate r and duration t."
    );
  } else if (type === "simple") {
    setComputation(
      "Simple Interest",
      "Interest = P · r · t\nTotal Amount = P + Interest\nMonthly Payment = Total Amount / t",
      `Interest = ${P} · ${r.toFixed(6)} · ${t} = ${totalInterest.toFixed(2)}\n` +
      `Total Amount = ${P.toFixed(2)} + ${totalInterest.toFixed(2)} = ${totalAmount.toFixed(2)}\n` +
      `Monthly Payment = ${totalAmount.toFixed(2)} / ${t} = ${monthlyPayment.toFixed(2)}`,
      "Note: Interest is based only on original principal."
    );
  } else if (type === "fixed") {
    setComputation(
      "Fixed Interest",
      "Total Interest = P · r\nTotal Amount = P + Interest\nMonthly Payment = Total Amount / t",
      `Interest = ${P} · ${r.toFixed(6)} = ${totalInterest.toFixed(2)}\n` +
      `Total Amount = ${P.toFixed(2)} + ${totalInterest.toFixed(2)} = ${totalAmount.toFixed(2)}\n` +
      `Monthly Payment = ${totalAmount.toFixed(2)} / ${t} = ${monthlyPayment.toFixed(2)}`,
      "Note: A flat interest charge applied once, spread over time."
    );
  } else if (type === "amortized") {
    setComputation(
      "Amortized Loan",
      "M = (P · r) / (1 − (1 + r)^−t)\nTotal Amount = M · t\nTotal Interest = Total Amount − P",
      `M = (${P} · ${r.toFixed(6)}) / (1 − (1 + ${r.toFixed(6)})^−${t})\n` +
      `M = ${monthlyPayment.toFixed(2)} per month\n` +
      `Total Amount = ${monthlyPayment.toFixed(2)} × ${t} = ${totalAmount.toFixed(2)}\n` +
      `Total Interest = ${totalAmount.toFixed(2)} − ${P.toFixed(2)} = ${totalInterest.toFixed(2)}`,
      "Note: Classic amortization with a constant monthly rate r."
    );
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

  document.getElementById("formula-title").textContent = '';
  document.getElementById("formula-eq").textContent = '';
  document.getElementById("formula-sub").textContent = '';
  document.getElementById("formula-notes").textContent = '';
}
