const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const pkg = require('../../package.json');

const server = (() => {
  const env = process.env.NODE_ENV;
  const app = express();
  let serverProcess;

  const start = () => new Promise(resolve => {
    app.set('port', process.env.PORT || 3000);
    app.use(cors());
    app.use(bodyParser.json({
      type: '*/*'
    }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    serverProcess = app.listen(app.get('port'), () => {
      console.info('------------------------------------------------------------------');
      console.info(`${pkg.name} - Version: ${pkg.version}`);
      console.info('------------------------------------------------------------------');
      console.info(`ATTENTION, ${env} ENVIRONMENT!`);
      console.info('------------------------------------------------------------------');
      console.info(`Express server listening on port: ${serverProcess.address().port}`);
      console.info('------------------------------------------------------------------');

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close(err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    start,
    stop
  };
})();

module.exports = server;