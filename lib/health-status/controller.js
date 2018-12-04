const packageInfo = require('../../package.json');

const controller = (() => {
  const get = (req, res) => {
    const health = {
      datetime: new Date(),
      service: packageInfo.name,
      version: packageInfo.version,
      container: process.env.HOSTNAME
    };

    return res.status(200).send(health);
  };

  return {
    get
  };
})();

module.exports = controller;