import React from "react";
import "./OrderPage.css";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import UserDasboard from "../../components/UserDasboard/UserDasboard";

class OrderPage extends React.Component {
  componentDidMount() {
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.add("active");
    document.getElementsByClassName("order")[1].classList.add("active");

    document.getElementsByClassName("icon-choose")[0].style.transform =
      "rotate(90deg)";
    document.getElementsByClassName("sub-navigation")[0].style.display =
      "block";
    this.props.onFetchOdersRequest();
    this.props.onFetchShipperAddressRequest();
    this.props.fetchAllProducts();
  }

  onView = (id) => {
    this.props.onFetchOrderDetailRequest(id);
  };

  onDelete = (id) => {
    if (window.confirm("Bạn muốn xóa hóa đơn này?")) {
      this.props.onDeleteOrderRequest(id);
    }
  };

  render() {
    let {
      history,
      orders,
      shipperAddress,
      orderDetails,
      products,
      user,
    } = this.props;
    let order;
    if (user !== null && user !== undefined) {
      order = orders.map((item, index) => {
        let userAddress = shipperAddress.find(
          (userAddress) => userAddress.id === item.shipperAddressId
        );
        if (user.id === item.userId) {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{userAddress !== undefined ? userAddress.userName : ""}</td>
              <td>{userAddress !== undefined ? userAddress.address : ""}</td>
              <td>{userAddress !== undefined ? userAddress.phone : ""}</td>
              <td>
                {item.status === 1 ? (
                  <span class="label label-danger">place</span>
                ) : (
                  ""
                )}
                {item.status === 2 ? (
                  <span class="label label-warning">transport</span>
                ) : (
                  ""
                )}
                {item.status === 3 ? (
                  <span class="label label-success">finsh</span>
                ) : (
                  ""
                )}
              </td>
              <td>
                <div className="btn_action">
                  {item.status === 1 ? (
                    <button
                      type="button"
                      className="btn btn-default btn_delete"
                      onClick={() =>
                        this.onDelete(userAddress !== undefined ? item.id : "")
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    type="button"
                    className="btn btn-default btn_view"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.onView(item.id)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          );
        } else {
          return "";
        }
      });
    }

    let product;
    if (orderDetails[0] !== undefined) {
      product = orderDetails[0].orderDEtails.map((item, index) => {
        let product = products.find((product) => product.id === item.productId);
        return (
          <tr key={index}>
            <td className="product_view_img">
              <img
                src={product !== undefined ? product.img : ""}
                alt={product !== undefined ? product.name : ""}
              />
            </td>
            <td>{product !== undefined ? product.price : ""}</td>
            <td>{product !== undefined ? item.quantity : ""}</td>
            <td>
              {product !== undefined ? product.price * item.quantity : ""}
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="profile_block">
        <div className="container profile_container">
          <UserDasboard history={history} />
          <div className="user_info">
            <div className="user_info-title">
              <h2>Thông tin Đơn hàng</h2>
            </div>
            <div className="user_info-body">
              <div className="user_info-avatar">
                <table className="table table-hover">
                  <thead>
                    <tr className="bg-warning">
                      <th scope="col">#</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>{order}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="title_order">
                <p>
                  Tổng cộng:{" "}
                  {orderDetails[0] !== undefined
                    ? orderDetails[0].totalPrice
                    : ""}
                </p>
              </div>
              <div className="modal-body">
                <table className="table table-hover">
                  <thead>
                    <tr className="tick_table">
                      <th scope="col">SẢM PHẨM</th>
                      <th scope="col">GIÁ</th>
                      <th scope="col">SỐ LƯỢNG</th>
                      <th scope="col">TÔNG CỘNG</th>
                    </tr>
                  </thead>
                  <tbody>{product}</tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
    orders: state.orders,
    shipperAddress: state.shipperAddress,
    orderDetails: state.orderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actFecthUser: (emai) => {
      dispatch(Actions.actFecthUserRequest(emai));
    },
    onFetchOdersRequest: () => {
      dispatch(Actions.actFetchOdersRequest());
    },
    onFetchShipperAddressRequest: () => {
      dispatch(Actions.actFetchShipperAddressRequest());
    },
    onDeleteOrderRequest: (id) => {
      dispatch(Actions.actDeleteOrderRequest(id));
    },
    onUpdateShipperAddressRequest: (shipperAddress) => {
      dispatch(Actions.actUpdateShipperAddressRequest(shipperAddress));
    },
    onFetchOrderDetailRequest: (id) => {
      dispatch(Actions.actFetchOrderDetailRequest(id));
    },
    fetchAllProducts: () => {
      dispatch(Actions.actFetchProductsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
