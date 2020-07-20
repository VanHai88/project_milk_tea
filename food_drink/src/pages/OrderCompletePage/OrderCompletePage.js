import React from "react";
import "./OrderCompletePage.css";
import { Link } from "react-router-dom";

class OrderCompletePage extends React.Component {
  render() {
    let user = JSON.parse(localStorage.getItem("userStatus"))
    return (
      <div className="order_complete_page">
        <div class="container">
          <h3>
            SHOPPING CART <i class="fas fa-chevron-right"></i> CHECKOUT DETAILS{" "}
            <i class="fas fa-chevron-right"></i>{" "}
            <span className="tile_active">ORDER COMPLETE</span>
          </h3>
          <div className="order_complete_content">
            <h1>ĐẶT HÀNG THÀNH CÔNG</h1>
            <div className="complete_img">
              <img src="./images/error-404.jpg" alt="error" />
            </div>
            <p>Vui lòng chờ admin xét duyệt đơn hàng của bạn.</p>
            <Link to="/" className="btn_view_product">
              <i class="fas fa-arrow-left"></i> TIẾP TỤC MUA HÀNG
            </Link>
            <Link to={user.position === 1? "/admin/orders": "/order"}  className="btn_view_product btn_view_order">
              {" "}
              KIỂM TRA ĐƠN HÀNG <i class="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCompletePage;
