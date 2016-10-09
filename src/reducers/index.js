import {combineReducers} from 'redux'


const allReducers = combineReducers({

    socket:(state=null, action)=> {
      switch(action.type) {
        case "CONNECT":
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

  p2p:(state = null, action )=>{
      return state
  }
});

export default allReducers
