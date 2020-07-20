import * as Types from "../constants/ActionTypes"

var initialSate = [];

const productsCategories = (state=initialSate, action)=>{
    let {categories} = action
    switch(action.type){
        case Types.FETCH_PRODUCTS_CATEGORIES:
            state = categories;
            return [...state]
        default:
            return [...state]
    }
}

export default productsCategories;