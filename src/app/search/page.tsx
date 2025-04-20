'use client'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import GameCard from '../components/GameCard';
import { mockGames } from '../data/mockGames';
import Link from 'next/link';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 简单的搜索逻辑
  const filteredGames = searchTerm.trim() === '' 
    ? [] 
    : mockGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Navbar />
      
      <main className="flex-1 px-4 pt-2 pb-24 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索游戏、开发者或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
        
        {searchTerm.trim() !== '' && (
          <div>
            <h2 className="text-lg font-bold mb-4">搜索结果 ({filteredGames.length})</h2>
            
            {filteredGames.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>没有找到相关游戏</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <Link href={`/game/${game.id}`} key={game.id}>
                    <GameCard game={game} size="large" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        
        {searchTerm.trim() === '' && (
          <div className="text-center py-12 text-gray-500">
            <p>输入关键词开始搜索</p>
            <p className="mt-2 text-sm">可以搜索游戏名称、开发者或标签</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
} 