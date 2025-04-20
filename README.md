# 游戏中心 Tele Game Hub

这是一个基于 Telegram 平台的 Mini App，提供多样化的游戏内容给用户进行游玩。界面风格参考了 iOS App Store 的设计。

## 项目特点

- 响应式布局，完美适配移动端设备
- iOS App Store 风格的用户界面
- 精选游戏分类展示
- 特色游戏轮播推荐
- 游戏详情页展示

## 技术栈

- Next.js 15.3
- React 19
- TypeScript
- Tailwind CSS

## 开发环境设置

首先，安装依赖项：

```bash
npm install
```

然后，启动开发服务器：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 数据结构

游戏数据结构设计如下：

```typescript
interface Game {
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

interface GameCategory {
  id: string;
  name: string;
  games: Game[];
}

interface FeaturedBanner {
  id: string;
  game: Game;
  image: string;
  title: string;
  subtitle: string;
}
```

## 目录结构

- `/src/app` - 主应用代码
  - `/components` - UI 组件
  - `/data` - Mock 数据
  - `/types` - TypeScript 类型定义
- `/public` - 静态资源

## 后续开发计划

- 添加游戏详情页
- 实现搜索功能
- 添加用户个人中心
- 接入真实 API
- 添加游戏下载与启动功能

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 部署指南

### 使用 PM2 部署

1. 确保已安装 PM2
```bash
npm install -g pm2
```

2. 构建项目
```bash
npm run build
```

3. 使用 PM2 启动项目
```bash
pm2 start ecosystem.config.js
```

4. 常用 PM2 命令
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs tele-game-hub

# 重启应用
pm2 restart tele-game-hub

# 停止应用
pm2 stop tele-game-hub

# 设置开机自启
pm2 startup
pm2 save
```

## 开发指南

### 本地开发
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 启动项目
```bash
npm start
```
