const { ipcRenderer } = require('electron');

// Add App Box
const addAppBox = document.getElementById('add-app-box');
const launchButtonsContainer = document.getElementById('launch-buttons');

addAppBox.addEventListener('click', async () => {
    const appPath = await ipcRenderer.invoke('select-app'); // Open the file dialog
    if (appPath) {
        addAppButtonToUI(appPath);
    }
});

function navigateTo(url) {
    // Navigate to the specified URL
    window.location.href = url;
}



// Function to dynamically create a button for launching an app
function addAppButtonToUI(appPath) {
    const appButton = document.createElement('button');
    appButton.textContent = appPath.split('\\').pop(); // Display file name as button label
    appButton.addEventListener('click', () => {
        ipcRenderer.send('launch-app', appPath); // Notify main process to launch the app
    });
    launchButtonsContainer.appendChild(appButton);
}
document.querySelector("#start-jarvis").addEventListener("click", () => {
    const image = document.querySelector(".container img");
    image.style.animation = "slideDown 1s ease-in-out";
    
    // Reset animation to allow re-triggering
    setTimeout(() => {
        image.style.animation = "";
    }, 1000);
});
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.getElementById('toggle-sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Toggle sidebar open/close state

    // Change button text and position
    if (sidebar.classList.contains('open')) {
        toggleButton.textContent = '<'; // Change to close symbol
    } else {
        toggleButton.textContent = '>'; // Change to open symbol
    }
});







