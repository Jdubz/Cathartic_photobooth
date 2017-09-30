
const fs = require('fs');

module.exports = (app) => {
  app.post('/photo', (req, res) => {
    const buf = new Buffer(req.body, 'base64');
    fs.writeFile(`photos/${Date.now()}.jpg`, buf, (err) => {
      res.send(err || 200);
    });
  });
};
