import React from "react";
import "./ProfileAdmin.css";
import { connect } from "react-redux";
import * as Actions from "../../../actions/index";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      email: undefined,
      profileImg: undefined,
      userName: undefined,
      address: undefined,
      phone: undefined,
      password: undefined,
      retypePassword: undefined,
    };
  }

  componentDidMount(){
    let {history} = this.props
    let userStatus = JSON.parse(localStorage.getItem("userStatus"))
    if(userStatus!==null&&userStatus.position===1){
      this.setState({
        id: userStatus.id,
        email: userStatus.email,
        profileImg: userStatus.profileImg,
        userName: userStatus.userName,
        address: userStatus.address,
        phone: userStatus.phone,
        password: userStatus.password,
      })
    }else {
      history.push("/login");
    }
  }

  checkValidateForm() {
    var validate = true;
    var input_userName = document.getElementById("input_userName");
    if (input_userName.value === "" || input_userName.value === null || input_userName.value === undefined) {
      toast.error("Vui long nhap đây đủ tên của bạn");
      input_userName.focus();
      return false;
    } else if (input_userName.value.length <= 8) {
      toast.error("Tên của bạn phải tren 8 ký tự");
      input_userName.focus();
      return false;
    }
    var input_address = document.getElementById("input_address");
    if (input_address.value === "" || input_address.value === null || input_address.value === undefined) {
      toast.error("Vui lòng nhập vào địa chỉ của bạn");
      input_address.focus();
      return false;
    } else if (input_address.value.length <= 8) {
      toast.error("Địa chỉ của bạn phải trên 8 ký tự");
      input_address.focus();
      return false;
    }

    var input_phone = document.getElementById("input_phone");
    if (input_phone.value === "" || input_phone.value === null || input_phone.value === undefined) {
      toast.error("Vui long nhap số điện thoại của bạn");
      input_phone.focus();
      return false;
    }else if (input_phone.value.length < 9) {
      toast.error("số điện thoại của bạn phải trên 10 số");
      input_address.focus();
      return false;
    }

    var show_off_pass = document.getElementById("show_off_pass");
    if(show_off_pass.style.display === "block"){
        var input_password = document.getElementById("input_password");
      if (input_password.value === "" || input_password.value === null || input_password.value === undefined) {
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
    }
    return validate;
  }

  handleUserChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onShowPass = () => {
    let ques_pass = document.getElementById("show_off_ques_pass");
    let bock_pass = document.getElementById("show_off_pass");
    ques_pass.style.display = "none";
    bock_pass.style.display = "block";
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    let srcImg = "/images/avatar/"+e.target.files[0].name;
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: srcImg });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleUserSubmit = (e) =>{
    e.preventDefault();
    let {email,profileImg,userName,address,phone,password} = this.state
    let {user,history} = this.props;
    let position = JSON.parse(localStorage.getItem("userStatus")).position
    let profileUser = {}
    profileUser.id = user.id
    profileUser.email = email===undefined?user.email: email
    profileUser.profileImg = profileImg===undefined?user.profileImg: profileImg
    profileUser.userName = userName===undefined?user.userName: userName
    profileUser.address = address===undefined?user.address: address
    profileUser.phone = phone===undefined?user.phone: phone
    profileUser.password = password===undefined?user.password: password
    profileUser.position = position
    if(this.checkValidateForm()){
      this.props.onUpdateUserRequest(profileUser)
      localStorage.setItem("userStatus",JSON.stringify(profileUser))
      history.push("/admin/profile")
      toast.success("Thay đổi thông tin thành công!!")
    }
  }

  render() {
    let { history, user } = this.props;
    let { profileImg, userName, email, address, phone } = this.state;
    return (
      <div className="profile_block">
        <ToastContainer />
        <div className="container profile_container">
          <AddminDasboard history={history} userName={userName} profileImg={profileImg}/>
          <div className="user_info">
            <div className="user_info-title">
              <h2>Thông tin người dùng</h2>
            </div>
            <div className="user_info-body">
              <div className="user_info-avatar">
                <div className="user_infor-img">
                  <p className="topic_title">Tải ảnh đại diện</p>
                  <img src={profileImg === undefined && user !== null ? user.profileImg : profileImg} alt="avatar" />
                </div>
                <form>
                  <div className="form-group">
                    <label>Chọn file ảnh của bạn</label>
                    <input
                      type="file"
                      className="form-control-file image-upload"
                      id="exampleFormControlFile1"
                      onChange={this.imageHandler}
                      accept="image/*"
                    />
                  </div>
                </form>
              </div>
              <div className="user_info-change">
                <p className="topic_title">Thay đổi thông tin</p>
                <div className="block_form_user">
                  <form
                    className="input-group"
                    onSubmit={this.handleUserSubmit}
                  >
                    <div className="input-group">
                      <label>Tên đầy đủ</label>
                      <input
                        id="input_userName"
                        type="text"
                        className="input-field"
                        name="userName"
                        value={userName === undefined && user !== null ? user.userName : userName}
                        onChange={this.handleUserChange}
                      />
                      <span className="span_err" id="err_userName"></span>
                    </div>

                    <div className="input-group">
                      <label>Email</label>
                      <label id="id_email">{email === undefined && user !== null ? user.email : email}</label>
                    </div>

                    <div className="input-group">
                      <label>Địa chỉ *</label>
                      <input
                        id="input_address"
                        type="text"
                        className="input-field"
                        name="address"
                        value={address === undefined && user !== null ? user.address : address}
                        onChange={this.handleUserChange}
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
                        value={phone === undefined && user !== null ? user.phone : phone}
                        onChange={this.handleUserChange}
                      />
                      <span className="span_err" id="err_phone"></span>
                    </div>

                    <div className="input-group group_pass">
                      <div id="show_off_ques_pass">
                        <label>Mật khẩu</label>
                        <label>**********</label>
                        <button type="button" onClick={this.onShowPass}>
                          Đổi mật khẩu
                        </button>
                      </div>
                      <div id="show_off_pass" style={{display: "none"}}>
                        <div className="input-group">
                          <label>Mật khẩu</label>
                          <input
                            id="input_password"
                            type="password"
                            className="input-field"
                            placeholder="************"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleUserChange}
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
                            onChange={this.handleUserChange}
                          />
                          <span
                            className="span_err"
                            id="err_retypePassword"
                          ></span>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-info">
                      Lưu thay đổi
                    </button>
                  </form>
                </div>
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
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actFecthUser: (emai) => {
      dispatch(Actions.actFecthUserRequest(emai));
    },
    onUpdateUserRequest: (user)=>{
      dispatch(Actions.actUpdateUserRequest(user))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
