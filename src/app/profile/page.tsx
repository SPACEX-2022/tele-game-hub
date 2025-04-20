'use client'
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Image from 'next/image';
// @ts-ignore - 忽略ethers导入错误，需要先安装ethers库
import { ethers } from 'ethers';

// 为Window添加ethereum属性的类型声明
declare global {
  interface Window {
    ethereum?: {
      request: ({ method, params }: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface UserData {
  id: string;
  username: string;
  avatar: string;
  tokenBalance: number;
  walletAddress?: string;
}

interface Game {
  id: string;
  title: string;
  image: string;
  lastPlayed: string;
}

export default function Profile() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tokenHistory, setTokenHistory] = useState<{date: string, amount: number, type: 'in' | 'out'}[]>([]);

  // 自定义币种名称
  const tokenName = "GAME";
  
  // 模拟获取用户数据和最近游戏
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      setUserData({
        id: 'user123',
        username: 'TeleGamer',
        avatar: '/games/avatar.png',
        tokenBalance: 1250,
        walletAddress: walletAddress || undefined
      });
      
      setRecentGames([
        { id: 'game1', title: '数独挑战', image: '/games/sudoku.png', lastPlayed: '2023-12-25 14:30' },
        { id: 'game2', title: '扫雷大师', image: '/games/minesweeper.png', lastPlayed: '2023-12-24 18:45' },
        { id: 'game3', title: '俄罗斯方块', image: '/games/tetris.png', lastPlayed: '2023-12-22 20:15' },
      ]);
      
      setTokenHistory([
        { date: '2023-12-25', amount: 200, type: 'in' },
        { date: '2023-12-24', amount: 50, type: 'out' },
        { date: '2023-12-23', amount: 300, type: 'in' },
        { date: '2023-12-22', amount: 100, type: 'out' },
      ]);
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [walletAddress]);

  // 检查是否已连接钱包
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
          
          if (accounts.length > 0) {
            const address = accounts[0] as string;
            setWalletAddress(address);
            setIsConnected(true);
            await fetchTokenBalance(address);
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkIfWalletIsConnected();
    
    // 监听账户变更
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        fetchTokenBalance(accounts[0]);
      } else {
        setWalletAddress('');
        setIsConnected(false);
        setTokenBalance(0);
      }
    };
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  
  // 获取代币余额
  const fetchTokenBalance = async (address: string) => {
    try {
      // 这里是模拟的代币余额，实际应用中应该调用智能合约
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, provider);
      // const balance = await tokenContract.balanceOf(address);
      // setTokenBalance(ethers.utils.formatUnits(balance, 18));
      
      // 模拟数据
      setTokenBalance(1250);
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };
  
  // 连接钱包
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        }) as string[];
        
        const address = accounts[0];
        setWalletAddress(address);
        setIsConnected(true);
        await fetchTokenBalance(address);
      } else {
        alert('请安装MetaMask或其他Web3钱包！');
      }
    } catch (error) {
      console.error("连接钱包时出错:", error);
    }
  };
  
  // 断开钱包连接
  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    setTokenBalance(0);
  };
  
  // 格式化地址显示
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // 发送代币
  const sendToken = () => {
    // TODO: 实现发送代币功能
    alert('发送代币功能即将上线！');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
          {/* 用户头像和信息 */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={userData?.avatar || '/games/default-avatar.png'}
                alt={userData?.username || '用户头像'}
                fill
                className="rounded-full object-cover border-4 border-blue-500"
              />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{userData?.username}</h1>
            
            {/* 钱包状态显示 */}
            {isConnected ? (
              <div className="flex items-center mt-2 mb-4 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                <span>已连接钱包 {formatAddress(walletAddress)}</span>
                <button 
                  onClick={disconnectWallet}
                  className="ml-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-xs"
                >
                  断开
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="mt-2 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium flex items-center disabled:opacity-70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path d="M18.75 8.25h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 8.25a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM12 12a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5A.75.75 0 0 0 12 12ZM12 15.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM18.75 15.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM18.75 12a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM10.5 6a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5A.75.75 0 0 0 10.5 6ZM18.75 6a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5A.75.75 0 0 0 18.75 6ZM12.75 6a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM6.75 17.25h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5ZM6.75 13.5h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5ZM6.75 9.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5ZM3.75 6a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5A.75.75 0 0 0 3.75 6Z" />
                </svg>
                连接钱包
              </button>
            )}
            
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold">{userData?.tokenBalance}</p>
                <p className="text-sm text-gray-500">{tokenName}</p>
              </div>
            </div>
          </div>
        </div>
          
          {/* Web3钱包详情卡片 - 仅在连接钱包后显示 */}
          {isConnected && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4">{tokenName} 代币</h2>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">余额</p>
                  <p className="text-xl font-bold">{tokenBalance} {tokenName}</p>
                </div>
                
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                  发送代币
                </button>
              </div>
            </div>
          )}
          
          {/* 最近游戏 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-8">
            <h2 className="text-lg font-bold mb-4">最近游戏</h2>
            <div className="space-y-3">
              {recentGames.map(game => (
                <div key={game.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{game.title}</h3>
                    <p className="text-sm text-gray-500">上次游玩: {game.lastPlayed.split(' ')[0]}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-sm mb-1">{game.title.split(' ')[0]}</span>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isConnected && (
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2 mt-0.5">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                
                <div>
                  <h3 className="font-medium">连接Web3钱包</h3>
                  <p className="text-sm mt-1">连接钱包后可以使用 {tokenName} 代币购买游戏内道具和解锁特殊功能。</p>
                </div>
              </div>
            </div>
          )}
          
          {isConnected && (
            <div className="mt-8 p-6 border-t border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">代币交易历史</h2>
              <div className="space-y-3">
                {tokenHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {item.type === 'in' ? '+' : '-'}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{item.type === 'in' ? '收到代币' : '发送代币'}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div className={item.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                      {item.type === 'in' ? '+' : '-'}{item.amount} {tokenName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      <BottomNav />
    </>
  );
} 