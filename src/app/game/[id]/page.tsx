'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { mockGames } from '../../data/mockGames';
import TaskFloatingButton from '../../components/TaskFloatingButton';
import TaskDrawer from '../../components/TaskDrawer';

export default function GamePlay() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  const [game, setGame] = useState(mockGames.find(g => g.id === gameId));
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  
  // 使用特定的游戏URL，这里只是一个示例
  // 真实情况应该基于游戏ID或其他参数确定URL
  const gameUrl = "https://www.joy-stream.asia/games/myparkinglot_v3/";
  
  const toggleTaskDrawer = () => {
    setIsTaskDrawerOpen(!isTaskDrawerOpen);
  };
  
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* 自定义顶部导航栏，包含返回按钮 */}
      <div className="sticky top-0 z-50 w-full py-3 px-4 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="返回"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" 
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold truncate">
              {game?.name || '游戏详情'}
            </h1>
          </div>
        </div>
      </div>
      
      <main className="flex-1 relative overflow-hidden">
        <iframe 
          src={gameUrl} 
          className="w-full h-full border-0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
        
        <TaskFloatingButton onClick={toggleTaskDrawer} />
      </main>
      
      <TaskDrawer 
        isOpen={isTaskDrawerOpen} 
        onClose={() => setIsTaskDrawerOpen(false)}
        gameId={gameId} 
      />
    </div>
  );
} 