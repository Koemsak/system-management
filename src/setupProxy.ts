import { createProxyMiddleware } from 'http-proxy-middleware';
export default function (app: any) {
    app.use(
      '/api',  // Target all requests starting with /api
      createProxyMiddleware({
        target: 'https://831f-155-190-51-7.ngrok-free.app',  // External API
        changeOrigin: true,  // Change the origin of the request
        pathRewrite: {
          '^/api': '',  // Remove `/api` before sending to the target
        },
      })
    );
  }