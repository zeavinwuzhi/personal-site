# Personal Site

这是 `zwwz.fun` 当前使用的静态个人主页项目，可以直接部署到 Cloudflare Pages。

## 文件说明

- `index.html`：主页结构与文案
- `styles.css`：主页样式
- `_headers`：Pages 响应头配置
- `_redirects`：Pages 重定向配置

## 本地预览

直接双击 `index.html` 就可以看到静态页面效果。

如果想用本地服务预览，在当前目录执行：

```powershell
python -m http.server 8081
```

然后访问：

```text
http://127.0.0.1:8081
```

## Cloudflare Pages 部署

1. 把项目上传到一个 GitHub 仓库
2. 在 Cloudflare 里进入 `Workers & Pages`
3. 选择 `Create application -> Pages -> Connect to Git`
4. 连接 GitHub 仓库并选择这个项目
5. 构建设置保持为空
6. `Build command` 留空
7. `Build output directory` 填 `/`
8. 部署完成后，把自定义域名绑定到 `zwwz.fun`

## 当前域名分工

- `zwwz.fun`：个人主页
- `nas.zwwz.fun`：NAS 管理入口
- `remote.zwwz.fun`：Guacamole 远程桌面
- `nas6.zwwz.fun`：IPv6 直连入口

## 下一步建议

- 把真实的个人介绍和头像补进去
- 增加项目展示或作品列表
- 加一个博客入口，或者直接迁移到 Astro / Hugo
- 如果后面服务更多，可以把主页扩成统一导航台
