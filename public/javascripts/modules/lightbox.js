function lightbox(trigger, lightbox) {
  const toggleBox = function(e) {
    // if the target is only the button or the screen itself not its children
    if (e.target == trigger || e.target == lightbox) {
      lightbox.classList.toggle('lightbox--active');
    }
  };
  trigger.on('click', toggleBox);
  lightbox.on('click', toggleBox);
}

export default lightbox;
