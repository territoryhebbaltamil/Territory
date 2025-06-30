document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const allSubmenuDetails = document.querySelectorAll('.submenu-details');
    const allMapContainers = document.querySelectorAll('.map-container');
    const submenuButtons = document.querySelectorAll('.submenu-buttons button');

    // Function to hide all submenus and map containers
    const resetUI = () => {
        allSubmenuDetails.forEach(details => {
            details.removeAttribute('open');
        });
        allMapContainers.forEach(map => {
            map.classList.remove('visible');
        });
        navButtons.forEach(button => {
            button.setAttribute('aria-current', 'false');
            button.classList.remove('active'); // Remove active class as well
        });
        submenuButtons.forEach(button => {
            button.classList.remove('active');
        });
    };

    // Main navigation button click handler (Weekdays/Weekends)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;

            // Reset only active status for main nav
            navButtons.forEach(btn => {
                btn.setAttribute('aria-current', 'false');
                btn.classList.remove('active');
            });

            // Set active status for clicked button
            button.setAttribute('aria-current', 'page');
            button.classList.add('active');

            // Close all submenus first
            allSubmenuDetails.forEach(details => {
                if (details.id !== sectionId) { // Keep the target section open if already open
                    details.removeAttribute('open');
                }
            });
            // Also close the Sunday submenu if Weekdays/Weekends are toggled
            if (sectionId !== 'weekends') {
                 document.getElementById('sunday').removeAttribute('open');
            }

            // Toggle target submenu
            const targetSubmenu = document.getElementById(sectionId);
            if (targetSubmenu) {
                // If it's already open, close it; otherwise, open it.
                if (targetSubmenu.hasAttribute('open')) {
                    targetSubmenu.removeAttribute('open');
                    button.setAttribute('aria-current', 'false'); // If closed, unset active
                    button.classList.remove('active');
                } else {
                    targetSubmenu.setAttribute('open', '');
                }
            }

            // Hide all maps when a main navigation button is clicked
            allMapContainers.forEach(map => map.classList.remove('visible'));
            submenuButtons.forEach(btn => btn.classList.remove('active')); // Also clear submenu button active state
        });
    });

    // Submenu button click handler (Monday, Tuesday, Kanaka Nagar, etc.)
    submenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mapId = button.dataset.map;
            const sectionId = button.dataset.section; // For the "Sunday Groups" button

            // Hide all maps
            allMapContainers.forEach(map => map.classList.remove('visible'));

            // Remove active class from all submenu buttons
            submenuButtons.forEach(btn => btn.classList.remove('active'));

            if (mapId) {
                // If it's a map button, show the map
                const targetMap = document.getElementById(mapId);
                if (targetMap) {
                    targetMap.classList.add('visible');
                    button.classList.add('active'); // Set active class for the clicked map button
                }
            } else if (sectionId) {
                // If it's the "Sunday Groups" button
                const targetSubmenu = document.getElementById(sectionId);
                if (targetSubmenu) {
                    // Close other submenus except the parent 'weekends'
                    allSubmenuDetails.forEach(details => {
                        if (details.id !== 'weekends' && details.id !== sectionId) {
                            details.removeAttribute('open');
                        }
                    });

                    // Toggle the Sunday submenu
                    if (targetSubmenu.hasAttribute('open')) {
                        targetSubmenu.removeAttribute('open');
                        button.classList.remove('active'); // Remove active if closed
                    } else {
                        targetSubmenu.setAttribute('open', '');
                        button.classList.add('active'); // Set active if opened
                    }
                }
            }
        });
    });

    // Handle clicks on submenu summary to ensure correct state management
    allSubmenuDetails.forEach(details => {
        details.addEventListener('toggle', (event) => {
            // When a details element is closed, hide any currently displayed maps
            if (!details.open) {
                allMapContainers.forEach(map => map.classList.remove('visible'));
                submenuButtons.forEach(btn => btn.classList.remove('active'));
            }
            // If the Sunday submenu is closed, also deselect the "Sunday Groups" button
            if (details.id === 'sunday' && !details.open) {
                 const sundayGroupButton = document.querySelector('.submenu-buttons button[data-section="sunday"]');
                 if (sundayGroupButton) {
                     sundayGroupButton.classList.remove('active');
                 }
            }
        });
    });
});