import * as Types from "../constants/ActionTypes";

var initialSate = [];

const orderDetails = (state = initialSate, action) => {
  let { orderDEtail, id } = action;
  let index = -1;
  switch (action.type) {
    case Types.FETCH_ALL_ORDER_DETAIL:
      state = [orderDEtail]
      return [...state];
    case Types.ADD_ORDER_DETAIL:
      state.push(orderDEtail);
      return [...state];
    case Types.DELETE_SHIPPER_ADDRESS:
      index = state.findIndex((value) => value.id === id);
      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default orderDetails;
