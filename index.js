const express = require("express");
const https = require("https");
const compression = require("compression");

const fs = require("fs");
const path = require("path");

const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");

const app = express();

const environment = process.env.ENVIRONMENT || "production";
const listenPort = process.env.PORT || 8080;
const productionBaseURL =
  process.env.PRODUCTION_BASE_URL || "https://proxy.lurenjia.in";

const domainName =
  environment === "development" ? "https://localhost" : productionBaseURL;

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

const onProxyRes = responseInterceptor(
  async (responseBuffer, proxyRes, req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, POST,PUT, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.removeHeader("Content-Security-Policy");

    let response = responseBuffer;

    if (shouldBeReplaced(req.url)) {
      response = responseBuffer.toString("utf8");

      return response
        .replaceAll("https://www.notion.so", domainName)
        .replaceAll("https://notion.so", domainName);
    }

    return response;
  }
);

const shouldBeReplaced = (url) => {
  let match = false;
  const prefixList = ["/app"];

  prefixList.forEach((eachPrefix) => {
    if (match) return;
    if (url.startsWith(eachPrefix)) match = true;
  });

  return match;
};

app.use(compression());

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/convert", (req, res) => {
  res.send(
    fs.readFileSync(path.join(__dirname, "public/convert.html")).toString()
  );
});

app.use(
  "/",
  createProxyMiddleware({
    target: "https://www.notion.so/",
    changeOrigin: true,
    ws: true,
    selfHandleResponse: true,
    onProxyRes: onProxyRes,
    headers: {
      Referer: "https://www.notion.so/",
    },
  })
);

console.log(`open webpage at ${domainName}`);

if (environment === "development") {
  var key = fs.readFileSync(path.join(__dirname + "key/selfsigned.key"));
  var cert = fs.readFileSync(path.join(__dirname + "key/selfsigned.crt"));

  var options = {
    key: key,
    cert: cert,
  };

  var server = https.createServer(options, app);

  server.listen(443);
} else {
  app.listen(listenPort);
}

module.exports = app;
