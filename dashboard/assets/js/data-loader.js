/**
 * Dynamic data loader for TrendyTradez Dashboard
 * Loads project-status.json and renders the dashboard
 */

let dashboardData = null;

/**
 * Load dashboard data from JSON file
 */
async function loadDashboardData() {
    try {
        const response = await fetch('data/project-status.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dashboardData = await response.json();
        return dashboardData;
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
        return null;
    }
}

/**
 * Render statistics cards
 */
function renderStats(data) {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer || !data) return;

    const { stats } = data;
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${stats.plansComplete.current}/${stats.plansComplete.total}</div>
            <div class="stat-label">Plans Complete</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${stats.plansComplete.percentage}%"></div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.packagesCreated.current}/${stats.packagesCreated.total}</div>
            <div class="stat-label">Packages Created</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${stats.packagesCreated.percentage}%"></div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.currentPhase}</div>
            <div class="stat-label">Current Phase</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.weeksTotal}</div>
            <div class="stat-label">Weeks Total</div>
        </div>
    `;
}

/**
 * Render current status section
 */
function renderCurrentStatus(data) {
    const container = document.getElementById('current-status-container');
    if (!container || !data) return;

    const items = data.currentStatus.map(item => `
        <div class="plan-item ${item.status}">
            <div>
                <div class="plan-name">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3fb950" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ${item.title}
                </div>
                <div class="plan-desc">${item.description}</div>
            </div>
            <span class="badge ${item.status}">${item.status === 'complete' ? 'Complete' : 'In Progress'}</span>
        </div>
    `).join('');

    container.innerHTML = items;
}

/**
 * Render next actions section
 */
function renderNextActions(data) {
    const container = document.getElementById('next-actions-container');
    if (!container || !data) return;

    const items = data.nextActions.map((item, index) => {
        const icon = index === 0 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
            : '';
        
        return `
            <div class="plan-item ${item.status === 'active' ? 'in-progress' : 'pending'}">
                <div>
                    <div class="plan-name">
                        ${icon}
                        ${item.title}
                    </div>
                    <div class="plan-desc">${item.description}</div>
                </div>
                <span class="badge ${item.status === 'active' ? 'in-progress' : 'pending'}">
                    ${item.status === 'active' ? 'Active' : 'Queued'}
                </span>
            </div>
        `;
    }).join('');

    container.innerHTML = items;
}

/**
 * Render blockers section
 */
function renderBlockers(data) {
    const container = document.getElementById('blockers-container');
    if (!container || !data) return;

    const { blockers } = data;
    const color = blockers.hasBlockers ? '#f85149' : '#f85149';
    const icon = blockers.hasBlockers 
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

    container.innerHTML = `
        <div style="background: #0d1117; padding: 15px; border-radius: 6px; border-left: 3px solid ${color};">
            <div style="color: ${color}; font-weight: 600; margin-bottom: 8px;">
                ${icon}
                ${blockers.hasBlockers ? 'Blocker' : 'No Blockers'}
            </div>
            <div style="color: #8b949e; font-size: 14px;">${blockers.message}</div>
        </div>
    `;
}

/**
 * Render packages grid
 */
function renderPackages(data) {
    const container = document.getElementById('packages-container');
    if (!container || !data) return;

    const items = data.packages.map(pkg => `
        <div class="package-card">
            <h4>${pkg.name}</h4>
            <p>${pkg.description}</p>
            <span class="badge ${pkg.status}" style="margin-top: 10px;">
                ${pkg.status === 'complete' ? 'Complete' : pkg.status === 'in-progress' ? 'In Progress' : 'Pending'}
            </span>
        </div>
    `).join('');

    container.innerHTML = items;
}

/**
 * Render recent commits
 */
function renderCommits(data) {
    const container = document.getElementById('commits-container');
    if (!container || !data) return;

    const items = data.recentCommits.map(commit => `
        <div class="plan-item">
            <div>
                <div class="plan-name">${commit.message}</div>
                <div class="plan-desc">${commit.date} • ${commit.hash}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = items;
}

/**
 * Update last updated timestamp
 */
function updateTimestamp(data) {
    const timestampEl = document.getElementById('lastUpdated');
    if (!timestampEl || !data) return;

    const date = new Date(data.meta.lastUpdated);
    const formatted = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    timestampEl.textContent = formatted;
}

/**
 * Show error message
 */
function showError(message) {
    const container = document.querySelector('.main-content .container');
    if (!container) return;

    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'background: #f85149; color: white; padding: 15px; border-radius: 6px; margin: 20px 0;';
    errorDiv.innerHTML = `
        <strong>Error:</strong> ${message}
    `;
    container.insertBefore(errorDiv, container.firstChild);
}

/**
 * Initialize dashboard - load and render all data
 */
async function initializeDashboard() {
    console.log('Loading dashboard data...');
    
    const data = await loadDashboardData();
    if (!data) return;

    console.log('Rendering dashboard...');
    
    // Render all sections
    renderStats(data);
    renderCurrentStatus(data);
    renderNextActions(data);
    renderBlockers(data);
    renderPackages(data);
    renderCommits(data);
    updateTimestamp(data);
    
    console.log('Dashboard loaded successfully!');
}

/**
 * Reload dashboard data (for manual refresh)
 */
window.reloadDashboard = async function() {
    await initializeDashboard();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}
