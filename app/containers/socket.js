import io from 'socket.io-client';

const socket = io.connect();
let receive = () => {
  console.log('socket not mounted');
};
socket.on('btnPress', (msg) => {
  console.log(msg);
  receive(msg);
});

const Socket = (btnPress) => {
  receive = btnPress;
};

export default Socket;
