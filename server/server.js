const logging = require('./config/logging.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(logging.requestLogger);

app.use(express.static(`${__dirname}/../dist`));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/routes.js')(app);

app.use(logging.errorLogger);

const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4444;
server.listen(port, () => {
  logging.info(`listening on *:${port}`);
});

require('./socket').Socket(io);
