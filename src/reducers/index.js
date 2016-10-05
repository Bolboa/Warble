import {combineReducers} from 'redux'

const allReducers = combineReducers({
    headerTitle:()=>"Ese's React-Redux Beginner Starter Kit!",
    saySomething:(state="Hello World",action)=>{
      switch(action.type){
        case "SAY_SOMETHING":
          return action.message

      }
      return state
    }
});

export default allReducers
