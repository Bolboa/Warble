const login = (username)=>{
	return {
		type: "LOGIN",
		username
	}
}

const connectSocket = (socket)=>{
	return {
		type:"CONNECT",
		socket
	}
}

export {
  login,
  connectSocket
}

