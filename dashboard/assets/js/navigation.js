/**
 * Navigation functionality for TrendyTradez Dashboard
 */

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCollapsible();
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
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('collapsed');
        });
    });

    // Collapsible Stories
    document.querySelectorAll('.story-header').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('collapsed');
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
