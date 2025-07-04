document.addEventListener('DOMContentLoaded', () => {
  const mapContainers = document.querySelectorAll('.map-container');
  const buttons = document.querySelectorAll('.submenu-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      mapContainers.forEach(map => {
        map.classList.remove('visible');
      });

      const target = button.getAttribute('data-map');
      const map = document.getElementById(target);
      if (map) {
        map.classList.add('visible');
        setTimeout(() => {
          map.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    });
  });
});
