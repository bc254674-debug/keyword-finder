const Module = require('module');
const origLoad = Module._load;
Module._load = function(request, parent, isMain) {
  const mod = origLoad.apply(this, arguments);
  if (request === 'os') {
    const origHostname = mod.hostname.bind(mod);
    mod.hostname = () => 'blueocean-dev';
  }
  return mod;
};
const vercelPath = 'C:/Users/lyl20/AppData/Roaming/npm/node_modules/vercel';
const pkg = require(vercelPath + '/package.json');
const main = pkg.main || 'dist/index.js';
require(vercelPath + '/' + main);
