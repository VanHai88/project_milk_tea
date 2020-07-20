import * as Types from "../constants/ActionTypes";

var initialSate = [];

const productsPage = (state = initialSate, action) => {
  let { products, product, id } = action;
  let index = -1;
  switch (action.type) {
    case Types.FETCH_PRODUCT_PAGE:
      state = products;
      return [...state];
    case Types.UPDATE_PRODUCT:
      index = state.findIndex((item) => item.id === product.id);
      state[index] = product;
      return [...state];
    case Types.DELETE_PRODUCT:
      index = state.findIndex((item) => item.id === id);
      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default productsPage;
