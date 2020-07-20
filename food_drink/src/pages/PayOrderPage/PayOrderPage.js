import React from "react";
import "./PayOrderPage.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PayOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      email: "",
      userName: "",
      address: "",
      phone: "",
      chooseAddress: false
    };
  }

  componentDidMount() {
    this.props.actFetchShipperAddressRequest();
    let { user } = this.props;
    if (user !== null) {
      localStorage.setItem("id", user.id);
      this.setState({ userId: parseInt(user.id) });
    } else {
      let id = localStorage.getItem("id");
      this.setState({ userId: parseInt(id) });
    }
  }

  checkValidateForm(email, userName, address, phone) {
    var validate = true;
    var input_email = document.getElementById("input_email");
    if (email === "" || email === null || email === undefined) {
      toast.error("Email bạn không hợp lệ");
      input_email.focus();
      return false;
    }

    var input_userName = document.getElementById("input_userName");
    if (userName === "" || userName === null || userName === undefined) {
      toast.error("Vui long nhap đây đủ tên của bạn");
      input_userName.focus();
      return false;
    } else if (userName.length <= 8) {
      toast.error("Tên của bạn phải tren 8 ký tự");
      input_userName.focus();
      return false;
    }

    var input_address = document.getElementById("input_address");
    if (address === "" || address === null || address === undefined) {
      toast.error("Vui lòng nhập vào địa chỉ của bạn");
      input_address.focus();
      return false;
    } else if (address.length <= 8) {
      toast.error("Địa chỉ của bạn phải trên 8 ký tự");
      input_address.focus();
      return false;
    }

    var input_phone = document.getElementById("input_phone");
    if (phone === "" || phone === null || phone === undefined) {
      toast.error("Vui long nhap số điện thoại của bạn");
      input_phone.focus();
      return false;
    }

    return validate;
  }

  handleUserAddress = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUserAddressSubmit = (e) => {
    e.preventDefault();

    let { userId, email, userName, phone, address } = this.state;
    let validate = this.checkValidateForm(email, userName, address, phone);

    if (validate) {
      let user = {
        userId,
        email,
        userName,
        address,
        phone,
      };
      this.props.actAddShipperAddress(user);
      toast.success("Tạo địa chỉ mới thành công");
    }
  };

  handlePayOrderSubmit = (address) => {
    let { carts } = this.props;
    let { userId } = this.state;
    if (address !== undefined) {
      var totalPrice = parseInt(
        document.getElementById("subTotal").textContent
      );
      let newOder = {
        userId,
        shipperAddressId: address.id,
        totalPrice,
        status: 1,
      };
      this.props.onUserOrder(newOder, carts);
      localStorage.removeItem("CART");
      this.props.onDeleteAllProductInCart();
      this.props.history.push({ pathname: "/ordercomplete" });
    } else {
      toast.error("Mời bạn nhập vào địa chỉ nhận hàng");
    }
  };

  checkedAddress = (e)=>{
    console.log(e.target)
  }

  onChoose = (id) => {
    let { shipperAddress } = this.props;
    let address = shipperAddress.find((item) => item.id === id);

    this.setState({
      id,
      userName: address.userName,
      address: address.address,
      phone: address.phone,
      email: address.email,
      chooseAddress: true,
    });

    let col_addRess = document.getElementsByClassName("col__address");
    console.log(col_addRess)
    for(let i = 0; i< col_addRess.length; i++){
      col_addRess[i].classList.remove("active_addRess")
    }
    let col__address_id = document.getElementById(`col__address_${id}`);
    col__address_id.classList.add("active_addRess")
  };

  render() {
    let { carts, shipperAddress, user } = this.props;
    let { id, userName, address, phone, email, chooseAddress } = this.state;
    let defaultAddress;

    let order;
    if (user !== null && user !== undefined) {
      if (chooseAddress) {
        defaultAddress = { id, userName, address, phone, email };
      } else {
        defaultAddress = shipperAddress.find((item) => item.userId === user.id);
      }
      order = shipperAddress.map((item, index) => {
        if (item.userId === user.id) {
          return (
            <tr className="col__address" id={`col__address_${item.id}`} onClick={() => this.onChoose(item.id)}>
              <td>{item.userName}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
            </tr>
          );
        } else {
          return "";
        }
      });
    }

    let cart_item = carts.map((item, index) => {
      return (
        <tr>
          <td>
            {item.product.name} × {item.quantity}
          </td>
          <td>
            <span>{this.showSubTotal(item.product.price, item.quantity)}</span>₫
          </td>
        </tr>
      );
    });
    return (
      <div className="pay_order">
        <ToastContainer />
        <div class="container">
          <div class="row">
            <h3>
              <Link to="/cart">SHOPPING CART</Link>{" "}
              <i class="fas fa-chevron-right"></i>{" "}
              <span className="tile_active">CHECKOUT DETAILS</span>{" "}
              <i class="fas fa-chevron-right"></i> ORDER COMPLETE
            </h3>
            <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
              <div className="pay_order_info">
                <p className="topic_title">THÔNG TIN THANH TOÁN</p>

                <div className="btn_address_pay">
                  <a
                    className="btn_view_product"
                    href
                    data-toggle="modal"
                    data-target="#changeAddress"
                  >
                    <i class="fas fa-map-marker-alt"></i> SỬ DỤNG ĐỊA CHỈ KHÁC
                  </a>
                  <a
                    className="btn_view_product"
                    href
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="fas fa-map-marker-alt"></i> THÊM ĐỊA CHỈ MỚI
                  </a>
                </div>
                <div className="show_address">
                  <h2>Địa chỉ giao hàng</h2>
                  <p>
                    Họ tên:{" "}
                    <span>
                      {defaultAddress !== undefined
                        ? defaultAddress.userName
                        : ""}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <span>
                      {defaultAddress !== undefined ? defaultAddress.email : ""}
                    </span>
                  </p>
                  <p>
                    Số điện thoại:{" "}
                    <span>
                      {defaultAddress !== undefined ? defaultAddress.phone : ""}
                    </span>
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    <span>
                      {defaultAddress !== undefined
                        ? defaultAddress.address
                        : ""}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="btn btn-war btn__payOrder"
                    onClick={() => this.handlePayOrderSubmit(defaultAddress)}
                  >
                    ĐẶT HÀNG
                  </button>
                </div>

                {/* Change Address */}
                <div
                  class="modal fade"
                  id="changeAddress"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div class="modal-body">
                        <div className="user_info-body">
                          <div className="user_info-avatar">
                            <table class="table table-hover">
                              <thead>
                                <tr className="bg-warning">
                                  <th scope="col">HọTên</th>
                                  <th scope="col">Địa chỉ</th>
                                  <th scope="col">Số điện thoại</th>
                                </tr>
                              </thead>
                              <tbody>{order}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-warning">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div class="modal-body">
                        <form
                          className="input-group"
                          onSubmit={this.handleUserAddressSubmit}
                          autoComplete="off"
                        >
                          <div className="input-group">
                            <label>Tên đầy đủ *</label>
                            <input
                              id="input_userName"
                              type="text"
                              className="input-field"
                              name="userName"
                              value={this.state.userName}
                              onChange={this.handleUserAddress}
                            />
                            <span className="span_err" id="err_userName"></span>
                          </div>

                          <div className="input-group">
                            <label>Địa chỉ *</label>
                            <input
                              id="input_address"
                              type="text"
                              className="input-field"
                              name="address"
                              value={this.state.address}
                              onChange={this.handleUserAddress}
                              placeholder="Số nhà và tên đường"
                            />
                            <span className="span_err" id="err_address"></span>
                          </div>

                          <div className="input-group">
                            <label>Số điện thoại</label>
                            <input
                              id="input_phone"
                              type="number"
                              className="input-field"
                              name="phone"
                              value={this.state.phone}
                              onChange={this.handleUserAddress}
                            />
                            <span className="span_err" id="err_phone"></span>
                          </div>

                          <div class="input-group">
                            <label>Email</label>
                            <input
                              id="input_email"
                              type="email"
                              className="input-field"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleUserAddress}
                            />
                            <span className="span_err" id="err_email"></span>
                          </div>
                          <div className="btn_block">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="submit" class="btn btn-war">
                              Lưu
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div className="order_infor">
                <p className="topic_title">ĐƠN HÀNG CỦA BẠN</p>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">SẢN PHẨM</th>
                      <th scope="col">TỔNG CỘNG</th>
                    </tr>
                  </thead>
                  <tbody>{cart_item}</tbody>
                  <tfoot>
                    <tr>
                      <th>Tổng cộng</th>
                      <td id="subTotal">{this.showTotalAmount(carts)}₫</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  showTotalAmount(carts) {
    var total = 0;
    if (carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        total += carts[i].product.price * carts[i].quantity;
      }
    }
    return total;
  }

  showSubTotal = (price, quantity) => {
    return price * quantity;
  };
}

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
    user: state.user,
    shipperAddress: state.shipperAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserOrder: (shipperAddress, totalPrice, carts) => {
      dispatch(Actions.onUserOrder(shipperAddress, totalPrice, carts));
    },
    onDeleteAllProductInCart: () => {
      dispatch(Actions.actDeleteAllProductInCart());
    },
    actFetchShipperAddressRequest: () => {
      dispatch(Actions.actFetchShipperAddressRequest());
    },
    actAddShipperAddress: (shipperAddress) => {
      dispatch(Actions.actAddShipperAddressRequest(shipperAddress));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayOrderPage);
