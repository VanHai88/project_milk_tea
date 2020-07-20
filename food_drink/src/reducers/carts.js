import * as Types from "../constants/ActionTypes";

var data = JSON.parse(localStorage.getItem("CART"));
var initialSate = data ? data : [];

const carts = (state = initialSate, action) => {
  let { product, quantity, id } = action;
  let index = -1;
  switch (action.type) {
    case Types.ADD_TO_CART:
      index = state.findIndex((value) => value.product.id === product.id);
      if (index !== -1) {
        let p_quantity = state[index].quantity;
        state[index].quantity = parseInt(p_quantity) + parseInt(quantity);
      } else {
        state.push({
          product,
          quantity,
        });
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case Types.DELETE_PRODUCT_IN_CART:
      index = state.findIndex((value) => value.product.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case Types.UPDATE_PRODUCT_IN_CART:
      index = state.findIndex((value) => value.product.id === id);
      if (id !== -1 && quantity) {
        state[index].quantity = parseInt(quantity);
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case Types.DELETE_ALL_PRODUCT_IN_CART:
      return [];
    default:
      return [...state];
  }
};

export default carts;
