import Image from 'next/image';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  size?: 'small' | 'medium' | 'large';
}

export default function GameCard({ game, size = 'medium' }: GameCardProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-20 h-20';
      case 'large':
        return 'w-32 h-32';
      case 'medium':
      default:
        return 'w-24 h-24';
    }
  };

  const getContainerClasses = () => {
    switch (size) {
      case 'small':
        return 'w-20 gap-1';
      case 'large':
        return 'w-32 gap-2';
      case 'medium':
      default:
        return 'w-24 gap-1.5';
    }
  };

  const getFontClasses = () => {
    switch (size) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-sm';
      case 'medium':
      default:
        return 'text-xs';
    }
  };

  // 使用默认图像代替实际图像路径
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRDFEMUQxIi8+Cjx0ZXh0IGZpbGw9IiM2QjZCNkIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjEwMCIgeT0iMTA1Ij5JY29uPC90ZXh0Pgo8L3N2Zz4=';

  return (
    <div className={`flex flex-col ${getContainerClasses()}`}>
      <div className={`relative ${getSizeClasses()} rounded-2xl overflow-hidden`}>
        <Image
          src={placeholderImage}
          alt={game.name}
          fill
          className="object-cover"
          sizes={`(max-width: 768px) ${getSizeClasses()}, ${getSizeClasses()}`}
        />
      </div>
      <div className="flex flex-col">
        <h3 className={`font-semibold ${getFontClasses()} truncate`}>{game.name}</h3>
        <p className={`text-gray-500 ${size === 'small' ? 'text-[10px]' : 'text-xs'} truncate`}>
          {game.category}
        </p>
      </div>
    </div>
  );
} 