import React from "react";
import "./Login.css";
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
      password: "",
    };
  }

  componentDidMount(){
    this.props.onFecthUsersRequest()
  }

  handleLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    let { users ,history } = this.props;  
    if (this.checkValidateForm(email, password)) {
      let user = users.find(item => item.email === email && item.password === password)
      if(user !== undefined){
        history.push("/")
        localStorage.setItem("email",user.email)
      }else{
        toast.error("email hoặc mật khẩu không đúng");
      }
    }
  };

  checkValidateForm(email, password) {
    let validate = true;
    var input_email = document.getElementById("input_email");
    if (email === "" || email === null || email === undefined) {
      toast.error("Email bạn không hợp lệ");
      input_email.focus();
      return false;
    }

    var input_password = document.getElementById("input_password");
    if (password === "" || password === null || password === undefined) {
      toast.error("Vui long nhap vào mật khẩu của bạn");
      input_password.focus();
      return false;
    }

    return validate;
  }

  render() {
    return (
      <div className="form_user">
        <ToastContainer />
        <div className="container">
          <h2>Đăng Nhập</h2>
          <div className="block_form_user">
            <form
              id="login"
              onSubmit={this.loginSubmit}
              className="input-group"
            >
              <div className="input-group">
                <label id="lb_email">Email đăng nhập</label>
                <input
                  id="input_email"
                  onChange={this.handleLogin}
                  value={this.state.email}
                  name="email"
                  type="text"
                  className="input-field"
                />
                <span className="span_err" id="err_email"></span>
              </div>
              <div className="input-group">
                <label id="lb_password">Mật khẩu</label>
                <input
                  id="input_password"
                  onChange={this.handleLogin}
                  value={this.state.password}
                  name="password"
                  type="password"
                  className="input-field"
                />
                <span className="span_err" id="err_password"></span>
              </div>
              <button type="submit" className="btn btn-warning">
                Đăng Nhập
              </button>
            </form>
            <p>
              Chưa có tài khoản?{" "}
              <Link to="/register">
                <span>Đăng ký ngay</span>
              </Link>
            </p>
            <div className="login_quick">
              <p>Hoặc đăng nhập qua</p>
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
  message: state.message,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  onFecthUsersRequest: () => {
    dispatch(Actions.actFecthUsersRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
