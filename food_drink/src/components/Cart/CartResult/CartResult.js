import React from "react";
import { Link } from "react-router-dom";
import "./CartResult.css"

class CartResult extends React.Component {

  render() {
    var { carts } = this.props;
    var email = localStorage.getItem("email")
    return (
      <div className="cart_action">
        <div className="product_total">
          <p>
            Tổng cộng: <span>{this.showTotalAmount(carts)}</span>
          </p>
        </div>
        <div className="bt_action">
          <Link to={"/cart"} class="btn btn-warning">
            XEM GIỎ HÀNG
          </Link>
          <Link to={email!==null?"/pay":"/login"} type="button" class="btn btn-success">
            THANH TOÁN
          </Link>
        </div>
      </div>
    );
  }
  showTotalAmount(carts) {
    var total = 0;
    if (carts!==undefined && carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        total += carts[i].product.price * carts[i].quantity;
      }
    }
    return total;
  }
}
export default CartResult;
