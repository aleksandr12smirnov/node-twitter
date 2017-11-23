function disableButton(input, button) {
  input.on('keyup', function() {
    if (input.value.length > 0) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

export default disableButton;
