import * as Types from "../constants/ActionTypes"

var initialSate = [];

const comments = (state=initialSate, action)=>{
    let {comment, comments} = action
    switch(action.type){
        case Types.FETCH_COMMENT:
            state = comments;
            return [...state]
        case Types.ADD_COMMENT:
            state.unshift(comment);
            return [...state]
        default:
            return [...state]
    }
}

export default comments;