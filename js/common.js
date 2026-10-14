document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Oshi Days Calculation (Start: 2024-05-03)
    const startDate = new Date('2024-05-03');
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - startDate;
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const oshiDaysElements = document.querySelectorAll('.oshi-days-dynamic');
    oshiDaysElements.forEach(el => {
        el.textContent = diffDays + '日';
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark theme
        htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile Hamburger Menu Toggle (Sidebar)
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            const isActive = sidebar.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close mobile sidebar when clicking a nav link
        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth scroll for anchor links with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
