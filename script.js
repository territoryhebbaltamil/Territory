document.addEventListener('DOMContentLoaded', () => {
  const mapContainers = document.querySelectorAll('.map-container');
  const submenuButtons = document.querySelectorAll('.submenu-buttons button');

  submenuButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active state from all buttons
      submenuButtons.forEach(btn => btn.classList.remove('active'));

      // Add active to clicked
      button.classList.add('active');

      // Hide all maps
      mapContainers.forEach(map => map.classList.remove('visible'));

      // Show selected map
      const target = button.getAttribute('data-map');
      const map = document.getElementById(target);
      if (map) {
        map.classList.add('visible');
        map.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
