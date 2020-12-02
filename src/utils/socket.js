import io from 'socket.io-client'
const socket = io.connect('/api/socket.io')
export default socket
