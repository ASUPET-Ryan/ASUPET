#!/bin/bash

# ASUPET项目 - 宝塔面板Docker一键部署脚本
# 专为宝塔面板环境设计

set -e

echo "🚀 ASUPET项目 - 宝塔面板Docker部署脚本"
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
PROJECT_PATH="/www/wwwroot/asupet"
BT_PANEL_PATH="/www/server/panel"

# 检查是否在宝塔面板环境
check_bt_environment() {
    echo -e "${YELLOW}🔍 检查宝塔面板环境...${NC}"
    
    if [ ! -d "$BT_PANEL_PATH" ]; then
        echo -e "${RED}❌ 未检测到宝塔面板环境${NC}"
        echo -e "${RED}请确保在安装了宝塔面板的服务器上运行此脚本${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 宝塔面板环境检测通过${NC}"
}

# 检查Docker是否安装
check_docker() {
    echo -e "${YELLOW}🐳 检查Docker安装状态...${NC}"
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker未安装${NC}"
        echo -e "${YELLOW}请在宝塔面板「软件商店」中安装「Docker管理器」${NC}"
        echo -e "${YELLOW}安装步骤：${NC}"
        echo -e "  1. 登录宝塔面板"
        echo -e "  2. 进入「软件商店」"
        echo -e "  3. 搜索「Docker管理器」"
        echo -e "  4. 点击「安装」"
        exit 1
    fi
    
    # 检查Docker服务状态
    if ! systemctl is-active --quiet docker; then
        echo -e "${YELLOW}⚠️  Docker服务未启动，正在启动...${NC}"
        systemctl start docker
        systemctl enable docker
    fi
    
    echo -e "${GREEN}✅ Docker环境正常${NC}"
}

# 检查项目路径
check_project_path() {
    echo -e "${YELLOW}📁 检查项目路径...${NC}"
    
    if [ ! -f "./Dockerfile" ]; then
        echo -e "${RED}❌ 未找到Dockerfile文件${NC}"
        echo -e "${RED}请确保在项目根目录运行此脚本${NC}"
        exit 1
    fi
    
    # 获取当前路径
    CURRENT_PATH=$(pwd)
    echo -e "${GREEN}✅ 项目路径: ${CURRENT_PATH}${NC}"
}

# 停止现有容器
stop_existing_container() {
    echo -e "${YELLOW}🛑 检查并停止现有容器...${NC}"
    
    if docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q .; then
        echo -e "${YELLOW}停止现有容器: ${CONTAINER_NAME}${NC}"
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}
        echo -e "${GREEN}✅ 已清理现有容器${NC}"
    else
        echo -e "${GREEN}✅ 无需清理容器${NC}"
    fi
}

# 清理旧镜像
clean_old_images() {
    echo -e "${YELLOW}🗑️  清理旧镜像...${NC}"
    
    if docker images -q ${IMAGE_NAME} | grep -q .; then
        docker rmi ${IMAGE_NAME} || true
        echo -e "${GREEN}✅ 已清理旧镜像${NC}"
    fi
}

# 构建Docker镜像
build_image() {
    echo -e "${YELLOW}🔨 构建Docker镜像...${NC}"
    echo -e "${BLUE}这可能需要几分钟时间，请耐心等待...${NC}"
    
    # 使用宝塔面板专用的docker-compose配置
    if [ -f "docker-compose.bt.yml" ]; then
        echo -e "${BLUE}使用宝塔面板专用配置构建...${NC}"
        docker-compose -f docker-compose.bt.yml build
    else
        echo -e "${BLUE}使用标准Dockerfile构建...${NC}"
        docker build -t ${IMAGE_NAME} . --no-cache
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 镜像构建成功${NC}"
    else
        echo -e "${RED}❌ 镜像构建失败${NC}"
        exit 1
    fi
}

