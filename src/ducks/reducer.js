const iState = {
  username: "Brandon",
  user_id:34,
  votes:[],
  logValidator:false,
  mousePosX: null,
  mousePosY: null,
  width:window.innerWidth,
  height:window.innerHeight,
}

export function reduceRunner(action) {
  return {
    type: action.type,
    payload: action.payload,
  }
}

const LOG_VALIDATOR = "LOG_VALIDATOR"
export function logValidator(action){
  return {
    type:LOG_VALIDATOR,
    payload:action,
  }
}

export default function (state = iState, action) {
  let newState = {...state}
  switch(action.type){
    case LOG_VALIDATOR:
      newState.logValidator = !newState.logValidator;
  
      newState.mousePosX = action.payload.mousePosX;
      newState.mousePosY = action.payload.mousePosY;
      return {...newState}
    
      default:
        return {...newState}
      
  }
  // if (state.hasOwnProperty(action.type)) {
  //   let newState = { ...state };
  //   newState[action.type] = action.payload;
  //   return newState
  // }
  // else {
  //   return state;
  // }
}