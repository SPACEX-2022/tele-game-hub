import { GameCategory } from '../types/game';
import GameCard from './GameCard';
import Link from 'next/link';

interface GameCategoryRowProps {
  category: GameCategory;
  showSeeAll?: boolean;
}

export default function GameCategoryRow({ category, showSeeAll = true }: GameCategoryRowProps) {
  return (
    <div className="flex flex-col w-full gap-4 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{category.name}</h2>
        {showSeeAll && category.games.length > 0 && (
          <Link href={`/category/${category.id}`} className="text-blue-500 text-sm">
            查看全部
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {category.games.map((game) => (
          <Link href={`/game/${game.id}`} key={game.id}>
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
} 