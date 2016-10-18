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

const addP2pConnection = (conn)=>{
	return {
		type: "ADD_P2PCONNECTION" ,
		conn
	}
}

const removeP2pConnection = () =>{
	return {
		type: "REMOVE_CONNECTION"
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
  addP2pConnection,
  removeP2pConnection,
  getPeerMessage
}
