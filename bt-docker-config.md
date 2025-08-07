# 宝塔面板 Docker 部署配置

本文档介绍如何在宝塔面板中使用Docker功能部署ASUPET项目。

## 📋 前置要求

- 已安装宝塔面板
- 宝塔面板已安装Docker管理器插件
- 服务器配置：2核4GB内存以上

## 🐳 宝塔面板Docker插件安装

1. **登录宝塔面板**
   ```
   访问: http://your-server-ip:8888
   ```

2. **安装Docker管理器**
   - 进入「软件商店」
   - 搜索「Docker管理器」
   - 点击「安装」

3. **启动Docker服务**
   - 安装完成后，Docker服务会自动启动
   - 可在「软件商店」→「已安装」中管理Docker

## 🚀 在宝塔面板中部署ASUPET

### 方法一：使用宝塔Docker管理器界面

1. **上传项目文件**
   - 通过宝塔文件管理器上传项目到 `/www/wwwroot/asupet`
   - 或使用Git克隆项目

2. **创建Docker镜像**
   - 进入「Docker管理器」
   - 点击「镜像管理」→「构建镜像」
   - 镜像名称：`asupet-web`
   - Dockerfile路径：`/www/wwwroot/asupet/Dockerfile`
   - 点击「构建」

3. **创建容器**
   - 进入「容器管理」→「添加容器」
   - 镜像：选择刚构建的 `asupet-web`
   - 容器名称：`asupet-web`
   - 端口映射：`80:80`
   - 重启策略：`unless-stopped`
   - 点击「提交」

### 方法二：使用宝塔终端命令

1. **进入宝塔终端**
   - 在宝塔面板点击「终端」

2. **执行部署命令**
   ```bash
   # 进入项目目录
   cd /www/wwwroot/asupet
   
   # 构建镜像
   docker build -t asupet-web .
   
   # 运行容器
   docker run -d \
     --name asupet-web \
     --restart unless-stopped \
     -p 80:80 \
     asupet-web
   ```

## 🔧 宝塔面板专用配置

### 1. 反向代理配置（可选）

如果需要通过域名访问，可以在宝塔面板设置反向代理：

1. **添加站点**
   - 进入「网站」→「添加站点」
   - 域名：`your-domain.com`
   - 根目录：`/www/wwwroot/asupet`

2. **设置反向代理**
   - 点击站点「设置」
   - 选择「反向代理」
   - 代理名称：`asupet`
   - 目标URL：`http://127.0.0.1:80`
   - 点击「提交」

### 2. SSL证书配置

1. **申请SSL证书**
   - 在站点设置中选择「SSL」
   - 选择「Let's Encrypt」免费证书
   - 点击「申请」

2. **强制HTTPS**
   - 证书申请成功后
   - 开启「强制HTTPS」

## 📊 宝塔面板Docker管理

### 容器管理

在宝塔面板的Docker管理器中可以：

- **查看容器状态**：实时监控容器运行状态
- **查看日志**：点击容器操作中的「日志」
- **重启容器**：点击「重启」按钮
- **停止容器**：点击「停止」按钮
- **进入容器**：点击「终端」进入容器内部

### 镜像管理

- **查看镜像列表**：所有本地Docker镜像
- **删除镜像**：清理不需要的镜像
- **拉取镜像**：从Docker Hub拉取镜像

### 网络管理

- **查看网络**：Docker网络配置
- **创建网络**：自定义Docker网络

## 🔒 安全配置

### 1. 防火墙设置

在宝塔面板「安全」中设置：

- 开放端口：`80`, `443`, `8888`（宝塔面板）
- 禁用不必要的端口
- 设置IP白名单（可选）

### 2. 面板安全

- 修改宝塔面板默认端口
- 设置复杂的面板密码
- 开启面板SSL
- 绑定域名访问

## 🔄 更新部署

### 通过宝塔面板更新

1. **停止容器**
   - 在Docker管理器中停止 `asupet-web` 容器

2. **删除容器和镜像**
   - 删除旧容器
   - 删除旧镜像

3. **重新构建**
   - 上传新的项目文件
   - 重新构建镜像
   - 创建新容器

### 一键更新脚本

创建更新脚本 `/www/wwwroot/asupet/bt-update.sh`：

```bash
#!/bin/bash

# 宝塔面板Docker更新脚本
echo "开始更新ASUPET项目..."

# 停止并删除容器
docker stop asupet-web
docker rm asupet-web

# 删除旧镜像
docker rmi asupet-web

# 构建新镜像
docker build -t asupet-web .

# 运行新容器
docker run -d \
  --name asupet-web \
  --restart unless-stopped \
  -p 80:80 \
  asupet-web

echo "更新完成！"
```

## 📈 监控和维护

### 1. 宝塔面板监控

- **系统监控**：CPU、内存、磁盘使用情况
- **Docker监控**：容器资源使用情况
- **日志监控**：应用和系统日志

### 2. 定期维护

- **清理Docker**：定期清理未使用的镜像和容器
- **备份数据**：使用宝塔面板的备份功能
- **更新系统**：保持系统和Docker版本更新

## 🐛 故障排除

### 常见问题

1. **Docker服务未启动**
   ```bash
   systemctl start docker
   systemctl enable docker
   ```

2. **端口冲突**
   - 检查80端口是否被占用
   - 修改容器端口映射

3. **权限问题**
   ```bash
   chmod +x /www/wwwroot/asupet/bt-update.sh
   ```

4. **内存不足**
   - 清理Docker缓存：`docker system prune -a`
   - 增加服务器内存

### 查看日志

```bash
# 查看容器日志
docker logs asupet-web

# 查看实时日志
docker logs -f asupet-web
```

## 📞 技术支持

如果在宝塔面板Docker部署过程中遇到问题：

1. 检查宝塔面板Docker插件是否正常安装
2. 确认Docker服务运行状态
3. 查看容器和应用日志
4. 检查服务器资源使用情况
5. 参考宝塔面板官方文档

---

**注意**：宝塔面板提供了图形化的Docker管理界面，使Docker部署更加简单直观。建议优先使用面板界面进行操作，命令行作为备选方案。