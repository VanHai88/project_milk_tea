import React from "react";
import "./ManagerOrder.css";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";
import * as Actions from "../../../actions/index";
import { connect } from "react-redux";

class ManagerOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtername: "",
      filterStatus: 0, // All: -1, active: 1, deactive: 0
    };
  }

  componentDidMount() {
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.add("active");

    this.props.onFetchOdersRequest();
    this.props.onFetchShipperAddressRequest();
    this.props.fetchAllProducts();
  }

  onPlace = (order) => {
    if (window.confirm("Bạn chấp nhận đơn này?")) {
      order.status = 2;
      this.props.onUpdateOrdersRequest(order);
    }
  };

  onTransport = (order) => {
    if (window.confirm("Bạn xác nhận đơn này đã giao thành công?")) {
      order.status = 3;
      this.props.onUpdateOrdersRequest(order);
    }
  };

  onView = (id) => {
    this.props.onFetchOrderDetailRequest(id);
  };

  onClick = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    let {
      orders,
      shipperAddress,
      orderDetails,
      products,
      history,
    } = this.props;
    var {filterStatus } = this.state;

    orders = orders.filter(order => {
      let filter = parseInt(filterStatus);
      if ( filter === 0) {
        return true;
      } else {
        return order.status === filter
      }
    });

    let order = orders.map((item, index) => {
      let userOrder = shipperAddress.find(
        (shipperAddress) => shipperAddress.id === item.shipperAddressId
      );
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{userOrder !== undefined ? userOrder.userName : ""}</td>
          <td>{userOrder !== undefined ? userOrder.email : ""}</td>
          <td>{userOrder !== undefined ? userOrder.address : ""}</td>
          <td>{userOrder !== undefined ? userOrder.phone : ""}</td>

          <th>
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
          </th>
          <th>
            <div className="block_btn_manager_order">
              {item.status === 1 ? (
                <button
                  type="button"
                  class="btn btn-info"
                  onClick={() => this.onPlace(item)}
                >
                  <i class="fas fa-truck-moving"></i>
                </button>
              ) : (
                ""
              )}
              {item.status === 2 ? (
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => this.onTransport(item)}
                >
                  <i class="fas fa-check"></i>
                </button>
              ) : (
                ""
              )}
              {item.status === 3 ? "" : ""}
              <button
                type="button"
                className="btn btn-warning btn_view"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => this.onView(item.id)}
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </th>
        </tr>
      );
    });

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
          <AddminDasboard history={history} />
          <div className="user_info manager_user">
            <div className="user_info-title">
              <h2>Quản lý đơn đặt hàng</h2>
            </div>
            <div className="list_order">
              <div className="sort_order">
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={0}>Tất cả đơn hàng</option>
                  <option value={1}>Đã đặt hàng</option>
                  <option value={2}>Đang vận chuyển</option>
                  <option value={3}>Đã hoàn thành</option>
                </select>
              </div>
              <table class="table table-hover">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">#</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>{order}</tbody>
              </table>
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
    orders: state.orders,
    shipperAddress: state.shipperAddress,
    orderDetails: state.orderDetails,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOdersRequest: () => {
      dispatch(Actions.actFetchOdersRequest());
    },
    onFetchShipperAddressRequest: () => {
      dispatch(Actions.actFetchShipperAddressRequest());
    },
    onUpdateOrdersRequest: (order) => {
      dispatch(Actions.actUpdateOrdersRequest(order));
    },
    onFetchOrderDetailRequest: (id) => {
      dispatch(Actions.actFetchOrderDetailRequest(id));
    },
    fetchAllProducts: () => {
      dispatch(Actions.actFetchProductsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrder);
