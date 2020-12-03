import io from 'socket.io-client'

const socket = io({reconnection: true, transports: ['websocket']})
export default socket
