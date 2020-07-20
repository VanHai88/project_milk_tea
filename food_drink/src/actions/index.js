import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const actFetchProductsRequest = () => {
  return (dispatch) => {
    return callApi(`products?_sort=id&_order=asc`, "GET", null)
      .then((res) => {
        dispatch(actFecthProducts(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFecthProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products,
  };
};

export const actAddProductsRequest = (product) => {
  return (dispatch) => {
    return callApi(`products`, "POST", product)
      .then((res) => {
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actUpdateProductsRequest = (product) => {
  return (dispatch) => {
    return callApi(`products/${product.id}`, "PUT", product)
      .then((res) => {
        dispatch(actUpdateProducts(res.data))
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actUpdateProducts = (product) => {
  return {
    type: Types.UPDATE_PRODUCT,
    product,
  };
};

export const actDeleteProductsRequest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "DELETE", id)
      .then((res) => {
        dispatch(actDeleteProducts(id))
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actDeleteProducts = (id) => {
  return {
    type: Types.DELETE_PRODUCT,
    id,
  };
};

export const actFetchProductsPageRequest = (page, limit) => {
  return (dispatch) => {
    return callApi(`products?_page=${page}&_limit=${limit}`, "GET", null)
      .then((res) => {
        dispatch(actFetchProductsPage(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFetchProductsPage = (products) => {
  return {
    type: Types.FETCH_PRODUCT_PAGE,
    products,
  };
};

export const actFetchProductRequest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "GET", null)
      .then((res) => {
        dispatch(actFecthProdut(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFecthProdut = (product) => {
  return {
    type: Types.FETCH_PRODUCT,
    product,
  };
};

export const actFetchProductsCategoriesRequest = (id) => {
  return (dispatch) => {
    return callApi(`categories?_embed=products`, "GET", null)
      .then((res) => {
        dispatch(actFecthProductsCategories(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFecthProductsCategories = (categories) => {
  return {
    type: Types.FETCH_PRODUCTS_CATEGORIES,
    categories,
  };
};

export const actFecthCategoryDetailRequest = (id) => {
  return (dispatch) => {
    return callApi(`categories/${id}?_embed=products`, "GET", null)
      .then((res) => {
        dispatch(actFecthCategoryDetail(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFecthCategoryDetail = (categoryDetail) => {
  return {
    type: Types.FETCH_CATEGORY_DETAIL,
    categoryDetail,
  };
};

export const actFecthCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("categories", "GET", null)
      .then((res) => {
        dispatch(actFecthCategorys(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actFecthCategorys = (categories) => {
  return {
    type: Types.FETCH_CATEGORIES,
    categories,
  };
};

export const actFecthUsersRequest = () => {
  return (dispatch) => {
    return callApi("users?_sort=id&_order=desc", "GET", null)
      .then((res) => {
        dispatch(actFecthUsers(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actFecthUsers = (users) => {
  return {
    type: Types.FETCH_USERS,
    users,
  };
};

// export const userPostRegisterFecth = (user, history) => {
//   return (dispatch) => {
//     return axios({
//       method: "POST",
//       url: "http://localhost:3000/register",
//       data: user,
//     })
//       .then((res) => {
//         console.log(res.data);
//         localStorage.setItem("accessToken", res.data.accessToken);
//         localStorage.setItem("email", user.email);
//         history.push({ pathname: "/" });
//       })
//       .catch((err) => {
//         console.log(err.request.response);
//         dispatch(actChangeMessage(err.request.response));
//       });
//   };
// };

// export const userPostLoginFecth = (user, history) => {
//   return (dispatch) => {
//     return axios({
//       method: "POST",
//       url: "http://localhost:3000/login",
//       data: {email: user.email, password: user.password},
//     })
//       .then((res) => {
//         localStorage.setItem("accessToken", res.data.accessToken);
//         localStorage.setItem("email", user.email);
//         history.push({ pathname: "/" });
//       })
//       .catch((err) => {
//         dispatch(actChangeMessage(err.request.response));
//       });
//   };
// };

export const userPostRegisterFecth = (user, history) => {
  return (dispatch) => {
    return callApi(`users`, "POST", user)
      .then((res) => {
        localStorage.setItem("email", user.email);
        history.push({ pathname: "/" });
      })
      .catch((err) => {
        //console.log(err.request.response);
        console.log(err);
        dispatch(actChangeMessage(err));
      });
  };
};

// export const userPostLoginFecth = (user, history) => {
//   return (dispatch) => {
//     return axios({
//       method: "POST",
//       url: "http://localhost:3000/login",
//       data: {email: user.email, password: user.password},
//     })
//       .then((res) => {
//         localStorage.setItem("accessToken", res.data.accessToken);
//         localStorage.setItem("email", user.email);
//         history.push({ pathname: "/" });
//       })
//       .catch((err) => {
//         dispatch(actChangeMessage(err.request.response));
//       });
//   };
// };

export const actFecthUserRequest = (email) => {
  return (dispatch) => {
    return callApi(`users?email=${email}`, "GET", null)
      .then((res) => {
        dispatch(saveUser(res.data[0]));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

const saveUser = (user) => ({
  type: "SAVE_USER",
  user,
});

export const actAddUserRequest = (user) => {
  return (dispatch) => {
    return callApi(`users`, "POST", user)
      .then((res) => {
        dispatch(actAddUser(user))
      })
      .catch((err) => {
        console.log(err);
        dispatch(actChangeMessage(err));
      });
  };
};

const actAddUser = (user) => ({
  type: Types.ADD_USERS,
  user,
});

export const actDeleteUserRequest = (id) => {
  return (dispatch) => {
    return callApi(`users/${id}`, "DELETE", null)
      .then((res) => {
        dispatch(actDeleteUser(id))
      })
      .catch((err) => {
        console.log(err);
        dispatch(actChangeMessage(err));
      });
  };
};

const actDeleteUser = (id) => ({
  type: Types.DELETE_USER,
  id,
});

export const actUpdateUserRequest = (user) => {
  return (dispatch) => {
    return callApi(`users/${user.id}`, "PUT", user)
      .then((res) => {
        dispatch(actUpdateUser(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

const actUpdateUser = (user) => ({
  type: Types.UPDATE_USER,
  user,
});

export const actChangeMessage = (message) => {
  return {
    type: Types.CHANGE_MESSAGE,
    message,
  };
};

export const actAddToCart = (product, quantity) => {
  return {
    type: Types.ADD_TO_CART,
    product,
    quantity,
  };
};

export const actDeleteProductInCart = (id) => {
  return {
    type: Types.DELETE_PRODUCT_IN_CART,
    id,
  };
};

export const actDeleteAllProductInCart = () => {
  return {
    type: Types.DELETE_ALL_PRODUCT_IN_CART,
  };
};

export const actDeleteStatusUser = () => {
  return {
    type: Types.DELETE_STATUS_USER,
  };
};

export const onUpdateProductInCart = (id, quantity) => {
  return {
    type: Types.UPDATE_PRODUCT_IN_CART,
    id,
    quantity,
  };
};

export const onUserOrder = (newOder , carts) => {
  return (dispatch) => {
    dispatch(actAddordersRequest(newOder, carts));
  };
};

export const actAddShipperAddressRequest = (shipperAddress) => {
  return (dispatch) => {
    return callApi("shipperAddress", "POST", shipperAddress)
      .then((res) => {
        dispatch(actAddShipperAddress(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actAddShipperAddress = (shipperAddress) => {
  console.log("dsad: ", shipperAddress);
  return {
    type: Types.ADD_SHIPPER_ADDRESS,
    shipperAddress,
  };
};

export const actAddordersRequest = (newOder, carts) => {
  return (dispatch) => {
    return callApi("orders", "POST", newOder)
      .then((res) => {
        dispatch(actAddorders(res.data));
        for (let i = 0; i < carts.length; i++) {
          let orderDEtail = {
            userId: newOder.userId,
            productId: carts[i].product.id,
            orderId: res.data.id,
            quantity: carts[i].quantity,
          };
          dispatch(actorderDEtailsRequest(orderDEtail));
        }
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actAddorders = (newOder) => {
  return {
    type: Types.ADD_ORDER,
    newOder,
  };
};

export const actUpdateOrdersRequest = (order) => {
  return (dispatch) => {
    return callApi(`orders/${order.id}`, "PUT", order)
      .then((res) => {
        dispatch(actUpdateOrders(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actUpdateOrders = (order) => {
  return {
    type: Types.UPDATE_ORDER,
    order,
  };
};

export const actorderDEtailsRequest = (orderDEtail) => {
  return (dispatch) => {
    return callApi("orderDEtails", "POST", orderDEtail)
      .then((res) => {
        dispatch(actAddorders(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actorderDEtails = (orderDEtail) => {
  return {
    type: Types.ADD_ORDER_DETAIL,
    orderDEtail,
  };
};

export const actFetchOdersRequest = () => {
  return (dispatch) => {
    return callApi(`orders?_sort=id&_order=desc`, "GET", null)
      .then((res) => {
        dispatch(actFetchOders(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFetchOders = (orders) => {
  return {
    type: Types.FETCH_ORDERS,
    orders,
  };
};

export const actDeleteOrderRequest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}`, "DELETE", null)
      .then((res) => {
        dispatch(actDeleteOrder(id));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actDeleteOrder = (id) => {
  return {
    type: Types.DELETE_ORDER,
    id,
  };
};

export const actDeleteShipperAddressRequest = (id) => {
  return (dispatch) => {
    return callApi(`shipperAddress/${id}`, "DELETE", null)
      .then((res) => {
        dispatch(actDeleteShipperAddress(id));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actDeleteShipperAddress = (id) => {
  return {
    type: Types.DELETE_SHIPPER_ADDRESS,
    id,
  };
};

export const actDeleteOrderDEtailRequest = (id) => {
  console.log("222222");
  return (dispatch) => {
    return callApi(`orderDEtails?orderId=${id}`, "DELETE", null)
      .then((res) => {
        dispatch(actDeleteOrderDEtail(id));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actDeleteOrderDEtail = (id) => {
  return {
    type: Types.DELETE_ORDER_DETAIL,
    id,
  };
};

export const actUpdateShipperAddressRequest = (shiperAddress) => {
  return (dispatch) => {
    return callApi(`shipperAddress/${shiperAddress.id}`, "PUT", shiperAddress)
      .then((res) => {
        console.log(res.data);
        dispatch(actUpdateShipperAddress(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actUpdateShipperAddress = (shipperAddress) => {
  console.log("vao: ", shipperAddress);
  return {
    type: Types.UPDATE_SHIPPER_ADDRESS,
    shipperAddress,
  };
};

export const actFetchShipperAddressRequest = () => {
  return (dispatch) => {
    return callApi(`shipperAddress`, "GET", null)
      .then((res) => {
        dispatch(actFetchShipperAddress(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFetchShipperAddress = (shipperAddress) => {
  return {
    type: Types.FETCH_ALL_SHIPPER_ADDRESS,
    shipperAddress,
  };
};

export const actFetchUserShipperAddressRequest = (id) => {
  return (dispatch) => {
    return callApi(`users/${id}?_embed=shipperAddress`, "GET", null)
      .then((res) => {
       dispatch(actFetchUserShipperAddress(res.data));
      })
      .catch((err) => {
        console.log("Loi");
      });
  };
};

export const actFetchUserShipperAddress = (shipperAddress) => {
  return {
    type: Types.FETCH_USER_SHIPPER_ADDRESS,
    shipperAddress,
  };
};

export const actFetchOrderDetailRequest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}?_embed=orderDEtails`, "GET", null)
      .then((res) => {
        dispatch(actFetchOrderDetail(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actFetchOrderDetail = (orderDEtail) => {
  return {
    type: Types.FETCH_ALL_ORDER_DETAIL,
    orderDEtail,
  };
};

export const actAddCommentRequest = (comment) => {
  return (dispatch) => {
    return callApi(`comments`, "POST", comment)
      .then((res) => {
        dispatch(actAddComment(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actAddComment = (comment) => {
  return {
    type: Types.ADD_COMMENT,
    comment,
  };
};

export const actFetchCommentRequest = () => {
  return (dispatch) => {
    return callApi(`comments?_sort=id&_order=desc`, "GET", null)
      .then((res) => {
        dispatch(actFetchComment(res.data));
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };
};

export const actFetchComment = (comments) => {
  return {
    type: Types.FETCH_COMMENT,
    comments,
  };
};
