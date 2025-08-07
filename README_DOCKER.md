# ASUPET Docker 部署

本项目已配置完整的Docker部署方案，可以快速部署到阿里云轻量服务器或其他Docker环境。

## 🚀 快速开始

### 阿里云轻量服务器一键部署

```bash
# 上传项目到服务器后执行
sudo ./aliyun-deploy.sh
```

### 本地或其他环境部署

```bash
# 快速部署
./deploy.sh

# 或使用Docker Compose
docker-compose up -d
```

## 📁 Docker相关文件

- `Dockerfile` - Docker镜像构建文件
- `nginx.conf` - Nginx配置文件
- `docker-compose.yml` - Docker Compose配置
- `.dockerignore` - Docker构建忽略文件
- `deploy.sh` - 通用部署脚本
- `aliyun-deploy.sh` - 阿里云一键部署脚本
- `.env.production` - 生产环境配置

## 🔧 技术栈

- **构建阶段**: Node.js 18 Alpine
- **运行阶段**: Nginx Alpine
- **端口**: 80
- **特性**: 
  - 多阶段构建优化镜像大小
  - Gzip压缩
  - 静态资源缓存
  - SPA路由支持
  - 健康检查

## 📖 详细文档

查看 `DOCKER_DEPLOY.md` 获取完整的部署指南和故障排除信息。

## 🌐 访问应用

部署成功后访问: `http://your-server-ip`

---

**注意**: 确保服务器80端口已开放，并根据需要配置域名和SSL证书。