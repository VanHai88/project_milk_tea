import * as Types from "../constants/ActionTypes"

var initialSate = [];

const users = (state=initialSate, action)=>{
    let {users, user, id} = action
    let index = -1;
    switch(action.type){
        case Types.FETCH_USERS:
            state = users;
            return [...state]
        case Types.ADD_USERS:
            state.unshift(user)
            return [...state]
        case Types.UPDATE_USER:
            index = state.findIndex(item => item.id === user.id)
            if(index!== -1){
                state[index].userName = user.userName;
                state[index].profileImg = user.profileImg;
                state[index].phone = user.phone;
                state[index].address = user.address;
                if(user.password !== ""){
                    state[index].password = user.password;
                }
            }
            return [...state]
            case Types.DELETE_USER:
                index = state.findIndex(item => item.id === id)
                if(index!== -1){
                    state.splice(index, 1)
                }
                return [...state]
        default:
            return [...state]
    }
}

export default users;