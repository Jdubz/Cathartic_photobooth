const Printer = require('printer');
const fs = require('fs');

const PRINTER = 'HiTi_P525L';

const dir = './photos';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// console.log(Printer.getPrinters());
// console.log(Printer.getPrinterDriverOptions('HiTi_P525L'));
// console.log(Printer.getSupportedPrintFormats());

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
          printer: 'HiTi_P525L',
          type: 'JPEG',
          options,
          success: (jobId) => {
            console.log('job ' + jobId + ' success');
          },
          error: console.error,
        });
        res.send();
      }
    });
  });
  app.get('/printers', (req, res) => {
    res.send('implementing');
  });
};

