const iState = {
  username: "Brandon",
  user_id:34
}

export function reduceRunner(action) {
  return {
    type: action.type,
    payload: action.payload,
  }
}

export default function (state = iState, action) {
  if (state.hasOwnProperty(action.type)) {
    let newState = { ...state };
    newState[action.type] = action.payload;
    return newState
  }
  else {
    return state;
  }
}