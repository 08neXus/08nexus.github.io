function calculateLoan() {
  var principal = parseFloat(document.getElementById("principal").value);
  var rate = parseFloat(document.getElementById("rate").value) / 100;  // Convert to decimal
  var timeInMonths = parseFloat(document.getElementById("time").value);

  // Validate inputs
  if (isNaN(principal) || isNaN(rate) || isNaN(timeInMonths) || principal <= 0 || rate <= 0 || timeInMonths <= 0) {
    alert("Please enter valid values for all fields.");
    return;
  }

  // Calculate Monthly Payment
  var monthlyPayment = principal * (rate * Math.pow(1 + rate, timeInMonths)) / (Math.pow(1 + rate, timeInMonths) - 1);

  // Avoid division by zero if the rate is 0
  if (!isFinite(monthlyPayment) || isNaN(monthlyPayment)) {
    alert("An error occurred with the loan calculation. Please check your inputs.");
    return;
  }

  // Calculate Total Loan Payment (principal + interest)
  var totalAmount = monthlyPayment * timeInMonths;
  var totalInterest = totalAmount - principal;

  // Update results section
  document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
  document.getElementById("total-interest").textContent = totalInterest.toFixed(2);

  // Populate the table with the breakdown of payments
  var table = document.getElementById("loan-table").getElementsByTagName('tbody')[0];
  table.innerHTML = "";  // Clear the table before filling it with new rows

  var remainingBalance = principal;

  for (var month = 1; month <= timeInMonths; month++) {
    var interestPayment = remainingBalance * rate;
    var principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    // Round each value to avoid floating-point issues
    interestPayment = interestPayment.toFixed(2);
    principalPayment = principalPayment.toFixed(2);
    remainingBalance = Math.max(remainingBalance.toFixed(2), 0); // Ensure remaining balance doesn't go negative

    // Insert row into the table
    var row = table.insertRow();
    row.insertCell(0).textContent = month;
    row.insertCell(1).textContent = `₱${monthlyPayment.toFixed(2)}`;
    row.insertCell(2).textContent = `₱${interestPayment}`;
    row.insertCell(3).textContent = `₱${principalPayment}`;
    row.insertCell(4).textContent = `₱${remainingBalance}`;
  }
}

function clearForm() {
  document.getElementById("principal").value = '';
  document.getElementById("rate").value = '';
  document.getElementById("time").value = '';
  
  document.getElementById("total-amount").textContent = '0';
  document.getElementById("total-interest").textContent = '0';

  var table = document.getElementById("loan-table").getElementsByTagName('tbody')[0];
  table.innerHTML = "";
}

function printTable() {
  var tableContent = document.getElementById("loan-table").outerHTML;
  var printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Loan Details</title></head><body>');
  printWindow.document.write('<h1>Loan Payment Breakdown</h1>');
  printWindow.document.write(tableContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close(); // Ensure content is loaded before printing
  setTimeout(function () {
      printWindow.print();
      printWindow.close(); // Close the window after print dialog is opened
  }, 500);  // Delay to ensure that the table is rendered before attempting print
}

function saveAsImage() {
  // Wait until the page content is fully rendered before using html2canvas
  html2canvas(document.getElementById('loan-table'), {
    logging: true,  // Enable logging for debugging
    allowTaint: true,  // Allow rendering content from cross-origin sources
    useCORS: true, // Cross-origin support to include styles correctly
    scrollX: 0,  // Prevent horizontal scrolling when capturing
    scrollY: 0,  // Prevent vertical scrolling when capturing
    x: window.pageXOffset,  // Account for current page position
    y: window.pageYOffset   // Account for current page position
  }).then(function(canvas) {
    // Convert the canvas to a base64 PNG image data
    var imgData = canvas.toDataURL('image/png');
    
    // Create a temporary download link
    var link = document.createElement('a');
    link.href = imgData;
    link.download = 'loan_payment_breakdown.png'; // Set the file name for download
    
    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);  // Append to the document (needed in some browsers)
    link.click();  // Trigger the download
    document.body.removeChild(link);  // Clean up after the download (remove the link)
  }).catch(function(error) {
    // Handle any errors that occur while capturing the table
    alert("Error generating image. Please try again.");
    console.error(error);
  });
}