'use client'
import { FeaturedBanner } from '../types/game';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, TouchEvent } from 'react';

interface FeaturedBannerCarouselProps {
  banners: FeaturedBanner[];
}

export default function FeaturedBannerCarousel({ banners }: FeaturedBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 自动轮播
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      if (!isSwiping) {
        setCurrentIndex((current) => (current + 1) % banners.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isSwiping]);

  // 手动切换轮播
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 处理手势开始
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  // 处理手势移动
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 处理手势结束
  const handleTouchEnd = () => {
    setIsSwiping(false);
    
    // 如果滑动距离足够大，才切换轮播图
    if (touchStart - touchEnd > 75) {
      // 向左滑动
      setCurrentIndex((current) => (current + 1) % banners.length);
    }

    if (touchEnd - touchStart > 75) {
      // 向右滑动
      setCurrentIndex((current) => (current === 0 ? banners.length - 1 : current - 1));
    }
    
    // 重置触摸状态
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (banners.length === 0) return null;

  // 使用默认图像代替实际图像路径
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjODRBOUZGIi8+Cjx0ZXh0IGZpbGw9IiNGRkZGRkYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjQwMCIgeT0iMjAwIj5CYW5uZXI8L3RleHQ+Cjwvc3ZnPg==';

  return (
    <div className="relative w-full h-[180px] sm:h-[220px] mb-6 overflow-hidden rounded-xl">
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((banner, index) => {
          // 根据索引返回不同的链接
          const linkHref = index === 0 ? 
            `/game/${banner.game.id}` : 
            `/game-detail/${banner.game.id}`;

          return (
            <Link 
              href={linkHref}
              key={banner.id} 
              className="min-w-full h-full relative"
              onClick={(e) => isSwiping && e.preventDefault()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={banner.image || placeholderImage}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h2 className="text-xl font-bold">{banner.title}</h2>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                  {index === 0 && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                      立即游玩
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 轮播指示器 */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 