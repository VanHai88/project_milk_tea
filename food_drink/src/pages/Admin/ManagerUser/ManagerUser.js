import React from "react";
import "./ManagerUser.css";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";
import { connect } from "react-redux";
import * as Actions from "../../../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManagerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      profileImg: "/images/avatar/avatar.jpg",
      userName: "",
      address: "",
      phone: "",
      password: "",
      retypePassword: "",
      position: 2,
    };
  }

  componentDidMount() {
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.remove("active");
    document.getElementsByClassName("users")[0].classList.add("active");

    this.props.onFecthUsersRequest();
  }

  checkValidateForm() {
    var validate = true;

    var input_email = document.getElementById("input_email");
    if (input_email.value === "" || input_email.value === null || input_email.value === undefined) {
      toast.error("Email bạn không hợp lệ");
      input_email.focus();
      return false;
    }

    let user = this.props.users.find(item => item.email === input_email.value)
    if(user!==undefined){
      toast.error("Email đã tồn tại");
      input_email.focus();
      return false;
    }

    var input_userName = document.getElementById("input_userName");
    if (
      input_userName.value === "" ||
      input_userName.value === null ||
      input_userName.value === undefined
    ) {
      toast.error("Vui long nhap đây đủ tên của bạn");
      input_userName.focus();
      return false;
    } else if (input_userName.value.length <= 8) {
      toast.error("Tên của bạn phải tren 8 ký tự");
      input_userName.focus();
      return false;
    }
    var input_address = document.getElementById("input_address");
    if (
      input_address.value === "" ||
      input_address.value === null ||
      input_address.value === undefined
    ) {
      toast.error("Vui lòng nhập vào địa chỉ của bạn");
      input_address.focus();
      return false;
    } else if (input_address.value.length <= 8) {
      toast.error("Địa chỉ của bạn phải trên 8 ký tự");
      input_address.focus();
      return false;
    }

    var input_phone = document.getElementById("input_phone");
    if (
      input_phone.value === "" ||
      input_phone.value === null ||
      input_phone.value === undefined
    ) {
      toast.error("Vui long nhap số điện thoại của bạn");
      input_phone.focus();
      return false;
    } else if (input_phone.value.length < 9) {
      toast.error("số điện thoại của bạn phải trên 10 số");
      input_address.focus();
      return false;
    }

    var input_password = document.getElementById("input_password");
    if (
      input_password.value === "" ||
      input_password.value === null ||
      input_password.value === undefined
    ) {
      toast.error("Vui long nhap vào mật khẩu của bạn");
      input_password.focus();
      return false;
    } else if (input_password.value.length <= 8) {
      toast.error("mật khẩu của bạn phải trên 8 ký tự");
      input_password.focus();
      return false;
    }

    var input_retypePassword = document.getElementById("input_retypePassword");
    if (
      input_retypePassword.value === "" ||
      input_retypePassword.value === null ||
      input_retypePassword.value === undefined
    ) {
      toast.error("Vui long nhap lại mật khẩu của bạn");
      input_retypePassword.focus();
      validate = false;
    } else if (input_retypePassword.value !== input_password.value) {
      toast.error("Mật khẩu của bạn không trùng khớp");
      input_retypePassword.focus();
      return false;
    }
    return validate;
  }

  handleCreateUser = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleCreateUserSubmit = (e) => {
    e.preventDefault();
    if(this.checkValidateForm()){
      let user = this.state
      user.position = parseInt(this.state.position)
      this.props.onAddUserRequest(user)
      toast.success("Tạo người dùng thành công!!")
    }
  };

  onDeleteUser = (id) =>{
    if (window.confirm("Bạn chắc chắm muốn xóa khách hàng này!!")) {
      this.props.onDeleteUserRequest(id)
      this.props.history.push("/admin/users")
      toast.error("Xóa người dùng thành công!!")
    }
  }

  render() {
    let { users } = this.props;
    let user = users.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.userName !== undefined? item.userName: ""}</td>
          <td>{item.email !== undefined ? item.email:""}</td>
          <td>{item.phone !== undefined ? item.phone:""}</td>
          <th>
            {item.position === 1 ? (
              ""
            ) : (
              <button type="button" class="btn btn-danger" onClick={()=>this.onDeleteUser(item !== undefined?item.id:"")}>
                Xóa
              </button>
            )}
          </th>
        </tr>
      );
    });

    return (
      <div className="profile_block">
        <ToastContainer />
        <div className="container profile_container">
          <AddminDasboard />
          <div className="user_info manager_user">
            <div className="user_info-title">
              <h2>Quản lý người dùng</h2>
            </div>
            <div className="list_users">
              <div className="crate_and_search">
                <div className="block_search">
                  <input
                    type="text"
                    name=""
                    id="input"
                    class="form-control"
                    value=""
                    required="required"
                    pattern=""
                    title=""
                  />
                  <button type="button" class="btn btn-warning">
                    <i class="fas fa-search"></i>
                  </button>
                </div>

                <button
                  type="button"
                  class="btn btn-warning btn_create_user"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Tạo người dùng mới
                </button>
              </div>
              <table class="table table-hover">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">#</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>{user}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="modal fade create__user"
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
                  onSubmit={this.handleCreateUserSubmit}
                  autocomplete="off"
                >
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      id="input_email"
                      type="email"
                      className="input-field"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleCreateUser}
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
                      onChange={this.handleCreateUser}
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
                      onChange={this.handleCreateUser}
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
                      onChange={this.handleCreateUser}
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
                      onChange={this.handleCreateUser}
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
                      onChange={this.handleCreateUser}
                    />

                    <div className="input-group">
                      <label>Chức vụ: </label>
                      <select
                        className="form-control"
                        name="position"
                        value={this.state.position}
                        onChange={this.handleCreateUser}
                      >
                        <option value={2}>Khách hàng</option>
                        <option value={1}>Quản lý</option>
                      </select>
                    </div>

                    <span className="span_err" id="err_retypePassword"></span>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFecthUsersRequest: () => {
      dispatch(Actions.actFecthUsersRequest());
    },
    onAddUserRequest: (user) => {
      dispatch(Actions.actAddUserRequest(user));
    },
    onDeleteUserRequest: (id)=>{
      dispatch(Actions.actDeleteUserRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerUser);
