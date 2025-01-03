document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetPage = this.getAttribute('href');

        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = targetPage;
        }, 500);
    });
});

function navigateTo(page) {
    console.log("Navigating to:", page);
    window.location.href = page;
}
