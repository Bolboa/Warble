const saySomething = message =>{
  return {
    type: "SAY_SOMETHING",
    message
  }
}

export {
  saySomething
}
