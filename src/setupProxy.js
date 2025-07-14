const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://bmdk-back.onrender.com",
      changeOrigin: true,
    })
  );
};
