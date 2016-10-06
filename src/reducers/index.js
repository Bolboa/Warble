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
    tasks :(state=initialTasks, action) =>{
      switch(action.type){
        case "TOGGLE_COMPLETE":
          return state.map((task,index)=>{
            if(index === action.index){
                var obj = Object.assign({},state[action.index]);
                obj.completed = !obj.completed;
                return obj;
            }
            return task
          });
      }
      return state
    }
});

export default allReducers
