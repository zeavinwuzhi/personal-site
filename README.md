# Personal Site

这是给 `zwwz.fun` 准备的静态个人主页，可以直接部署到 Cloudflare Pages。

## 文件

- `index.html`：主页结构
- `styles.css`：样式

## 本地预览

直接双击 `index.html` 即可查看基础效果。

如果想用本地服务预览，在当前目录执行：

```powershell
python -m http.server 8081
```

然后访问：

```text
http://127.0.0.1:8081
```

## Cloudflare Pages 部署

1. 把 `personal-site` 上传到一个 GitHub 仓库
2. 在 Cloudflare 里进入 `Workers & Pages` 或 `Compute -> Pages`
3. 选择 `Create application -> Pages -> Connect to Git`
4. 连接 GitHub 仓库并选择这个项目
5. 构建设置留空
6. `Build command` 留空
7. `Build output directory` 填：

```text
/
```

8. 部署完成后，把自定义域名绑定到：

```text
zwwz.fun
```

## 建议的域名分工

- `zwwz.fun`：个人主页
- `nas.zwwz.fun`：NAS 管理页
- `remote.zwwz.fun`：Guacamole 远程桌面
- `nas6.zwwz.fun`：IPv6 直连
