import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  title: string;
  isConnected: boolean;
}

export function Header({ title, isConnected }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
              <Badge variant="default" size="sm">
                v4.2 Beta
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-neutral-600">Figma</span>
              <span className="text-neutral-300">/</span>
              <span className="text-sm text-neutral-600">Projects</span>
              <span className="text-neutral-300">/</span>
              <span className="text-sm font-medium text-neutral-900">Public Repo</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Search..."
            value=""
            onChange={() => {}}
            className="w-64"
          />
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
