import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.socket = io('http://localhost:6197'); // Replace with your server URL
      SocketService.instance = this;
    }

    return SocketService.instance;
  }

  getSocket() {
    return this.socket;
  }

  // Add any other methods to interact with the socket if needed
}

const instance = new SocketService();
Object.freeze(instance);

export default instance;