/**
 * Navigation functionality for TrendyTradez Dashboard
 */

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCollapsible();
    initMobileMenu();
});

/**
 * Initialize sidebar navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            link.classList.add('active');
            const section = link.dataset.section;
            const targetSection = document.getElementById(section);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

/**
 * Initialize collapsible epics and stories
 */
function initCollapsible() {
    // Collapsible Epics
    document.querySelectorAll('.epic-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const epic = header.closest('.epic');
            if (epic) {
                epic.classList.toggle('collapsed');
            }
        });
    });

    // Collapsible Stories
    document.querySelectorAll('.story-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const story = header.closest('.story');
            if (story) {
                story.classList.toggle('collapsed');
            }
        });
    });
}

/**
 * Expand all epics and stories
 */
window.expandAll = function() {
    document.querySelectorAll('.epic, .story').forEach(el => {
        el.classList.remove('collapsed');
    });
}

/**
 * Collapse all epics and stories
 */
window.collapseAll = function() {
    document.querySelectorAll('.epic, .story').forEach(el => {
        el.classList.add('collapsed');
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    
    if (!toggle || !sidebar) return;

    // Toggle sidebar on button click
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Close sidebar when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });
}
