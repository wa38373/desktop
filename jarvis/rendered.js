console.log("JavaScript loaded successfully!");
const { ipcRenderer } = require('electron');


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Sidebar Toggle Logic
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');

    if (sidebar && toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            toggleButton.textContent = sidebar.classList.contains('open') ? '<' : '>';
        });
    } else {
        console.error("Sidebar or Toggle Button NOT Found!");
    }

    // Start Jarvis Logic
    const jarvisButton = document.querySelector("#start-jarvis");
    const jarvisImage = document.querySelector(".jarvis-image");

    if (jarvisButton && jarvisImage) {
        jarvisButton.addEventListener("click", () => {
            console.log("Start Jarvis button clicked!");
            jarvisImage.style.animation = "slideDown 1s ease-in-out";

            setTimeout(() => {
                jarvisImage.style.animation = "";
            }, 1000);
        });
    } else {
        console.error("Start Jarvis Button or Image NOT Found!");
    }

    // Add App Box Logic
    const addAppBox = document.getElementById('add-app-box');
    const launchButtonsContainer = document.getElementById('launch-buttons');

    if (addAppBox && launchButtonsContainer) {
        addAppBox.addEventListener('click', async () => {
            const appPath = await ipcRenderer.invoke('select-app');
            if (appPath) {
                addAppButtonToUI(appPath);
            }
        });

        function addAppButtonToUI(appPath) {
            const appButton = document.createElement('button');
            appButton.textContent = appPath.split('\\').pop();
            appButton.addEventListener('click', () => {
                ipcRenderer.send('launch-app', appPath);
            });
            launchButtonsContainer.appendChild(appButton);
        }
    } else {
        console.error("Add App Box or Launch Buttons Container NOT Found!");
    }
});
// Add effect on button clicks
document.querySelectorAll('.sidebar-item').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked'); // Add the clicked effect class
        setTimeout(() => {
            button.classList.remove('clicked'); // Remove the effect after animation
        }, 600); // Match the duration of the animation
    });
});
