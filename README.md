# vlog-node midway-typescript

Vlog-Life 服务端，基于[midway.js](https://midwayjs.org/midway/) 实现的 `RESTful`

## 客户端

- [vlog-life 小程序](https://github.com/jigang-duan/vlog-life)

## 特性

- web框架： midway.js
- 语言： typescript
- 数据库： mysql + sequelize
- 部署: pm2

## 使用

> 需要先启动数据库，创建 vlog 数据库 

### 运行

```bash
npm run dev
```

或 `vscode` 运行

### 构建

```bash
npm run build
```

编译typescript, 生成目录`dist`;
构建后运行：

```bash
node index.js
```

### 部署

修改 `ecosystem.config.js` 中配置

```bash
# 初次
pm2 deploy ecosystem.config.js production setup
```

```bash
pm2 deploy ecosystem.config.js production
```
