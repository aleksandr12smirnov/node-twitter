function toggleDropdown(button, dropdown) {
  button.addEventlistner('click', function(e) {
    dropdown.classList.toggle('.dropdown__menu--active');
  });
}
