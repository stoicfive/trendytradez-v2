# Automated Dashboard - React UI

Real-time dashboard that displays project status via WebSocket connection.

## Features

- **Real-time Updates**: WebSocket connection for instant updates
- **Auto-reconnect**: Automatically reconnects if connection drops
- **Live Stats**: Package completion, test coverage, TODOs, plans
- **Package Status**: Visual cards showing all packages and their status
- **Recent Commits**: Latest git commits
- **Implementation Plans**: Progress tracking for all plans
- **Dark Theme**: Modern, clean interface
- **Responsive**: Works on all screen sizes

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 3003)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Requirements

The dashboard requires the backend services to be running:

```bash
# From project root
pnpm dashboard:start
```

This starts:

- REST API on `http://localhost:3001`
- WebSocket server on `ws://localhost:3002`

## Connection

The dashboard connects to `ws://localhost:3002` by default.

If the connection fails, ensure:

1. Backend services are running (`pnpm dashboard:start`)
2. No firewall blocking WebSocket connections
3. Ports 3001 and 3002 are available

## Build Output

Production build creates optimized bundle in `dist/`:

- `dist/index.html` - Entry point
- `dist/assets/` - JS and CSS bundles

Bundle size: ~148KB (47KB gzipped)

## Technology

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **WebSocket API** - Real-time communication

## Data Structure

The dashboard receives data in this format:

```typescript
{
  packages: Array<{
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'complete';
  }>;
  commits: Array<{
    hash: string;
    message: string;
    date: string;
  }>;
  todos: Array<{
    type: 'TODO' | 'FIXME';
    message: string;
    file: string;
    line: number;
  }>;
  plans: Array<{
    name: string;
    progress: number;
    completed: number;
    total: number;
  }>;
  stats: {
    totalPackages: number;
    completePackages: number;
    testCoverage: number;
  }
}
```

## Deployment

To deploy the dashboard:

1. Build: `npm run build`
2. Serve `dist/` folder with any static server
3. Ensure backend API is accessible
4. Update WebSocket URL if needed

## Customization

To change the WebSocket URL, edit `src/App.tsx`:

```typescript
const WS_URL = 'ws://your-server:port';
```
