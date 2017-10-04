import io from 'socket.io-client';
const socket = io.connect('http://localhost');

const Socket = ({ btnPress }) => {
  socket.on('btnPress', btnPress);
  return (<div />);
};

export default Socket;
