import {combineReducers} from 'redux'


const allReducers = combineReducers({

    socket:(state=null, action)=> {
      switch(action.type) {
        case "CONNECT_SOCKET":
          return action.socket;
      }
      return state;
    },

    username:(state=null,action)=>{
      switch(action.type){
        case "LOGIN":
          return action.username
      }
      return state;
  },

  currentRoom:(state=null,action)=>{
      switch(action.type){
        case "JOIN_ROOM":
          return action.room
      }
      return state;
  },

  chatMessages:(state=[],action)=>{
      switch(action.type){
        case "PEER_MESSAGE":
          return [...state, action.message];
      }
      return state;
  },

  p2p:(state={connected:false, conn:null},action)=>{
      switch(action.type){
        case "TOGGLE_P2P":
            return Object.assign({},state,{connected:!state.connected});
        case "ADD_P2PCONNECTION":
            return Object.assign({},state,{conn:action.conn});
      }
      return state;
  }
});

export default allReducers
