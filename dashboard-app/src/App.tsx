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

  const { packages, commits, stats, todos, plans } = state;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0d1117', 
      color: '#e6edf3',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#58a6ff', marginBottom: '10px' }}>
          Automated Dashboard
        </h1>
        <div style={{ 
          display: 'inline-block', 
          padding: '4px 12px', 
          background: '#238636', 
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          ● Connected
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
      <section>
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
    </div>
  );
}

export default App;
