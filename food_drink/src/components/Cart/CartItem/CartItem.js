import React from "react";
import * as Messages from "../../../constants/Messages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CartItem extends React.Component {
  render() {
    let { item} = this.props;
    return (
      <>
        <ToastContainer />
        <div className="product_item">
          <img src={item.product.img} alt="product" />
          <div className="product_item-content">
            <h4>{item.product.name}</h4>
            <p>
              <span className="product_count">{item.quantity}</span> x{" "}
              <span className="product_pricre">{item.product.price}đ</span>
            </p>
          </div>
          <div className="product_item-remove">
            <i
              class="fas fa-times"
              onClick={() => this.onDelete(item.product.id)}
            ></i>
          </div>
        </div>
      </>
    );
  }

  onDelete = (id) => {
    if(window.confirm('Bạn muốn xóa sản phẩm này?')){
        this.props.onDeleteProductInCart(id);
        toast.error(Messages.MSG_DELETE_PRODUCT_IN_CART_SUCCESS);
      }
  };
}


export default CartItem;
