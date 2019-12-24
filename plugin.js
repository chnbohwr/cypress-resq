const fs = require('fs');

const plugin = {
  injectResq: () => {
    return new Promise((rs, rj) => {
      fs.readFile('node_modules/resq/dist/index.js', 'utf-8', (err, data) => {
        if (err) {
          rj(new Error('can not find resq lib.'));
        } else {
          rs(data);
        }
      });
    })
  },
};

module.exports = plugin;
