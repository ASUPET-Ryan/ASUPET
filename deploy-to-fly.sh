#!/bin/bash

# ASUPET Fly.io 部署脚本

echo "🚀 开始部署 ASUPET 到 Fly.io..."

# 检查是否已安装 flyctl
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl 未安装，请先安装 Fly.io CLI"
    echo "安装命令: curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# 检查是否已登录
if ! flyctl auth whoami &> /dev/null; then
    echo "🔐 请先登录 Fly.io"
    flyctl auth login
fi

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
    echo "📦 dist 目录不存在，开始构建..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ 构建失败"
        exit 1
    fi
fi

# 检查应用是否已存在
if flyctl apps list | grep -q "asupet"; then
    echo "📱 应用 'asupet' 已存在，开始部署..."
    flyctl deploy
else
    echo "🆕 创建新应用 'asupet'..."
    flyctl launch --no-deploy
    echo "🚀 开始首次部署..."
    flyctl deploy
fi

# 检查部署状态
if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌐 访问地址: https://asupet.fly.dev"
    echo "📊 查看状态: flyctl status"
    echo "📝 查看日志: flyctl logs"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
