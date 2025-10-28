import { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  title: string;
  isConnected: boolean;
}

export function Header({ title, isConnected }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/sync', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSyncMessage({ 
          type: 'success', 
          text: data.message || 'All changes are up to date' 
        });
      } else {
        setSyncMessage({ 
          type: 'error', 
          text: data.error || 'Sync failed' 
        });
      }
    } catch (error) {
      setSyncMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Network error - could not reach server' 
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h1>
              <Badge variant="default" size="sm">
                v4.2 Beta
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Figma</span>
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Projects</span>
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Public Repo</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={handleSearch}
            className="w-64"
          />
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleSync}
              disabled={isSyncing || !isConnected}
            >
              {isSyncing ? 'Syncing...' : 'Sync GitHub'}
            </Button>
            {syncMessage && (
              <span className={`text-sm ${
                syncMessage.type === 'success' ? 'text-success' : 'text-error'
              }`}>
                {syncMessage.text}
              </span>
            )}
          </div>
          <Button variant="secondary" size="sm">
            Settings
          </Button>
          {isConnected && (
            <Badge variant="success" size="sm">
              Connected
            </Badge>
          )}
          <Button variant="secondary" size="sm">
            Login
          </Button>
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
