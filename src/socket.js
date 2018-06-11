import io from 'socket.io-client';
const socket = io('https://chatpublic.herokuapp.com:17240');
export default socket;