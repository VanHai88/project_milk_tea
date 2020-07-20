import * as Types from "../constants/ActionTypes"

var initialSate = [];

const products = (state=initialSate, action)=>{
    let {products} = action
    switch(action.type){
        case Types.FETCH_PRODUCTS:
            state = products;
            return [...state]
        default:
            return [...state]
    }
}

export default products;