'use client'
import { useState, useEffect } from 'react';

// 模拟任务数据
const MOCK_TASKS = [
  { id: '1', title: '完成10次停车', progress: 7, total: 10, reward: '100金币' },
  { id: '2', title: '无碰撞停车5次', progress: 3, total: 5, reward: '50钻石' },
  { id: '3', title: '时间内完成关卡', progress: 0, total: 3, reward: '限定皮肤' },
  { id: '4', title: '连续完成3关', progress: 1, total: 3, reward: '加速道具x2' },
];

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
}

export default function TaskDrawer({ isOpen, onClose, gameId }: TaskDrawerProps) {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 模拟从服务器获取任务数据
  useEffect(() => {
    // 实际应该根据 gameId 从API获取任务数据
    // 这里仅作演示
    console.log(`获取游戏 ${gameId} 的任务数据`);
  }, [gameId]);

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* 抽屉内容 */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* 顶部拖动条 */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        
        {/* 抽屉标题 */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold">任务中心</h2>
          <button onClick={onClose} className="p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18 18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        {/* 任务列表 */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 100px)' }}>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className="text-blue-500 text-sm">{task.reward}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>进度</span>
                    <span>{task.progress}/{task.total}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${(task.progress / task.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                {task.progress >= task.total ? (
                  <button className="mt-3 w-full py-1.5 bg-green-500 text-white rounded-md text-sm font-medium">
                    领取奖励
                  </button>
                ) : (
                  <button className="mt-3 w-full py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium cursor-not-allowed">
                    继续努力
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 