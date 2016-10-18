import {combineReducers} from 'redux'


const allReducers = combineReducers({

    socket:(state=null, action)=> {
      switch(action.type) {
        case "CONNECT_SOCKET":
          return action.socket;
      }
      return state;
    },

    p2p:(state={conn:null},action)=>{
        switch(action.type){
          case "ADD_P2PCONNECTION":
              return Object.assign({},state,{conn:action.conn});
          case "REMOVE_CONNECTION":
            return Object.assign({},state,{conn:null});
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
  }
});

export default allReducers
