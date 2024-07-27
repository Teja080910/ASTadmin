import { io } from 'socket.io-client';

const URL = "https://timer-server-edko.onrender.com"

export const socket = io(URL);