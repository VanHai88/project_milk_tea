import React from "react";
import { Route, Link } from "react-router-dom";
import "./Menu.css";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import CartResult from "../Cart/CartResult/CartResult";
import CartItem from "../Cart/CartItem/CartItem";
import * as Messages from "../../constants/Messages";

const menus = [
  {
    name: "Trang chủ",
    to: "/",
    exact: true,
  },
  {
    name: "Sản phẩm",
    to: "/products",
    exact: false,
  },
  {
    name: "Bài viết",
    to: "/share",
    exact: false,
  },
  {
    name: "Giới thiệu",
    to: "/about",
    exact: false,
  },
];

const MenuLink = ({ lable, to }) => {
  return (
    <Route
      path={to}
      exact
      children={({ match }) => {
        var active = match ? "active" : "";
        return (
          <li className={`my-li ${active}`}>
            <Link to={to} className="my-link">
              {lable}
            </Link>
          </li>
        );
      }}
    />
  );
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  componentDidMount() {
    this.props.onFecthUsersRequest();
    this.props.onFetchProductsRequest();
    let email = localStorage.getItem("email");
    this.props.actFecthUser(email);
  }

  onSearch = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value.toLowerCase();
    this.setState({
      [name]: value,
    });
  };

  render() {
    let { carts, products, users, user } = this.props;
    let email = localStorage.getItem("email");
    if (email !== null) {
      let checkUser = users.find((item) => item.email === email);
      if (checkUser !== undefined) {
        user = checkUser;
      }
    }
    let { keyword } = this.state;
    let product;
    if (keyword) {
      products = products.filter((product) => {
        return product.name.toLowerCase().indexOf(keyword) !== -1;
      });
      console.log(products)
      product = products.map((item, index) => {
        return (
          <div key={index} className="search_result_item">
            <Link to={`/products/${item.id}/${item.name}`}>
              <img src={item.img} alt="Slide11" />
              <span className="product_name">{item.name}</span>
              <span className="product_price">{item.price}đ</span>
            </Link>
          </div>
        );
      });
    }
    return (
      <div id="menu">
        <div className="container">
          <div className="menu_block">
            <div className="menu-logo">
              <img src="/images/logo_vyvy.png" alt="logo" />
            </div>
            <div className="menu-nav">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target="#myNavbar"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                      {this.showMenu(menus)}
                      <li className="menu_search">
                        <a href>
                          <i className="fas fa-search" id="icon_search"></i>
                          <div className="search_view" id="search_view">
                            <div className="triangle"></div>
                            <div className="search_block">
                              <div className="search_form">
                                <form className="form-inline active-cyan-4" autoComplete="off">
                                  <div className="row">
                                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                      <input
                                        className="form-control form-control-sm mr-3 w-75"
                                        type="text"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="keyword"
                                        value={this.state.keyword}
                                        onChange={this.onSearch}
                                      />
                                    </div>
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                      <i
                                        className="fas fa-search"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div
                                className="search_result"
                                style={
                                  product !== undefined && product.length !== 0
                                    ? { height: "516px" }
                                    : { height: "0" }
                                }
                              >
                                {product}
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      {this.showLogin(user)}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="menu-cart">
              <i className="fas fa-shopping-cart icon_cart" id="icon_cart">
                <span id="icon_cart_span">{this.showQuantity(carts)}</span>
              </i>
              <div className="cart_view" id="cart_view">
                <div className="triangle"></div>
                <div className="cart_list">{this.showCartItem(carts)}</div>
                {this.showTotalAmount(carts)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  showCartItem = (carts) => {
    var { deleteProductInCart, onChangeMessage } = this.props;
    var result = Messages.MSG_CART_EMPTY;
    if (carts.length > 0) {
      result = carts.map((item, index) => {
        return (
          <CartItem
            key={index}
            item={item}
            onDeleteProductInCart={deleteProductInCart}
            onChangeMessage={onChangeMessage}
          />
        );
      });
    }
    return result;
  };

  showQuantity = (carts) => {
    var total = 0;
    if (carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        total += parseInt(carts[i].quantity);
      }
    }
    return total;
  };

  showTotalAmount = (carts) => {
    var result = null;
    if (carts.length > 0) {
      result = <CartResult carts={carts} />;
    }
    return result;
  };

  showMenu = (menus) => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        if (menu.name !== "Sản phẩm") {
          return (
            <MenuLink
              key={index}
              lable={menu.name}
              to={menu.to}
              activeOnlyWhenExact={menu.activeOnlyWhenExact}
            />
          );
        } else {
          return (
            <li key={index} className="my-li ">
              <a href="true" data-toggle="dropdown">
                {menu.name}
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <div className="triangle"></div>
                <li>
                  <Link to={`/products/category/${1}/${"Trà Sữa"}`}>
                    Trà Sữa
                  </Link>
                </li>
                <li>
                  <Link to={`/products/category/${2}/${"cafe"}`}>cafe</Link>
                </li>
                <li>
                  <Link to={`/products/category/${3}/${"Trà thanh nhiệt"}`}>
                    Trà thanh nhiệt
                  </Link>
                </li>
                <li>
                  <Link to={`/products/category/${4}/${"Điểm Tâm"}`}>
                    Điểm Tâm
                  </Link>
                </li>
              </ul>
            </li>
          );
        }
      });
    }
    return result;
  };

  showLogin = (user) => {
    return (
      <Route
        path="/login"
        exact
        children={({ match }) => {
          var active = match ? "active" : "";
          return (
            <li className={`${active}`}>
              {user !== null &&
              user !== undefined &&
              user.userName !== undefined ? (
                <Link to={user.position===1?"/admin/profile":"/profile"} className="my-link profile__user">
                  <span className="profile__user-email">{user.userName}</span>
                  <img
                    className="profile__user-avatar"
                    src={user.profileImg}
                    alt="avatar"
                  />
                </Link>
              ) : (
                <Link to="/login" className="my-link">
                  <span className="glyphicon glyphicon-user"></span> Đăng nhập
                </Link>
              )}
            </li>
          );
        }}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    carts: state.carts,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProductInCart: (id) => {
      dispatch(Actions.actDeleteProductInCart(id));
    },
    onChangeMessage: (message) => {
      dispatch(Actions.actChangeMessage(message));
    },
    onFetchProductsRequest: () => {
      dispatch(Actions.actFetchProductsRequest());
    },
    onFecthUsersRequest: () => {
      dispatch(Actions.actFecthUsersRequest());
    },
    actFecthUser: (emai) => {
      dispatch(Actions.actFecthUserRequest(emai));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
