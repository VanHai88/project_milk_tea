import React from "react";
import "./AddminDasboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";

class AddminDasboard extends React.Component {
  onLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất?")) {
      localStorage.clear();
      let { history } = this.props;
      this.props.onDeleteStatusUser();
      history.push({ pathname: "/" });
    }
  };

  render() {
    let {userName, profileImg} =this.props
    let user = JSON.parse(localStorage.getItem("userStatus"))
    return (
      <div className="user_dashboard admin_dashboard">
        <div className="user_dashboard-infor">
          <img
            src={profileImg!==undefined?profileImg: user.profileImg}
            alt="avatar"
          />
          <p className="user_name">{userName!==undefined?userName: user.userName}</p>
        </div>
        <div className="user_manager">
          <Link to="/admin/profile" className="user_manager-item profile active">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-user"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Cập nhật tài khoản
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <Link to="/admin/orders" className="user_manager-item order">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i class="fa fa-notes-medical"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Quản lý hóa đơn
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <Link to="/admin/products" className="user_manager-item products">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i class="fas fa-coffee"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Quản lý sản phẩm
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <Link to="/admin/users" className="user_manager-item users">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i class="fas fa-users"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Quản lý người dùng
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <Link to="/admin/categories" className="user_manager-item categories">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <i class="fa fa-indent"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Quản lý danh mục
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <Link to="/admin/share" className="user_manager-item share">
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <i class="fa fa-surprise"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Quản lý bà viết
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Link>
          <div className="user_manager-item" onClick={this.onLogout}>
            <div className="row">
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i class="fas fa-sign-out-alt"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <span>Đăng xuất</span>
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteStatusUser: () => {
      dispatch(Actions.actDeleteStatusUser());
    },

  };
};

export default connect(null, mapDispatchToProps)(AddminDasboard);
