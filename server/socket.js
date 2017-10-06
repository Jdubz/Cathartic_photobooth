const SerialPort = require('serialport');

const connections = {};

SerialPort.list()
  .then(console.log);
const port = new SerialPort('/dev/tty.wchusbserial14140', {
  baudRate: 9600,
});

port.on('data', (data) => {
  const strData = data.toString('utf8');
  console.log('button ' + strData);
  for (let socket in connections) {
    connections[socket].emit('btnPress', strData);
  }
});

const Socket = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    connections[socket.id] = socket;

    socket.on('disconnect', () => {
      console.log(socket.id + ' disconnected');
      delete connections[socket.id];
    });
  });
};

const getSockets = () => {
  return connections;
};

module.exports = {
  Socket,
  getSockets,
};
