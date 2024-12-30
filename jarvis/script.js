const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

// Toggle sidebar visibility
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});
