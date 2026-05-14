// Patch os.hostname() to return ASCII-only value, then run Vercel CLI
const Module = require("module");
const origResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  const resolved = origResolve.apply(this, arguments);
  if (request === "os" || request.endsWith("/os") || request.endsWith("\\os")) {
    return resolved;
  }
  return resolved;
};

const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  const mod = origLoad.apply(this, arguments);
  if (request === "os") {
    mod.hostname = function () {
      return "blueocean-dev";
    };
  }
  return mod;
};

// Now load and run Vercel CLI
process.argv.splice(1, 1); // Remove the wrapper script from argv
const vercelPath = "C:/Users/lyl20/AppData/Roaming/npm/node_modules/vercel";
const pkg = require(vercelPath + "/package.json");
require(vercelPath + "/" + (pkg.main || "dist/index.js"));
