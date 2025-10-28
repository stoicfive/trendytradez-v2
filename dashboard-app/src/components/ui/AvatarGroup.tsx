import { Avatar } from './Avatar';

interface AvatarGroupProps {
  avatars: Array<{ id?: string; src?: string; alt: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ avatars, max = 5, size = 'md' }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <div key={avatar.id || `${avatar.alt}-${index}`} className="ring-2 ring-white rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="ring-2 ring-white rounded-full">
          <Avatar alt={`+${remaining}`} fallback={`+${remaining}`} size={size} />
        </div>
      )}
    </div>
  );
}
