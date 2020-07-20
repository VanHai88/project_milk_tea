import React from "react";
import "./UserDasboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";

class UserDasboard extends React.Component {
  onLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất?")) {
      let { history } = this.props;
      this.props.onDeleteStatusUser();
      localStorage.clear();
      this.props.onDeleteAllProductInCart();
      history.push({ pathname: "/" });
    }
  };

  render() {
    let {userName, profileImg} = this.props
    let user = JSON.parse(localStorage.getItem("userStatus"))
    return (
      <div className="user_dashboard">
        <div className="user_dashboard-infor">
          <img
            src={profileImg!==undefined?profileImg: user.profileImg}
            alt="avatar"
          />
          <p className="user_name">{userName!==undefined?userName: user.userName}</p>
        </div>
        <div className="user_manager">
          <Link to="/profile" className="user_manager-item profile active">
            <div className="row">
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
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
          <div className="item-navigation">
            <Link to="/order" className="user_manager-item order">
              <div className="row">
                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  Thông tin đơn hàng
                </div>
                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <i className="fas fa-chevron-right icon-choose"></i>
                </div>
              </div>
            </Link>
            <div className="sub-navigation">
              <Link to="/order" className="user_manager-item order">
                <div className="row">
                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    Thông tin đơn hàng
                  </div>
                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </Link>
              <Link to="/account/address" className="user_manager-item address">
                <div className="row">
                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    Cập nhật địa chỉ
                  </div>
                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="user_manager-item order" onClick={this.onLogout}>
            <div className="row">
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                Đăng xuất
              </div>
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
          {/* <Link
            to="/order"
            className="user_manager-item order"
          >
            <div>
            <i className="fa fa-notes-medical"></i>
              <span>Orders</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </Link>
          <Link
            to="/order"
            className="user_manager-item order"
          >
            <div>
              <i className="fas fa-shopping-cart"></i>
              <span>products</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </Link>
          <Link
            to="/order"
            className="user_manager-item order"
          >
            <div>
            <i className="fa fa-indent"></i>
              <span>Categories</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </Link>
          <Link
            to="/order"
            className="user_manager-item order active"
          >
            <div>
            <i className="fa fa-surprise"></i>
              <span>Suggests</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </Link>
          <div
            className="user_manager-item order"
            onClick={this.onLogout}
          >
            <div>
            <i className="fas fa-sign-out-alt"></i>
              <span>Đăng xuất</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div> */}
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
    onDeleteAllProductInCart: () => {
      dispatch(Actions.actDeleteAllProductInCart());
    }
  };
};

export default connect(null, mapDispatchToProps)(UserDasboard);
