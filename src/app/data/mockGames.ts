import { FeaturedBanner, Game, GameCategory } from "../types/game";

// 模拟游戏数据
export const mockGames: Game[] = [
  {
    id: "1",
    name: "太空冒险",
    description: "探索无尽的宇宙，与外星生物交战，收集稀有资源。",
    icon: "/games/space-adventure-icon.jpg",
    screenshots: [
      "/games/space-adventure-1.jpg",
      "/games/space-adventure-2.jpg",
      "/games/space-adventure-3.jpg"
    ],
    category: "动作冒险",
    rating: 4.8,
    size: "120MB",
    developer: "星际工作室",
    releaseDate: "2023-10-15",
    tags: ["太空", "冒险", "战斗"],
    featured: true
  },
  {
    id: "2",
    name: "魔法王国",
    description: "在一个充满魔法的世界里，成为最强大的魔法师。",
    icon: "/games/magic-kingdom-icon.jpg",
    screenshots: [
      "/games/magic-kingdom-1.jpg",
      "/games/magic-kingdom-2.jpg"
    ],
    category: "角色扮演",
    rating: 4.6,
    size: "200MB",
    developer: "魔法游戏",
    releaseDate: "2023-08-20",
    tags: ["魔法", "RPG", "冒险"],
    featured: true
  },
  {
    id: "3",
    name: "赛车大师",
    description: "体验最真实的赛车游戏，挑战全球玩家。",
    icon: "/games/racing-master-icon.jpg",
    screenshots: [
      "/games/racing-master-1.jpg",
      "/games/racing-master-2.jpg"
    ],
    category: "竞速",
    rating: 4.7,
    size: "150MB",
    developer: "速度工作室",
    releaseDate: "2023-11-05",
    tags: ["赛车", "竞速", "多人"],
    featured: false
  },
  {
    id: "4",
    name: "农场物语",
    description: "建立和管理你自己的农场，饲养动物，种植作物。",
    icon: "/games/farm-story-icon.jpg",
    screenshots: [
      "/games/farm-story-1.jpg",
      "/games/farm-story-2.jpg"
    ],
    category: "模拟",
    rating: 4.5,
    size: "90MB",
    developer: "绿色农场",
    releaseDate: "2023-07-10",
    tags: ["农场", "模拟", "休闲"],
    featured: false
  },
  {
    id: "5",
    name: "城市建设者",
    description: "设计和建造你的梦想城市，管理资源和人口。",
    icon: "/games/city-builder-icon.jpg",
    screenshots: [
      "/games/city-builder-1.jpg",
      "/games/city-builder-2.jpg"
    ],
    category: "策略",
    rating: 4.4,
    size: "180MB",
    developer: "城市游戏",
    releaseDate: "2023-09-25",
    tags: ["城市", "建设", "策略"],
    featured: false
  },
  {
    id: "6",
    name: "水果连连看",
    description: "经典的消除游戏，连接相同的水果获得高分。",
    icon: "/games/fruit-connect-icon.jpg",
    screenshots: [
      "/games/fruit-connect-1.jpg",
      "/games/fruit-connect-2.jpg"
    ],
    category: "休闲",
    rating: 4.3,
    size: "50MB",
    developer: "休闲游戏工作室",
    releaseDate: "2023-06-15",
    tags: ["休闲", "消除", "益智"],
    featured: false
  },
  {
    id: "7",
    name: "暗影猎人",
    description: "在黑暗的世界中狩猎怪物，成为最强大的猎人。",
    icon: "/games/shadow-hunter-icon.jpg",
    screenshots: [
      "/games/shadow-hunter-1.jpg",
      "/games/shadow-hunter-2.jpg"
    ],
    category: "动作冒险",
    rating: 4.9,
    size: "250MB",
    developer: "暗影工作室",
    releaseDate: "2023-12-01",
    tags: ["暗黑", "动作", "冒险"],
    featured: true
  },
  {
    id: "8",
    name: "宝石迷阵",
    description: "匹配相同颜色的宝石，解决各种谜题。",
    icon: "/games/gem-puzzle-icon.jpg",
    screenshots: [
      "/games/gem-puzzle-1.jpg",
      "/games/gem-puzzle-2.jpg"
    ],
    category: "益智",
    rating: 4.2,
    size: "70MB",
    developer: "宝石游戏",
    releaseDate: "2023-05-20",
    tags: ["益智", "宝石", "消除"],
    featured: false
  }
];

// 模拟分类数据
export const mockCategories: GameCategory[] = [
  {
    id: "1",
    name: "编辑推荐",
    games: mockGames.filter(game => game.featured)
  },
  {
    id: "2",
    name: "热门游戏",
    games: [...mockGames].sort((a, b) => b.rating - a.rating).slice(0, 5)
  },
  {
    id: "3",
    name: "新游戏",
    games: [...mockGames].sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    ).slice(0, 5)
  },
  {
    id: "4",
    name: "动作冒险",
    games: mockGames.filter(game => game.category === "动作冒险")
  },
  {
    id: "5",
    name: "角色扮演",
    games: mockGames.filter(game => game.category === "角色扮演")
  },
  {
    id: "6",
    name: "休闲游戏",
    games: mockGames.filter(game => game.category === "休闲" || game.tags.includes("休闲"))
  }
];

// 模拟轮播横幅数据
export const mockBanners: FeaturedBanner[] = [
  {
    id: "1",
    game: mockGames.find(game => game.id === "1")!,
    image: "/banners/banner1.png",
    title: "我的停车场",
    subtitle: "欢迎来到“我的停车场”，终极解谜挑战！"
  },
  {
    id: "2",
    game: mockGames.find(game => game.id === "2")!,
    image: "",
    title: "魔法王国",
    subtitle: "成为最强魔法师"
  },
  {
    id: "3",
    game: mockGames.find(game => game.id === "7")!,
    image: "",
    title: "暗影猎人",
    subtitle: "在黑暗中狩猎"
  }
]; 