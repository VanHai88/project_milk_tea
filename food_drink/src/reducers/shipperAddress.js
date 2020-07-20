import * as Types from "../constants/ActionTypes";

var initialSate = [];

const shipperAddress = (state = initialSate, action) => {
  let { shipperAddress, id } = action;
  let index = -1;
  switch (action.type) {
    case Types.FETCH_ALL_SHIPPER_ADDRESS:
      state = shipperAddress;
      return [...state];
    case Types.ADD_SHIPPER_ADDRESS:
      state.push(shipperAddress);
      return [...state];
    case Types.UPDATE_SHIPPER_ADDRESS:
      index = state.findIndex(value => value.id === shipperAddress.id)
      if(index !== -1){
        state[index] = shipperAddress;
      }
      return [...state];
    case Types.DELETE_SHIPPER_ADDRESS:
      console.log(state)
        index = state.findIndex(value => value.id === id)
        state.splice(index,1)
        return [...state]
    default:
      return [...state];
  }
};

export default shipperAddress;
