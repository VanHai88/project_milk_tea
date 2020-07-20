import * as Types from "../constants/ActionTypes";

var initialSate = [];

const orders = (state = initialSate, action) => {
  let { orders, order, newOder, id } = action;
  let index = -1;
  switch (action.type) {
    case Types.FETCH_ORDERS:
      state = orders;
      return [...state];
    case Types.ADD_ORDER:
      state.push(newOder);
      return [...state];
    case Types.UPDATE_ORDER:
      index = state.findIndex((value) => value.id === order.id);
      state[index].status = order.status;
      return [...state];
    case Types.DELETE_ORDER:
      index = state.findIndex((value) => value.id === id);
      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default orders;
