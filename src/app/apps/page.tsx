'use client'
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import GameCard from '../components/GameCard';
import Link from 'next/link';
import { mockGames } from '../data/mockGames';
import { useState } from 'react';

export default function GameLibrary() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 所有游戏类别
  const categories = ['全部', '动作冒险', '角色扮演', '休闲', '竞速', '策略', '益智', '模拟'];
  
  // 根据选择的类别过滤游戏
  const filteredGames = activeCategory === '全部' 
    ? mockGames 
    : mockGames.filter(game => 
        game.category === activeCategory || 
        game.tags.includes(activeCategory)
      );

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Navbar />
      
      <main className="flex-1 px-4 pt-2 pb-24 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">游戏库</h1>
        
        {/* 分类选择器 */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === '全部' ? 'all' : category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === (category === '全部' ? 'all' : category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 游戏列表 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <GameCard game={game} size="large" />
            </Link>
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>该分类下暂无游戏</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
} 