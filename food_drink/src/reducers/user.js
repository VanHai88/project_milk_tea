import * as Types from "../constants/ActionTypes"
var initialSate = null;

const user = (state=initialSate, action)=>{
    let {user} = action
    switch(action.type){
        case "SAVE_USER":
            state = user;
            return {...state}
        case Types.DELETE_STATUS_USER:
            return {}
        default:
            return state
    }
}

export default user;