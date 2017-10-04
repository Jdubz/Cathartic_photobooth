const Printer = require('printer');
const fs = require('fs');

let PRINTER = 'HiTi_P525L';

const dir = './photos';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const options = {
  PageSize: 'P6x4',
  ColorModel: 'RGB',
  copies: 1,
};

module.exports = (app) => {
  app.post('/photo', (req, res) => {
    const img64 = req.body.photo.replace(/^data:image\/jpeg;base64,/, "");
    const filename = `photos/${Date.now()}.jpg`;
    fs.writeFile(filename, img64, 'base64', (err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        const photoBuf = new Buffer(img64, 'base64');
        Printer.printDirect({
          data: photoBuf,
          printer: PRINTER,
          type: 'JPEG',
          options,
          success: (jobId) => {
            console.log('job ' + jobId + ' success');
            res.send('job ' + jobId + ' printing');
          },
          error: (err) => {
            console.error(err);
            res.send(err);
          },
        });
      }
    });
  });
  app.get('/printers', (req, res) => {
    const printerList = Printer.getPrinters();
    res.send(printerList);
  });
  app.post('/printer', (req, res) => {
    PRINTER = req.body.printer.name;
    res.send();
  });
};

