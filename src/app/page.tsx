import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import FeaturedBannerCarousel from './components/FeaturedBannerCarousel';
import GameCategoryRow from './components/GameCategoryRow';
import { mockBanners, mockCategories } from './data/mockGames';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Navbar />
      
      <main className="flex-1 px-4 pt-2 pb-24 max-w-7xl mx-auto w-full">
        <FeaturedBannerCarousel banners={mockBanners} />
        
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <GameCategoryRow key={category.id} category={category} />
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
