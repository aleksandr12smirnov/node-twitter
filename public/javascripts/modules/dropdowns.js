function attachDropdownToButton(button, dropdown) {
  button.addEventListener('click', function(e) {
    dropdown.classList.toggle('dropdown__menu--active');
  });
}

function bindDropdowns(selector) {
  const dropdowns = document.querySelectorAll(selector);

  dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector('.dropdown__toggle-btn');
    const dropdownMenu = dropdown.querySelector('.dropdown__menu');
    attachDropdownToButton(dropdownBtn, dropdownMenu);
  });
}

export default bindDropdowns;
