'use client'
import { useState, useEffect, useRef } from 'react';

interface TaskFloatingButtonProps {
  onClick: () => void;
}

export default function TaskFloatingButton({ onClick }: TaskFloatingButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isNearEdge, setIsNearEdge] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positionRef = useRef(position);
  
  // 使用ref来跟踪最新的position，避免闭包问题
  useEffect(() => {
    positionRef.current = position;
  }, [position]);
  
  // 鼠标/触摸相对于按钮的偏移量
  const offsetRef = useRef({ x: 0, y: 0 });
  
  // 边缘检测阈值
  const edgeThreshold = 20;
  
  // 处理拖动开始
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // 计算鼠标/触摸点相对于按钮的偏移
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
  };
  
  // 处理拖动中
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // 使用requestAnimationFrame确保平滑更新
    requestAnimationFrame(() => {
      // 新位置计算
      const newX = clientX - offsetRef.current.x;
      const newY = clientY - offsetRef.current.y;
      
      // 确保不超出屏幕边界
      const buttonWidth = buttonRef.current?.offsetWidth || 56;
      const buttonHeight = buttonRef.current?.offsetHeight || 56;
      
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));
      
      // 更新位置 - 直接设置，不要在拖动过程中添加动画效果
      setPosition({ x: boundedX, y: boundedY });
      
      // 检测是否靠近边缘
      const isXNearEdge = boundedX < edgeThreshold || boundedX > maxX - edgeThreshold;
      const isYNearEdge = boundedY < edgeThreshold || boundedY > maxY - edgeThreshold;
      
      if (isXNearEdge || isYNearEdge) {
        if (!isNearEdge) {
          setIsNearEdge(true);
        }
      } else if (isNearEdge) {
        setIsNearEdge(false);
      }
    });
  };
  
  // 处理拖动结束
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (isNearEdge) {
      // 吸附到最近的边缘
      const buttonWidth = buttonRef.current?.offsetWidth || 56;
      const maxX = window.innerWidth - buttonWidth;
      
      let snapX = position.x;
      
      // 水平方向吸附 - 简化为左右两侧
      if (position.x < window.innerWidth / 2) {
        snapX = 0; // 左侧吸附
      } else {
        snapX = maxX; // 右侧吸附
      }
      
      setPosition(prev => ({ ...prev, x: snapX }));
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };
  
  // 处理点击事件
  const handleClick = () => {
    if (isDragging) return;
    
    if (isCollapsed) {
      // 如果是收起状态，先恢复
      setIsCollapsed(false);
      setIsNearEdge(false);
      
      // 将按钮移回视图中央
      const buttonWidth = buttonRef.current?.offsetWidth || 56;
      setPosition({
        x: window.innerWidth - buttonWidth - 24,
        y: position.y
      });
    } else {
      // 正常触发点击事件
      onClick();
    }
  };
  
  // 添加事件监听器
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // 阻止页面滚动
      handleDrag(e);
    };
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  // 更新窗口大小变化时的位置
  useEffect(() => {
    const handleResize = () => {
      const buttonWidth = buttonRef.current?.offsetWidth || 56;
      const buttonHeight = buttonRef.current?.offsetHeight || 56;
      
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;
      
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 初始化位置
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight / 2
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handleClick}
      className={`fixed w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center z-50 ${
        isNearEdge ? 'opacity-50' : 'opacity-100'
      } ${isCollapsed ? 'scale-75' : 'scale-100'} ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab hover:bg-blue-600'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        transform: `translate3d(0,0,0)`,
        transition: isDragging ? 'none' : 'opacity 0.2s, transform 0.2s'
      }}
      aria-label="任务中心"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
} 