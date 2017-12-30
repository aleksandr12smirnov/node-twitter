function disableTweetButton(form) {
  const input = form.querySelector('#tweet-input');
  const button = form.querySelector('#tweet-submit');
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

export default disableTweetButton;
