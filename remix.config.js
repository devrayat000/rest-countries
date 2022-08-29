/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: process.env.NETLIFY || process.env.NETLIFY_LOCAL ? "netlify" : "node-cjs",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
