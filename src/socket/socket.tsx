import { Socket, io } from 'socket.io-client'
const socket: Socket = io('ws://localhost:8282', {
  transports: ['websocket', 'pulling', 'flashsocket']
})
export const ClientSocket = {
  getAllOrder: (setAllOrder: any) => {
    socket.emit('client:requestAllLogger', '')
    socket.on('server:loadAllLogger', (data) => {
      setAllOrder(data)
    })
    return () => {
      socket.disconnect()
    }
  }
}
