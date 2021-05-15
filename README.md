# Express-Notion-Proxy

> 简单Notion代理，使用Express开发

## 原理
- 使用http-proxy-middleware将所有请求代理到 https://www.notion.so/
- 将返回的JS里包含Notion相关域名的字符串修改为用户配置的域名
- 修改对应发送和返回的请求头以保证连接成功

## 使用方法
- 按照.env文件中的说明修改配置文件
- 运行 `npm install`
- 运行 `npm run start`
- 在浏览器中打开你配置的地址

## 小工具

### /ping

访问域名根目录下的`/ping`，如果返回`pong`，说明Express服务器启动成功

### /convert

一个简单的HTML网页，可以把Notion分享出来的地址转换为代理的地址

## 现存限制

> 部分限制可能会在未来版本被解决

- 无法登录和编辑
- 无法代理Page中的Embed Links（如YouTube视频）
- 无法代理Page中的视频（走AWS）

## TODO

- [ ] 拦截XHR，实现所有网络请求的代理
- [ ] 补全注释

## 开源协议

MIT License

```
MIT License Copyright (c) 2021 LuRenJiasWorld

Permission is hereby granted, free
of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice
(including the next paragraph) shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
