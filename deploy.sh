#!/bin/bash

# Tele-Game-Hub 一键部署脚本

echo "===== 开始部署 Tele-Game-Hub ====="

# # 更新代码
# echo "正在拉取最新代码..."
# git pull

# 安装依赖
echo "正在安装依赖..."
npm install

# # 构建项目
# echo "正在构建项目..."
# npm run build

# 确保日志目录存在
echo "创建日志目录..."
mkdir -p logs

# 检查PM2是否安装
if ! command -v pm2 &> /dev/null; then
    echo "正在安装PM2..."
    npm install -g pm2
fi

# 使用PM2启动或重启应用
echo "使用PM2启动应用..."
pm2 describe tele-game-hub > /dev/null
if [ $? -eq 0 ]; then
    # 应用已存在，重启它
    pm2 restart tele-game-hub
else
    # 应用不存在，使用配置文件启动
    pm2 start npm --name "tele-game-hub" -- start
fi

# 保存PM2配置
echo "保存PM2配置..."
pm2 save

echo "===== Tele-Game-Hub 部署完成 ====="
echo "可以使用 'pm2 status' 查看应用状态"
echo "可以使用 'pm2 logs tele-game-hub' 查看应用日志" 