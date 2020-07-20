import * as Types from "../constants/ActionTypes"

var initialSate = {};

const products = (state=initialSate, action)=>{
    let {product} = action
    switch(action.type){
        case Types.FETCH_PRODUCT:
            state = product;
            return {...state}
        default:
            return {...state}
    }
}

export default products;