# 运行容器
run_container() {
    echo -e "${YELLOW}🚀 启动应用容器...${NC}"
    
    # 优先使用docker-compose
    if [ -f "docker-compose.bt.yml" ]; then
        echo -e "${BLUE}使用Docker Compose启动...${NC}"
        docker-compose -f docker-compose.bt.yml up -d
    else
        echo -e "${BLUE}使用Docker命令启动...${NC}"
        docker run -d \
            --name ${CONTAINER_NAME} \
            --restart unless-stopped \
            -p ${PORT}:80 \
            --label "com.bt.description=ASUPET企业官网" \
            --label "com.bt.group=web" \
            ${IMAGE_NAME}
    fi
}

# 检查部署状态
check_deployment() {
    echo -e "${YELLOW}⏳ 等待应用启动...${NC}"
    sleep 10
    
    if docker ps | grep -q ${CONTAINER_NAME}; then
        echo -e "${GREEN}🎉 部署成功！${NC}"
        echo -e "${GREEN}================================================${NC}"
        
        # 获取服务器IP
        PUBLIC_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "your-server-ip")
        
        echo -e "${GREEN}🌐 应用访问地址:${NC}"
        echo -e "${GREEN}   公网访问: http://${PUBLIC_IP}${NC}"
        echo -e "${GREEN}   本地访问: http://localhost${NC}"
        
        # 宝塔面板管理提示
        echo -e "${GREEN}================================================${NC}"
        echo -e "${GREEN}📊 宝塔面板管理:${NC}"
        echo -e "  1. 登录宝塔面板: http://${PUBLIC_IP}:8888"
        echo -e "  2. 进入「Docker管理器」"
        echo -e "  3. 在「容器管理」中查看 ${CONTAINER_NAME}"
        
        echo -e "${GREEN}================================================${NC}"
        echo -e "${GREEN}💡 常用管理命令:${NC}"
        echo -e "  查看日志: docker logs ${CONTAINER_NAME}"
        echo -e "  重启应用: docker restart ${CONTAINER_NAME}"
        echo -e "  停止应用: docker stop ${CONTAINER_NAME}"
        echo -e "  更新应用: ./bt-deploy.sh"
        
        # 显示容器状态
        echo -e "${GREEN}================================================${NC}"
        echo -e "${GREEN}📋 容器状态:${NC}"
        docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        
    else
        echo -e "${RED}❌ 部署失败${NC}"
        echo -e "${RED}📋 容器日志:${NC}"
        docker logs ${CONTAINER_NAME} || true
        exit 1
    fi
}

# 清理系统
cleanup_system() {
    echo -e "${YELLOW}🧹 清理系统...${NC}"
    docker image prune -f
    echo -e "${GREEN}✅ 系统清理完成${NC}"
}

# 显示宝塔面板信息
show_bt_info() {
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}🎛️  宝塔面板相关信息:${NC}"
    
    # 尝试获取宝塔面板端口
    BT_PORT=$(cat /www/server/panel/data/port.pl 2>/dev/null || echo "8888")
    PUBLIC_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "your-server-ip")
    
    echo -e "${GREEN}   面板地址: http://${PUBLIC_IP}:${BT_PORT}${NC}"
    echo -e "${GREEN}   Docker管理: 面板 → 软件商店 → Docker管理器${NC}"
    echo -e "${GREEN}   容器管理: Docker管理器 → 容器管理${NC}"
    echo -e "${GREEN}   镜像管理: Docker管理器 → 镜像管理${NC}"
    
    echo -e "${GREEN}================================================${NC}"
    echo -e "${BLUE}📖 更多帮助请查看: bt-docker-config.md${NC}"
}

# 主函数
main() {
    check_bt_environment
    check_docker
    check_project_path
    stop_existing_container
    clean_old_images
    build_image
    run_container
    check_deployment
    cleanup_system
    show_bt_info
    
    echo -e "${GREEN}🎊 ASUPET项目在宝塔面板中部署完成！${NC}"
}

# 执行主函数
main "$@"