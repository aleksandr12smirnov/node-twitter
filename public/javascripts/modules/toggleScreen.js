function toggleScreen(button, screen, inner) {
  console.log('ran');
  function toggleClass() {
    screen.classList.toggle('screen--active');
  }

  button.on('click', toggleClass);
  screen.on('click', toggleClass);
  inner.on('click', e => e.stopPropagation());
}

export default toggleScreen;
