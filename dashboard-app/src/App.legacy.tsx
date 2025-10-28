import { useWebSocket } from './hooks/useWebSocket';

const WS_URL = 'ws://localhost:3002';

function App() {
  const { state, isConnected, error } = useWebSocket(WS_URL);

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#f85149' }}>
        <h1>Connection Error</h1>
        <p>{error}</p>
        <p>Make sure the server is running: <code>pnpm dashboard:start</code></p>
      </div>
    );
  }

  if (!isConnected || !state) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Connecting...</h1>
        <p>Connecting to dashboard server at {WS_URL}</p>
      </div>
    );
  }

  const { packages, commits, stats, todos, plans, github } = state;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0d1117', 
      color: '#e6edf3',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#58a6ff', marginBottom: '10px' }}>
            TrendyTradez v2 - Automated Dashboard
          </h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '4px 12px', 
              background: '#238636', 
              borderRadius: '12px',
              fontSize: '14px'
            }}>
              ● Connected
            </div>
            {github?.lastSync && (
              <div style={{ 
                fontSize: '12px', 
                color: '#8b949e' 
              }}>
                Last sync: {new Date(github.lastSync).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a 
            href="https://github.com/stoicfive/trendytradez-v2" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#e6edf3',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            📦 Repository
          </a>
          <a 
            href="https://github.com/stoicfive?tab=projects" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#e6edf3',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            📋 Projects
          </a>
        </div>
      </header>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {stats.completePackages}/{stats.totalPackages}
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>Packages Complete</div>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {stats.testCoverage}%
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>Test Coverage</div>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {todos.length}
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>TODOs</div>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {plans.length}
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>Plans</div>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {github?.projects || 0}
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>GitHub Projects</div>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#58a6ff' }}>
            {github?.issues || 0}
          </div>
          <div style={{ color: '#8b949e', fontSize: '14px' }}>GitHub Issues</div>
        </div>
      </div>

      {/* Packages */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#58a6ff', marginBottom: '15px' }}>Packages</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px'
        }}>
          {packages.map((pkg) => (
            <div key={pkg.name} style={{
              background: '#161b22',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #30363d'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{pkg.name}</div>
              <div style={{ fontSize: '14px', color: '#8b949e', marginBottom: '10px' }}>
                {pkg.description}
              </div>
              <span style={{
                display: 'inline-block',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                background: pkg.status === 'complete' ? '#238636' : 
                           pkg.status === 'in-progress' ? '#1f6feb' : '#6e7681',
                color: 'white'
              }}>
                {pkg.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Commits */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#58a6ff', marginBottom: '15px' }}>Recent Commits</h2>
        <div style={{ 
          background: '#161b22', 
          borderRadius: '8px',
          border: '1px solid #30363d',
          overflow: 'hidden'
        }}>
          {commits.slice(0, 5).map((commit, index) => (
            <div key={commit.hash} style={{
              padding: '15px',
              borderBottom: index < 4 ? '1px solid #30363d' : 'none'
            }}>
              <div style={{ marginBottom: '5px' }}>{commit.message}</div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>
                {commit.date} • {commit.hash}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#58a6ff', marginBottom: '15px' }}>Implementation Plans</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: '#161b22',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #30363d'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{plan.name}</div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ 
                  height: '8px', 
                  background: '#21262d', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${plan.progress}%`,
                    background: '#238636',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>
                {plan.completed}/{plan.total} tasks • {plan.progress}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Integration */}
      {github && (
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#58a6ff', marginBottom: '15px' }}>GitHub Integration</h2>
          <div style={{
            background: '#161b22',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #30363d'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#58a6ff', marginBottom: '5px' }}>
                  {github.projects}
                </div>
                <div style={{ fontSize: '14px', color: '#8b949e' }}>Projects Created</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#58a6ff', marginBottom: '5px' }}>
                  {github.issues}
                </div>
                <div style={{ fontSize: '14px', color: '#8b949e' }}>Issues Synced</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#58a6ff', marginBottom: '5px' }}>
                  {github.milestones}
                </div>
                <div style={{ fontSize: '14px', color: '#8b949e' }}>Milestones</div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  color: github.syncStatus === 'success' ? '#3fb950' : '#f85149',
                  marginBottom: '5px'
                }}>
                  {github.syncStatus === 'success' ? '✓ Synced' : '✗ Failed'}
                </div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>
                  {github.lastSync ? new Date(github.lastSync).toLocaleString() : 'Never'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="https://github.com/stoicfive/trendytradez-v2/issues"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  background: '#238636',
                  borderRadius: '6px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-block'
                }}
              >
                View Issues →
              </a>
              <a 
                href="https://github.com/stoicfive?tab=projects"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  background: '#238636',
                  borderRadius: '6px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-block'
                }}
              >
                View Projects →
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
