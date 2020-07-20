import React from "react";
import "./CartPage.css";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Messages from "../../constants/Messages";

class CartPage extends React.Component {
  render() {
    let { carts } = this.props;
    var email = localStorage.getItem("email")
    let cart_item = carts.map((item, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>
            <img src={item.product.img} alt={item.product.name} />
          </td>
          <td>{item.product.price} đ</td>
          <td>
            <button
              type="button"
              class="btn btn-default"
              onClick={() =>
                this.onUpdateQuantity(item.product.id, parseInt(item.quantity) - 1)
              }
            >
              <i class="fas fa-minus"></i>
            </button>
            <span className="quantity_res">{item.quantity}</span>
            <button
              type="button"
              class="btn btn-default"
              onClick={() =>
                this.onUpdateQuantity(item.product.id, parseInt(item.quantity) + 1)
              }
            >
              <i class="fas fa-plus"></i>
            </button>
          </td>
          <td>{item.product.price * item.quantity}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => this.onDelete(item.product.id)}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="cart_page">
        <ToastContainer />
        <div class="container">
          <div class="row">
            <h3><span className="tile_active">SHOPPING CART</span> <i class="fas fa-chevron-right"></i>  CHECKOUT DETAILS  <i class="fas fa-chevron-right"></i> ORDER COMPLETE</h3>
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">SẢM PHẨM</th>
                    <th scope="col">GIÁ</th>
                    <th scope="col">SỐ LƯỢNG</th>
                    <th scope="col">TÔNG CỘNG</th>
                  </tr>
                </thead>
                <tbody>{cart_item}</tbody>
              </table>
              <Link to="/" className="btn_view_product"><i class="fas fa-arrow-left"></i> TIẾP TỤC XEM SẢN PHẨM</Link>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="total_payment">
                <h4>TỔNG SỐ LƯỢNG</h4>
                <p>
                  <span className="total_title">Tổng cộng: </span>
                  <span className="total_rs">{this.showTotalAmount(carts)}</span> đ
                </p>
                <Link to={email!==null?"/pay":"/login"} type="button" class="btn btn-warning">
                  THANH TOÁN
                </Link>
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

  onUpdateQuantity = (id, quantity) => {
    let { onUpdateProductInCart } = this.props;
    onUpdateProductInCart(id, quantity);
  };

  onDelete = (id) => {
    if(window.confirm('Bạn muốn xóa sản phẩm này?')){
      this.props.onDeleteProductInCart(id);
      toast.error(Messages.MSG_DELETE_PRODUCT_IN_CART_SUCCESS);
    }
  };
}

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProductInCart: (id) => {
      dispatch(Actions.actDeleteProductInCart(id));
    },
    onUpdateProductInCart: (id, quantity) => {
      console.log("id: ", id, " - quantity: ", quantity);
      dispatch(Actions.onUpdateProductInCart(id, quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
