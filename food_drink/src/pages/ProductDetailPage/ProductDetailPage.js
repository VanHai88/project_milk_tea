import React from "react";
import "./ProductDetailPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      comment: "",
      rating: null,
      hover: null,
    };
  }

  componentDidMount() {
    let { match } = this.props;
    this.props.fetchAllProduct(match.params.id);
    this.props.fetchAllProductsCategories();
    this.props.onFetchCommentRequest();
    this.props.onFecthUsersRequest();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { product } = this.props;
    let { quantity } = this.state;
    this.props.onAddToCart(product, quantity);
    document.getElementById("cart_view").style.display = "block";
    setTimeout(function () {
      document.getElementById("cart_view").style.display = "none";
    }, 2000);
  };

  onComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  setRating = (ratingValue) => {
    this.setState({
      rating: ratingValue,
    });
  };

  setHover = (ratingValue) => {
    this.setState({
      hover: ratingValue,
    });
  };

  checkComment = (rating, comment)=>{
    let validate = true;
    if(rating===null){
      console.log(rating)
      toast.error("Mời bạn đánh giá sao!!")
      console.log("?")
      return false
    }

    var commentUer = document.getElementById("comment");
    if (comment === "" || comment === null || comment === undefined) {
      toast.error("Mời bạn nhập nội dung đánh giá!!");
      commentUer.focus();
      return false;
    }
    return validate;
  }

  onSubmitComment = (e, productId) => {
    e.preventDefault();
    let userId = parseInt(localStorage.getItem("id"));
    let { rating, comment } = this.state;
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let newComment = {
      userId,
      productId,
      comment,
      rating,
      date,
    };
    console.log(rating, comment)
    if(this.checkComment(rating, comment)){
      this.props.onAddCommentRequest(newComment);
      toast.success("Đánh giá thành công!!")
      this.setState({
        rating: null,
        comment:""
      })
    }
  };

  render() {
    let { product, productsCategories, comments, users } = this.props;
    let { rating, hover, comment } = this.state;
    let email = localStorage.getItem("email");
    let productsCategory = productsCategories.find(
      (productsCategory) => productsCategory.id === product.categoryId
    );
    let name = productsCategory !== undefined ? productsCategory.name : "";
    let products =
      productsCategory !== undefined ? productsCategory.products.reverse() : [];
    let id = productsCategory !== undefined ? productsCategory.id : "";
    let total_star = 0;
    let votes = 0;
    let commentUser = comments.map((item, index) => {
      let userComment = users.find((user) => user.id === item.userId);
      if (item.productId === product.id) {
        total_star += item.rating;
        votes++;
        return (
          <div className="evaluate_list-block">
            <h4>
              {product.name}{" "}
              {[...Array(5)].map((star, index) => {
                return (
                  <FaStar
                    className="star"
                    color={index < item.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                );
              })}
            </h4>
            <p>
              Nhận xét bởi{" "}
              <span>
                {userComment !== undefined ? userComment.userName : ""}
              </span>{" "}
              vào ngày {item.date}
            </p>
            <div className="evaluate-content">
              <img
                src={
                  userComment !== undefined ? `${userComment.profileImg}` : ""
                }
                alt={"avatar"}
              />
              <p>{item.comment}</p>
            </div>
          </div>
        );
      } else {
        return "";
      }
    });
    return (
      <div className="container">
        <ToastContainer/>
        <div className="productd_detail_page">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 products_page-category">
                <p>
                  <Link to={"/"}>Trang chủ</Link> /{" "}
                  <Link to={`/products/category/${id}/${name}`}>{name}</Link> /{" "}
                  {product.name}
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 products_page-product">
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 products_page-product-description">
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <img src={product.img} alt="Slide11" />
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 products_page-product-detail">
                    <h2>{product.name}</h2>
                    <span className="line"></span>
                    <div className="characteristic">
                      <h4>Đặc tính:</h4>
                      <p>{product.details}</p>
                    </div>
                    <form onSubmit={this.onSubmit}>
                      <input
                        type="number"
                        id="input"
                        className="form-control"
                        min={1}
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.onChange}
                        required="required"
                      />
                      <button type="submit" className="btn btn-warning">
                        Thêm giỏ hàng
                      </button>
                    </form>
                    <div className="vote_star">
                      {[...Array(5)].map((star, index) => {
                        return (
                          <FaStar
                            className="star"
                            color={index < total_star/votes ? "#ffc107" : "#e4e5e9"}
                            size={20}
                          />
                        );
                      })}
                      <p>{votes} lượt đánh gia</p>
                    </div>
                    <p className="product-category">
                      Danh mục: <span>Trà tửa</span>
                    </p>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="product-tabs">
                      <div className="group-tabs">
                        <ul className="nav nav-tabs" role="tablist">
                          <li role="presentation" className="active">
                            <a
                              href="#description"
                              aria-controls="description"
                              role="tab"
                              data-toggle="tab"
                            >
                              Mô tả
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              href="#evaluate"
                              aria-controls="evaluate"
                              role="tab"
                              data-toggle="tab"
                            >
                              Đánh giá
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="description"
                          >
                            <p>{product.details}</p>
                            <h4>Đặc tính:</h4>
                            <p>{product.details}</p>
                            <div className="tab-content-img">
                              <img src={product.img} alt="Slide11" />
                            </div>
                          </div>
                          <div
                            role="tabpanel"
                            className="tab-pane my-tab-pane"
                            id="evaluate"
                          >
                            {email !== null ? (
                              <div className="evaluate_form">
                                <h3>Hãy để lại nhận xét của bạn</h3>
                                <div className="star_rating">
                                  {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                      <label key={index}>
                                        <input
                                          type="radio"
                                          name="rating"
                                          onClick={() =>
                                            this.setRating(ratingValue)
                                          }
                                          value={ratingValue}
                                        />
                                        <FaStar
                                          className="star"
                                          color={
                                            ratingValue <= (hover || rating)
                                              ? "#ffc107"
                                              : "#e4e5e9"
                                          }
                                          size={30}
                                          onMouseEnter={() =>
                                            this.setHover(ratingValue)
                                          }
                                          onMouseLeave={() =>
                                            this.setHover(null)
                                          }
                                        />
                                      </label>
                                    );
                                  })}
                                </div>
                                <form
                                  onSubmit={(e) =>
                                    this.onSubmitComment(e, product.id)
                                  }
                                >
                                  <div className="form-group">
                                    <label>
                                      Nội dung<span>*</span>
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="5"
                                      id="comment"
                                      name={comment}
                                      value={comment}
                                      onChange={this.onComment}
                                    ></textarea>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-warning"
                                  >
                                    Nhận xét
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <div className="login_comment">
                                <span className="mr-10">
                                  Vui lòng đăng nhập để nhận xét
                                </span>
                                <Link
                                  to="/login"
                                  id="btn_login"
                                  class="btn btn-warning"
                                >
                                  Đăng Nhập
                                </Link>
                              </div>
                            )}
                            <div className="evaluate_list">
                              <h3>Nhận xét gần đây</h3>
                              {votes !== 0
                                ? commentUser
                                : `Hãy là người đầu tiên nhận xét “${product.name}” `}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="product_similar">
                      <h4>Sản phẩm tương tự</h4>
                      <ProductSlider products={products} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <Sidebar />
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
    product: state.product,
    productsCategories: state.productsCategories,
    comments: state.comments,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProduct: (id) => {
      dispatch(Actions.actFetchProductRequest(id));
    },
    fetchAllProductsCategories: () => {
      dispatch(Actions.actFetchProductsCategoriesRequest());
    },
    onAddToCart: (product, quantity) => {
      dispatch(Actions.actAddToCart(product, quantity));
    },
    onChangeMessage: (message) => {
      dispatch(Actions.actChangeMessage(message));
    },
    onAddCommentRequest: (newComment) => {
      dispatch(Actions.actAddCommentRequest(newComment));
    },
    onFetchCommentRequest: () => {
      dispatch(Actions.actFetchCommentRequest());
    },
    onFecthUsersRequest: () => {
      dispatch(Actions.actFecthUsersRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
