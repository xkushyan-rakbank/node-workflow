const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/quickapply",
    proxy({
      target: "https://quickapplydev.rakbank.ae",
      changeOrigin: true,
      pathRewrite: {
        "^/quickapply/": "/"
      }
    })
  );
  app.use(
    "/webapply",
    proxy({
      target: "https://quickapplydev.rakbank.ae",
      changeOrigin: true
    })
  );
  app.use(
    "/docUploader",
    proxy({
      target: "https://uatrmtc.rakbankonline.ae",
      changeOrigin: true,
      secure: false
    })
  );
  app.use(
    "/rdocUploader",
    proxy({
      target: "https://uatrmtc.rakbankonline.ae",
      changeOrigin: true,
      secure: false
    })
  );
};
