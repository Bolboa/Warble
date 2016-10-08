import {combineReducers} from 'redux'

var initialTasks = [
  {
    task: "Wash the dishes",
    completed: false
  },
  {
    task: "Do your laundry",
    completed: true
  },
  {
    task: "Walk the dog",
    completed: false
  },
  {
    task: "Clean your room",
    completed: true
  }
];

const allReducers = combineReducers({
    headerTitle:()=>"Ese's React-Redux Beginner Starter Kit!",
    username:(state=null,action)=>{
      switch(action.type){
        case "LOGIN":
          return action.username
      }
      return state;
    }
});

export default allReducers
