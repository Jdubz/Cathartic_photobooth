const Printer = require('printer');
const fs = require('fs'); //

console.log(Printer.getPrinters());
const printer = 'Brother HL-2230 series';
// console.log(Printer.getSupportedJobCommands());
// console.log(Printer.getSupportedPrintFormats());

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
          type: 'RAW',
          printer: printer,
          options: {
            media: 'letter',
            'fit-to-page': true,
          },
          success: (jobId) => console.log('finished ' + jobId),
          error: (err) => console.error(err),
        });
        res.send();
      }
    });
  });
  app.get('/printers', (req, res) => {
    const printers = Printer.getPrinters();
    res.send(printers);
  });
};
