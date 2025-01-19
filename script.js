/* General styling for the body and container */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  text-align: center;
  color: #333;
}

input[type="number"], button {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  font-size: 16px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

input[type="number"]:focus, button:focus {
  outline: none;
  border-color: #4CAF50;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h2, .output {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table, th, td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

td {
  font-size: 14px;
}

@media (max-width: 768px) {
  .input-group {
    display: block;
    margin: 15px 0;
  }

  button {
    width: auto;
    padding: 10px 20px;
  }

  table {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  table {
    font-size: 10px;
  }

  .container {
    width: 95%;
    padding: 10px;
  }

  button {
    padding: 10px 15px;
  }
}

@media print {
  table, th, td {
    border: 1px solid black !important; /* Ensure the border is included */
    padding: 5px !important; /* Optional: Adjust the padding for print layout */
  }

  th {
    background-color: #f2f2f2 !important; /* Optional: Retain the background color in print */
  }

  td, th {
    font-size: 12px !important; /* Optional: Make the font size smaller for print */
  }
}