import {
  React,
} from 'globalImports';
import io from 'socket.io-client';

const socket = io.connect();

const Socket = ({ btnPress }) => {
  socket.on('btnPress', btnPress);
  return (<div />);
};

export default Socket;
