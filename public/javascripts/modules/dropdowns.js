function attachDropdownToButton(button, dropdown) {
  button.addEventListener('click', function(e) {
    // find and hide current dropdown
    const current = document.querySelector('.dropdown__menu--active');
    if (current && current != dropdown) {
      current.classList.remove('dropdown__menu--active');
    }

    // toggle dropdown menu
    dropdown.classList.toggle('dropdown__menu--active');
  });
}

function bindDropdowns(selector) {
  // get all dropdowns from given selector
  const dropdowns = document.querySelectorAll(selector);

  // bind the button to the menu with attach function
  dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector('.dropdown__toggle-btn');
    const dropdownMenu = dropdown.querySelector('.dropdown__menu');
    attachDropdownToButton(dropdownBtn, dropdownMenu);
  });
}

export default bindDropdowns;
