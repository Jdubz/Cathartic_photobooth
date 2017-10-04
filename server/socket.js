const connections = {};

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
