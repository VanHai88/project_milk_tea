import * as Types from "../constants/ActionTypes"

var initialSate = ""

const message = (state = initialSate, action) => {
    switch (action.type) {
        case Types.CHANGE_MESSAGE:
            return action.message;
        default:
            return state
    }
}

export default message;