# 任务看板 (Kanban Board)

基于 Express + React 的简易任务看板应用。

## 项目结构

```
.
├── server/          # 后端 Express 服务
├── client/          # 前端 React 应用
└── README.md
```

## 功能特性

### 后端
- Express REST API，端口 3001
- 内存数据存储
- API 接口：
  - `GET /api/tasks` - 获取所有任务
  - `POST /api/tasks` - 创建任务
  - `PUT /api/tasks/:id` - 更新任务状态
  - `DELETE /api/tasks/:id` - 删除任务
- 任务字段：id、title、description、status（todo/in-progress/done）、createdAt

### 前端
- React + Vite，端口 5173
- 三列看板：待办、进行中、已完成
- 拖拽卡片在列之间移动更新状态
- 点击 + 号新增任务（弹窗表单）
- 点击删除按钮移除任务

## 启动方式

### 方式一：分别启动

#### 启动后端
```bash
cd server
npm install
npm start
```
后端运行在 http://localhost:3001

#### 启动前端（新开终端）
```bash
cd client
npm install
npm run dev
```
前端运行在 http://localhost:5173

### 方式二：使用 concurrently 同时启动（可选）

在根目录创建 package.json：
```json
{
  "scripts": {
    "install:all": "cd server && npm install && cd ../client && npm install",
    "server": "cd server && npm start",
    "client": "cd client && npm run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

然后运行：
```bash
npm install
npm run install:all
npm run dev
```

## 使用说明

1. 打开 http://localhost:5173
2. 点击"待办"列右上角的 + 号添加新任务
3. 拖拽任务卡片在不同列之间移动来更新状态
4. 点击任务卡片右下角的"删除"按钮移除任务