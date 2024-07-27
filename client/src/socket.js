import { io } from 'socket.io-client';

const URL = "https://timer-server-eta.vercel.app"

export const socket = io(URL);