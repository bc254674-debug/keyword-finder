// Preload script to override os.hostname() with ASCII-only value
const Module = require("module");
const origLoad = Module._load;

Module._load = function (request, parent, isMain) {
  const mod = origLoad.apply(this, arguments);
  if (request === "os" && typeof mod.hostname === "function") {
    mod.hostname = function () {
      return "blueocean-dev";
    };
  }
  return mod;
};
