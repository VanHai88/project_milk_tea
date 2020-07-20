import React from "react";
import "./Register.css";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      address: "",
      phone: "",
      password: "",
      retypePassword: "",
      msg: "",
    };
  }

  componentDidMount(){
    this.props.onFecthUsersRequest()
  }

  checkValidateForm(email, userName, address, phone, password, retypePassword) {
    var validate = true;
    var input_email = document.getElementById("input_email");
    if (email === "" || email === null || email === undefined) {
      toast.error("Email bạn không hợp lệ");
      input_email.focus();
      return false;
    }

    let user = this.props.users.find(item => item.email === email)
    if(user!==undefined){
      toast.error("Email đã tồn tại");
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

    var input_password = document.getElementById("input_password");
    if (password === "" || password === null || password === undefined) {
      toast.error("Vui long nhap vào mật khẩu của bạn");
      input_password.focus();
      return false;
    }else if (password.length <= 8) {
        toast.error("mật khẩu của bạn phải trên 8 ký tự");
        input_password.focus();
        return false;
      }

    var input_retypePassword = document.getElementById("input_retypePassword");
    if (
      retypePassword === "" ||
      retypePassword === null ||
      retypePassword === undefined
    ) {
      toast.error("Vui long nhap lại mật khẩu của bạn");
      input_retypePassword.focus()
      validate = false;
    } else if (retypePassword !== password) {
      toast.error("Mật khẩu của bạn không trùng khớp");
      input_retypePassword.focus()
      return false;
    }
    return validate;
  }

  handleRegisterChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    let {
      email,
      userName,
      phone,
      address,
      password,
      retypePassword,
    } = this.state;
    let validate = this.checkValidateForm(
      email,
      userName,
      address,
      phone,
      password,
      retypePassword
    );

    if (validate) {
      let user = {
        email,
        profileImg: "/images/avatar/avatar.jpg",
        userName,
        address,
        phone,
        password,
        position: 2
      };
      let { history } = this.props;
      this.props.userPostRegisterFecth(user, history);
    }
  };

  render() {
    return (
      <div className="form_user">
        <ToastContainer />
        <div className="container">
          <h2>Đăng ký tài khoản</h2>
          <div className="block_form_user">
            <form
              id="register"
              className="input-group"
              autocomplete="off"
              onSubmit={this.handleRegisterSubmit}
            >
              <div className="input-group">
                <label>Email</label>
                <input
                  id="input_email"
                  type="email"
                  className="input-field"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleRegisterChange}
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
                  onChange={this.handleRegisterChange}
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
                  onChange={this.handleRegisterChange}
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
                  onChange={this.handleRegisterChange}
                />
                <span className="span_err" id="err_phone"></span>
              </div>

              <div className="input-group">
                <label>Mật khẩu</label>
                <input
                  id="input_password"
                  type="password"
                  className="input-field"
                  placeholder="************"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleRegisterChange}
                />
                <span className="span_err" id="err_password"></span>
              </div>
              <div className="input-group">
                <label>Nhập lại mật khẩu</label>
                <input
                  id="input_retypePassword"
                  type="password"
                  className="input-field"
                  placeholder="************"
                  name="retypePassword"
                  value={this.state.retypePassword}
                  onChange={this.handleRegisterChange}
                />
                <span className="span_err" id="err_retypePassword"></span>
              </div>
              <div className="input-group">
                <input type="checkbox" className="check-box" />
                <span>I agree to the terms & conditions</span>
              </div>
              <button type="submit" className="btn btn-warning">
                Đăng Ký
              </button>
            </form>
            <p>
              Chưa có tài khoản? <Link to="/login">Đăng Nhập</Link>
            </p>
            <div className="login_quick">
              <p>Hoặc</p>
              <button type="button" className="btn btn-default login_g">
                <i className="fab fa-google-plus-g"></i> GOODLE
              </button>
              <button type="button" className="btn btn-default login_fb">
                <i className="fab fa-facebook-square"></i> FACEBOOK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.message,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  userPostRegisterFecth: (userInfo, history) =>
    dispatch(Actions.userPostRegisterFecth(userInfo, history)),

  onFecthUsersRequest: () => {
      dispatch(Actions.actFecthUsersRequest());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
