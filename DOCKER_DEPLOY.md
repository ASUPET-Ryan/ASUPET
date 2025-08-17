# ASUPET Docker 部署指南

本指南将帮助您将ASUPET项目部署到阿里云轻量服务器或其他Docker环境中。

## 📋 前置要求

- 阿里云轻量服务器（推荐配置：2核4GB内存）
- 操作系统：Ubuntu 20.04+ 或 CentOS 7+
- Docker 和 Docker Compose

## 🚀 快速部署

### 1. 服务器环境准备

#### 安装Docker
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | bash -s docker
sudo usermod -aG docker $USER

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 安装Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. 上传项目文件

将项目文件上传到服务器，可以使用以下方式之一：

#### 方式1：使用Git（推荐）
```bash
git clone <your-repository-url>
cd asupet1
```

#### 方式2：使用SCP上传
```bash
# 在本地执行
scp -r ./asupet1 root@your-server-ip:/root/
```

### 3. 一键部署

```bash
# 进入项目目录
cd asupet1

# 执行部署脚本
./deploy.sh
```

## 🔧 手动部署

如果自动部署脚本遇到问题，可以手动执行以下步骤：

### 1. 构建镜像
```bash
docker build -t asupet-web .
```

### 2. 运行容器

#### 使用Docker Compose（推荐）
```bash
docker-compose up -d
```

#### 使用Docker命令
```bash
docker run -d \
  --name asupet-web \
  --restart unless-stopped \
  -p 80:80 \
  asupet-web
```

## 🌐 访问应用

部署成功后，您可以通过以下方式访问应用：

- **本地访问**：http://localhost
- **公网访问**：http://your-server-ip

> 注意：确保服务器的80端口已开放，在阿里云控制台的安全组中添加规则。

## 📊 管理命令

### 查看容器状态
```bash
docker ps
```

### 查看应用日志
```bash
docker logs asupet-web
```

### 重启应用
```bash
docker restart asupet-web
```

### 停止应用
```bash
docker stop asupet-web
```

### 更新应用
```bash
# 停止并删除旧容器
docker stop asupet-web
docker rm asupet-web

# 重新构建和运行
./deploy.sh
```

## 🔒 安全配置

### 1. 防火墙设置
```bash
# Ubuntu UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS firewalld
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 2. SSL证书配置（可选）

如果需要HTTPS，可以使用Let's Encrypt：

```bash
# 安装Certbot
sudo apt install certbot

# 获取证书
sudo certbot certonly --standalone -d your-domain.com

# 修改nginx配置支持HTTPS
# 然后重新构建镜像
```

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   sudo lsof -i :80
   sudo kill -9 <PID>
   ```

2. **容器启动失败**
   ```bash
   docker logs asupet-web
   ```

3. **镜像构建失败**
   - 检查网络连接
   - 确保有足够的磁盘空间
   - 检查Dockerfile语法

4. **内存不足**
   ```bash
   # 清理未使用的镜像和容器
   docker system prune -a
   ```

### 性能优化

1. **启用Gzip压缩**（已在nginx.conf中配置）
2. **设置缓存策略**（已在nginx.conf中配置）
3. **监控资源使用**
   ```bash
   docker stats asupet-web
   ```

## 📈 监控和日志

### 查看系统资源
```bash
# 查看容器资源使用
docker stats

# 查看系统资源
htop
df -h
```

### 日志管理
```bash
# 查看实时日志
docker logs -f asupet-web

# 查看最近100行日志
docker logs --tail 100 asupet-web
```

## 🔄 自动化部署

可以设置GitHub Actions或其他CI/CD工具来实现自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to Aliyun
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /path/to/asupet1
          git pull
          ./deploy.sh
```

## 📞 技术支持

如果在部署过程中遇到问题，请检查：

1. 服务器配置是否满足要求
2. 网络连接是否正常
3. Docker服务是否正常运行
4. 端口是否被正确开放

---

**祝您部署顺利！** 🎉