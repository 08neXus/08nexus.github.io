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