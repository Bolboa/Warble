const login = (username)=>{
	return {
		type: "LOGIN",
		username
	}
}

const connectSocket = (socket) =>{
	return {
		type:"CONNECT",
		socket
	}
}

const joinRoom = (room) =>{
	return {
		type:"JOIN_ROOM",
		room
	}
}

export {
  login,
  connectSocket,
  joinRoom
}
