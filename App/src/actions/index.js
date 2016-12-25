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

const clearPeerMessage = ()=>{
	return {
		type: 'CLEAR_PEER_MESSAGE'
	}
}

const storeLocally = (password, username)=>{
	var userInfo = {
        token:password,
        username:username
      }
      const serializedState = JSON.stringify(userInfo);
      
      //store token in local storage
      localStorage.setItem('token', serializedState);

	return {
		type: 'STORE_LOCAL'
	}
}

const extractStorage = ()=>{
	const received = JSON.parse(localStorage.getItem('token'));
	return {
		type: 'GET_LOCAL',
		received
	}
}

export {
  login,
  connectSocket,
  addP2pConnection,
  removeP2pConnection,
  getPeerMessage,
  clearPeerMessage,
  storeLocally,
  extractStorage
}
