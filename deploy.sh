#!/bin/bash

# ASUPET项目部署脚本
# 适用于阿里云轻量服务器

set -e

echo "🚀 开始部署ASUPET项目..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
IMAGE_NAME="asupet-web"
CONTAINER_NAME="asupet-web"
PORT="80"

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
    echo "安装命令: curl -fsSL https://get.docker.com | bash -s docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose未安装，将使用docker命令部署${NC}"
    USE_COMPOSE=false
else
    USE_COMPOSE=true
fi

# 停止并删除现有容器
echo -e "${YELLOW}🛑 停止现有容器...${NC}"
if docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q .; then
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
    echo -e "${GREEN}✅ 已停止并删除现有容器${NC}"
fi

# 删除旧镜像
echo -e "${YELLOW}🗑️  清理旧镜像...${NC}"
if docker images -q ${IMAGE_NAME} | grep -q .; then
    docker rmi ${IMAGE_NAME} || true
fi

# 构建新镜像
echo -e "${YELLOW}🔨 构建Docker镜像...${NC}"
docker build -t ${IMAGE_NAME} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 镜像构建成功${NC}"
else
    echo -e "${RED}❌ 镜像构建失败${NC}"
    exit 1
fi

# 部署应用
if [ "$USE_COMPOSE" = true ]; then
    echo -e "${YELLOW}🚀 使用Docker Compose部署...${NC}"
    docker-compose up -d
else
    echo -e "${YELLOW}🚀 使用Docker命令部署...${NC}"
    docker run -d \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        -p ${PORT}:80 \
        ${IMAGE_NAME}
fi

# 检查部署状态
echo -e "${YELLOW}🔍 检查部署状态...${NC}"
sleep 5

if docker ps | grep -q ${CONTAINER_NAME}; then
    echo -e "${GREEN}✅ 部署成功！${NC}"
    echo -e "${GREEN}🌐 应用已启动，访问地址: http://localhost:${PORT}${NC}"
    echo -e "${GREEN}📊 容器状态:${NC}"
    docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo -e "${RED}❌ 部署失败，请检查日志${NC}"
    echo -e "${RED}📋 容器日志:${NC}"
    docker logs ${CONTAINER_NAME}
    exit 1
fi

# 清理未使用的镜像
echo -e "${YELLOW}🧹 清理未使用的镜像...${NC}"
docker image prune -f

echo -e "${GREEN}🎉 部署完成！${NC}"
echo -e "${GREEN}💡 常用命令:${NC}"
echo -e "  查看日志: docker logs ${CONTAINER_NAME}"
echo -e "  重启应用: docker restart ${CONTAINER_NAME}"
echo -e "  停止应用: docker stop ${CONTAINER_NAME}"
echo -e "  进入容器: docker exec -it ${CONTAINER_NAME} sh"