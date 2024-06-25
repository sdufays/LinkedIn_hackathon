// script.js

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.href;

    // Find all navigation links
    const navLinks = document.querySelectorAll('.header-nav a');

    // Loop through each link and check if its data-page attribute matches current URL
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (currentPage.includes(page)) {
            link.classList.add('active-tab');
        }
    });
});
