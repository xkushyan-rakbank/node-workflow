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
  app.use(
    "/onboarding",
    proxy({
      target: "https://quickapplydev.rakbank.ae/digitalbank",
      changeOrigin: true
    })
  );
  app.use(
    "/rakbank-kyc",
    proxy({
      target: "https://quickapplydev.rakbank.ae/digitalbank",
      changeOrigin: true,
      secure: false
    })
  );
  app.use(
    "/documentUploader",
    proxy({
      target: "https://uatrmtc.rakbankonline.ae",
      changeOrigin: true
    })
  );
  app.use(
    "/wcmapi",
    proxy({
      target: "https://revamp.rakbank.ae/wcmapi",
      changeOrigin: true
    })
  );
  // app.use(
  //   "/business",
  //   proxy({
  //     target: "http://localhost:3000",
  //     changeOrigin: false,
  //     pathRewrite: {
  //       '^/business' : '/'
  //     }
  //   })
  // );
};
