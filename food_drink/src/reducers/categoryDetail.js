import * as Types from "../constants/ActionTypes"

var initialSate = {};

const categoryDetail = (state=initialSate, action)=>{
    let {categoryDetail} = action
    switch(action.type){
        case Types.FETCH_CATEGORY_DETAIL:
            state = categoryDetail;
            return {...categoryDetail}
        default:
            return {...categoryDetail}
    }
}

export default categoryDetail;