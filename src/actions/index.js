const login = (username)=>{
	return {
		type: "LOGIN",
		username
	}
}

const connectSocket = (socket) =>{
	return {
		type:"CONNECT_SOCKET",
		socket
	}
}

const joinRoom = (room) =>{
	return {
		type:"JOIN_ROOM",
		room
	}
}

const toggleP2pConnection = ()=>{
	 return {
		 type:"TOGGLE_P2P"
	 }
 }
const addP2pConnection = (conn)=>{
	return {
		type: "ADD_P2PCONNECTION" ,
		conn
	}
}

const getPeerMessage = (message)=>{
	return{
		type:'PEER_MESSAGE',
		message
	}
}

export {
  login,
  connectSocket,
  joinRoom,
  toggleP2pConnection,
  addP2pConnection,
  getPeerMessage
}
