/**
 * Simple client-side router for dashboard pages
 */

const routes = {
  overview: {
    title: 'Overview',
    render: renderOverview
  },
  initiatives: {
    title: 'Initiatives',
    render: renderInitiatives
  },
  metrics: {
    title: 'Metrics',
    render: renderMetrics
  }
};

function renderOverview(data) {
  return `
    <div class="page-content">
      <h1>Project Overview</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Epics Complete</h3>
          <p class="stat-value">${data.stats.plansComplete.current}/${data.stats.plansComplete.total}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.stats.plansComplete.percentage}%"></div>
          </div>
        </div>
        <div class="stat-card">
          <h3>Packages Created</h3>
          <p class="stat-value">${data.stats.packagesCreated.current}/${data.stats.packagesCreated.total}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.stats.packagesCreated.percentage}%"></div>
          </div>
        </div>
      </div>
      
      <h2>Current Status</h2>
      <div class="status-list">
        ${data.currentStatus.map(status => `
          <div class="status-item ${status.status}">
            <h3>${status.title}</h3>
            <p>${status.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderInitiatives(data) {
  return `
    <div class="page-content">
      <h1>Initiatives</h1>
      <div class="initiatives-list">
        <div class="initiative-card">
          <h3>Initiative 3: Widget Library</h3>
          <span class="badge in-progress">In Progress</span>
          <p>Build actual widget implementations</p>
          <ul>
            <li>TradingView chart widget</li>
            <li>Calculator widgets</li>
            <li>Data visualization</li>
          </ul>
        </div>
        <div class="initiative-card">
          <h3>Initiative 4: Dashboard Features</h3>
          <span class="badge planned">Planned</span>
          <p>Enhanced dashboard functionality</p>
        </div>
      </div>
    </div>
  `;
}

function renderMetrics(data) {
  return `
    <div class="page-content">
      <h1>Project Metrics</h1>
      <div class="metrics-grid">
        <div class="metric-card">
          <h3>Test Coverage</h3>
          <p class="metric-value">39 tests</p>
          <p class="metric-label">All passing</p>
        </div>
        <div class="metric-card">
          <h3>Build Time</h3>
          <p class="metric-value">&lt;30s</p>
          <p class="metric-label">Target met</p>
        </div>
        <div class="metric-card">
          <h3>Bundle Size</h3>
          <p class="metric-value">242KB</p>
          <p class="metric-label">Under 300KB target</p>
        </div>
      </div>
    </div>
  `;
}

export function initRouter(data) {
  const page = window.DASHBOARD_PAGE || 'overview';
  const route = routes[page];
  
  if (route) {
    document.title = `${route.title} - TrendyTradez v2`;
    return route.render(data);
  }
  
  return routes.overview.render(data);
}

export { routes };
