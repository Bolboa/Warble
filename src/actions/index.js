const saySomething = message =>{
  return {
    type: "SAY_SOMETHING",
    message
  }
}

const toggleComplete = index =>{
  console.log()
  return {
    type:"TOGGLE_COMPLETE",
    index
  }
}

export {
  saySomething,
  toggleComplete
}
