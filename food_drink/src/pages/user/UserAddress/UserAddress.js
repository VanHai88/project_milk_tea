import React from "react";
import "./UserAddress.css";
import { connect } from "react-redux";
import * as Actions from "../../../actions/index";
import UserDasboard from "../../../components/UserDasboard/UserDasboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UserAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId:"",
      email: "",
      userName: "",
      address: "",
      phone: "",
    };
  }

  componentDidMount() {
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.add("active");
    document.getElementsByClassName("order")[1].classList.remove("active");
    document.getElementsByClassName("address")[0].classList.add("active");

    document.getElementsByClassName("icon-choose")[0].style.transform =
      "rotate(90deg)";
    document.getElementsByClassName("sub-navigation")[0].style.display =
      "block";
    this.props.onFetchShipperAddressRequest();

    let { user } = this.props;
    if (user !== null) {
      localStorage.setItem("id", user.id);
      this.setState({userId:  parseInt(user.id)})
    } else {
      let id = localStorage.getItem("id");
      this.setState({userId: parseInt(id)})
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
    let { id, userId, email, userName, phone, address } = this.state;
    let validate = this.checkValidateForm(email, userName, address, phone);

    if (validate) {
      if (id === "") {
        let user = {
          userId,
          email,
          userName,
          address,
          phone,
        };
        this.props.actAddShipperAddress(user);
        toast.success("Tạo địa chỉ mới thành công");
      } else {
        let user = {
          id,
          userId,
          email,
          userName,
          address,
          phone,
        };
        this.props.onUpdateShipperAddressRequest(user);
        toast.success("Cập nhật địa chỉ thành công");
      }
    }

    let { history } = this.props;

    history.push("/account/address");
  };

  onView = (id) => {
    this.props.onFetchOrderDetailRequest(id);
  };

  createAddress = () => {
    this.setState({
      id: "",
      email: "",
      userName: "",
      address: "",
      phone: "",
    });
  };

  onEdit = (user) => {
    this.setState({
      id: user.id,
      email: user.email,
      userName: user.userName,
      address: user.address,
      phone: user.phone,
    });
  };

  onDelete = (id) => {
    if (window.confirm("Bạn muốn xóa địa chỉ này?")) {
      this.props.onDeleteShipperAddressRequest(id);
    }
  };

  render() {
    let { history, shipperAddress, user } = this.props;
    let order;
    if (user !== null && user !== undefined) {
      order = shipperAddress.map((item, index) => {
        if(item.userId === user.id){
          return (
            <tr key={index}>
              <td>{item.userName}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>
                <div className="btn_action">
                  <button
                    type="button"
                    className="btn btn-default btn_delete"
                    onClick={() => this.onDelete(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-default btn_edit"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.onEdit(item)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </td>
            </tr>
          );
        }else{
          return ""
        }
      });
    }

    return (
      <div className="profile_block userAddress_block">
        <ToastContainer />
        <div className="container profile_container">
          <UserDasboard history={history} />
          <div className="user_info">
            <div className="user_info-title">
              <h2>Địa chỉ giao hàng</h2>
            </div>
            <div className="btn_create">
              <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.createAddress}
              >
                Thêm địa chỉ mới
              </button>
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
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="modal-body">
                    <form
                      id="register"
                      className="input-group"
                      onSubmit={this.handleUserAddressSubmit}
                    >
                      <div className="input-group">
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

                      <div className="input-group">
                        <label>Tên đầy đủ</label>
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
                      <div className="btn_block">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-warning">
                          Đăng Ký
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="user_info-body">
              <div className="user_info-avatar">
                <table className="table table-hover">
                  <thead>
                    <tr className="bg-warning">
                      <th scope="col">HọTên</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order}
                  </tbody>
                </table>
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
    shipperAddress: state.shipperAddress,
    user: state.user,
    shipperAddressUser: state.shipperAddressUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchShipperAddressRequest: () => {
      dispatch(Actions.actFetchShipperAddressRequest());
    },
    onUpdateShipperAddressRequest: (shipperAddress) => {
      dispatch(Actions.actUpdateShipperAddressRequest(shipperAddress));
    },
    actAddShipperAddress: (user) => {
      dispatch(Actions.actAddShipperAddressRequest(user));
    },
    onDeleteShipperAddressRequest: (id) => {
      dispatch(Actions.actDeleteShipperAddressRequest(id));
    },
    onFetchUserShipperAddressRequest: (id) => {
      dispatch(Actions.actFetchUserShipperAddressRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);
