# 🚀 ASUPET Fly.io 部署指南

## 📋 部署文件说明

我已经为您创建了以下Fly.io部署文件：

- ✅ `fly.toml` - Fly.io 应用配置文件
- ✅ `Dockerfile.fly` - Docker 构建文件
- ✅ `fly-nginx.conf` - Nginx 配置文件
- ✅ `deploy-to-fly.sh` - 自动部署脚本
- ✅ `Fly.io部署指南.md` - 本指南文档

## 🛠️ 部署前准备

### 1. 安装 Fly.io CLI
```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows (PowerShell)
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

### 2. 注册并登录 Fly.io
```bash
# 注册账号（如果没有）
flyctl auth signup

# 登录账号
flyctl auth login
```

### 3. 确认静态文件已构建
```bash
# 如果 dist 目录不存在，先构建
npm run build
```

## 🚀 部署方法

### 方法1：使用自动部署脚本（推荐）
```bash
./deploy-to-fly.sh
```

### 方法2：手动部署
```bash
# 1. 创建应用
flyctl launch --no-deploy

# 2. 部署应用
flyctl deploy

# 3. 查看状态
flyctl status
```

## ⚙️ 配置说明

### fly.toml 配置特点：
- **区域**: `nrt` (东京) - 对中国用户访问速度较好
- **端口**: `8080` - Fly.io 标准端口
- **HTTPS**: 自动强制 HTTPS
- **自动扩缩容**: 根据流量自动启停机器
- **健康检查**: 自动监控应用状态

### Nginx 配置特点：
- **前端路由支持**: `try_files $uri $uri/ /index.html;`
- **静态资源缓存**: 1年缓存期
- **Gzip 压缩**: 减少传输大小
- **安全头**: 增强安全性
- **健康检查端点**: `/health`

## 🌐 部署后访问

### 默认域名
```
https://asupet.fly.dev
```

### 自定义域名（可选）
```bash
# 添加自定义域名
flyctl certs create asupet.com
flyctl certs create www.asupet.com

# 查看DNS配置要求
flyctl certs show asupet.com
```

## 📊 管理命令

### 查看应用状态
```bash
flyctl status
```

### 查看日志
```bash
# 实时日志
flyctl logs

# 历史日志
flyctl logs --since=1h
```

### 扩缩容管理
```bash
# 查看机器状态
flyctl machine list

# 手动扩容
flyctl scale count 2

# 查看资源使用
flyctl machine status
```

### 应用管理
```bash
# 重启应用
flyctl machine restart

# 停止应用
flyctl machine stop

# 启动应用
flyctl machine start
```

## 💰 费用说明

### Fly.io 免费额度：
- ✅ **3个应用** 免费
- ✅ **160GB 出站流量/月** 免费
- ✅ **2340小时运行时间/月** 免费
- ✅ **3GB 持久化存储** 免费

### 静态网站费用：
对于ASUPET这样的静态网站，通常在免费额度内，除非流量特别大。

## 🔧 故障排查

### 常见问题：

1. **部署失败**
   ```bash
   # 查看详细错误
   flyctl logs
   
   # 检查配置
   flyctl config validate
   ```

2. **页面404错误**
   - 检查 `try_files` 配置是否正确
   - 确认 `dist` 目录文件完整

3. **访问慢**
   ```bash
   # 更改区域（可选）
   flyctl regions set nrt hkg sin
   ```

4. **SSL证书问题**
   ```bash
   # 检查证书状态
   flyctl certs list
   
   # 重新申请证书
   flyctl certs create your-domain.com
   ```

## 🔄 更新部署

### 代码更新后重新部署：
```bash
# 重新构建
npm run build

# 重新部署
flyctl deploy
```

### 配置更新：
```bash
# 修改 fly.toml 后
flyctl deploy

# 仅更新配置
flyctl config save
```

## 📈 监控和优化

### 性能监控
```bash
# 查看性能指标
flyctl metrics

# 查看机器资源使用
flyctl machine status
```

### 优化建议
- 启用CDN（Fly.io自带边缘缓存）
- 配置适当的缓存策略
- 监控流量使用情况

## 🆘 技术支持

### 官方资源：
- 📖 [Fly.io 文档](https://fly.io/docs/)
- 💬 [Fly.io 社区](https://community.fly.io/)
- 🐛 [GitHub Issues](https://github.com/superfly/flyctl)

### 常用命令速查：
```bash
flyctl --help          # 帮助信息
flyctl apps list       # 应用列表
flyctl status          # 应用状态
flyctl logs            # 查看日志
flyctl deploy          # 部署应用
flyctl machine list    # 机器列表
```

---

**部署完成后，您的ASUPET网站将在全球CDN上运行，享受快速访问和自动扩缩容！** 🎉
