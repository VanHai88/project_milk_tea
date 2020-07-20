import * as Types from "../constants/ActionTypes";
var initialSate = null;

const shipperAddressUser = (state=initialSate, action)=>{
    let {shipperAddress} = action
    switch(action.type){
        case Types.FETCH_USER_SHIPPER_ADDRESS:
            state = shipperAddress;
            return {...state}
        default:
            return state
    }
}

export default shipperAddressUser;