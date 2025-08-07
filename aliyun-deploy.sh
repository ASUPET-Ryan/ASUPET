#!/bin/bash

# ASUPET项目 - 阿里云轻量服务器一键部署脚本
# 包含Docker环境安装和项目部署

set -e

echo "🚀 ASUPET项目 - 阿里云轻量服务器部署脚本"
echo "================================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
IMAGE_NAME="asupet-web"
CONTAINER_NAME="asupet-web"
PORT="80"

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ 请使用root用户运行此脚本${NC}"
    echo "使用命令: sudo $0"
    exit 1
fi

# 更新系统
echo -e "${YELLOW}📦 更新系统包...${NC}"
if command -v apt-get &> /dev/null; then
    apt-get update
    apt-get install -y curl wget git
elif command -v yum &> /dev/null; then
    yum update -y
    yum install -y curl wget git
else
    echo -e "${RED}❌ 不支持的操作系统${NC}"
    exit 1
fi

# 检查并安装Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}🐳 安装Docker...${NC}"
    curl -fsSL https://get.docker.com | bash -s docker
    
    # 启动Docker服务
    systemctl start docker
    systemctl enable docker
    
    echo -e "${GREEN}✅ Docker安装完成${NC}"
else
    echo -e "${GREEN}✅ Docker已安装${NC}"
fi

# 检查并安装Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}🔧 安装Docker Compose...${NC}"
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✅ Docker Compose安装完成${NC}"
else
    echo -e "${GREEN}✅ Docker Compose已安装${NC}"
fi

# 配置防火墙
echo -e "${YELLOW}🔥 配置防火墙...${NC}"
if command -v ufw &> /dev/null; then
    # Ubuntu/Debian
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    echo "y" | ufw enable
elif command -v firewall-cmd &> /dev/null; then
    # CentOS/RHEL
    firewall-cmd --permanent --add-port=22/tcp
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --reload
fi

# 停止并删除现有容器
echo -e "${YELLOW}🛑 清理现有部署...${NC}"
if docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q .; then
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
    echo -e "${GREEN}✅ 已清理现有容器${NC}"
fi

# 删除旧镜像
if docker images -q ${IMAGE_NAME} | grep -q .; then
    docker rmi ${IMAGE_NAME} || true
fi

# 构建新镜像
echo -e "${YELLOW}🔨 构建Docker镜像...${NC}"
echo -e "${BLUE}这可能需要几分钟时间，请耐心等待...${NC}"

docker build -t ${IMAGE_NAME} . --no-cache

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 镜像构建成功${NC}"
else
    echo -e "${RED}❌ 镜像构建失败${NC}"
    echo -e "${RED}请检查网络连接和磁盘空间${NC}"
    exit 1
fi

# 运行容器
echo -e "${YELLOW}🚀 启动应用容器...${NC}"
docker run -d \
    --name ${CONTAINER_NAME} \
    --restart unless-stopped \
    -p ${PORT}:80 \
    ${IMAGE_NAME}

# 等待容器启动
echo -e "${YELLOW}⏳ 等待应用启动...${NC}"
sleep 10

# 检查部署状态
if docker ps | grep -q ${CONTAINER_NAME}; then
    echo -e "${GREEN}🎉 部署成功！${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}🌐 应用访问地址:${NC}"
    
    # 获取服务器IP
    PUBLIC_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "your-server-ip")
    echo -e "${GREEN}   公网访问: http://${PUBLIC_IP}${NC}"
    echo -e "${GREEN}   本地访问: http://localhost${NC}"
    
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}📊 容器状态:${NC}"
    docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}💡 常用管理命令:${NC}"
    echo -e "  查看日志: docker logs ${CONTAINER_NAME}"
    echo -e "  重启应用: docker restart ${CONTAINER_NAME}"
    echo -e "  停止应用: docker stop ${CONTAINER_NAME}"
    echo -e "  更新应用: ./deploy.sh"
    
else
    echo -e "${RED}❌ 部署失败${NC}"
    echo -e "${RED}📋 容器日志:${NC}"
    docker logs ${CONTAINER_NAME}
    exit 1
fi

# 清理未使用的镜像
echo -e "${YELLOW}🧹 清理系统...${NC}"
docker image prune -f

echo -e "${GREEN}🎊 ASUPET项目部署完成！${NC}"
echo -e "${BLUE}如有问题，请查看部署文档: DOCKER_DEPLOY.md${NC}"