const iState = {
  username: "Brandon",
  user_id:34,
  votes:[],
}

export function reduceRunner(action) {
  return {
    type: action.type,
    payload: action.payload,
  }
}

const ADD_NEW_VOTE = "ADD_NEW_VOTE";
export function addNewVote(action){
  return{
    type:ADD_NEW_VOTE,
    payload:action
  }
}

export default function (state = iState, action) {
  let newState = {...state}
  switch(action.type){
    case ADD_NEW_VOTE:{
      newState.votes.push(action.payload);
      return {...newState}
    }
      default:{
        return {...newState}
      }
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