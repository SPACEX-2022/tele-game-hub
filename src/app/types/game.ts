export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  screenshots: string[];
  category: string;
  rating: number;
  size: string;
  developer: string;
  releaseDate: string;
  tags: string[];
  featured?: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
  games: Game[];
}

export interface FeaturedBanner {
  id: string;
  game: Game;
  image: string;
  title: string;
  subtitle: string;
} 