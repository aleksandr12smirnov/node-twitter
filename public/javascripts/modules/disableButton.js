function disableButton(input, button) {
  if (input) {
    input.on('keyup', function() {
      if (input.value.length > 0) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  }
}

export default disableButton;
