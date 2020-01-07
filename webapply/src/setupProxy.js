const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/quickapply",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/quickapply/": "/"
      }
    })
  );
  app.use(
    "/webapply",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
  app.use(
    "/docUploader",
    proxy({
      target: "http://localhost:8081",
      changeOrigin: true
    })
  );
};
