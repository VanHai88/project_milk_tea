import React from "react";
import "./ManagerProducts.css";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";
import { connect } from "react-redux";
import * as Actions from "../../../actions/index";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManagerProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      img: "/images/logo_vyvy.png",
      price: "",
      details: "",
      categoryId: 0,
    };
  }

  componentDidMount() {
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.remove("active");
    document.getElementsByClassName("users")[0].classList.remove("active");
    document.getElementsByClassName("products")[0].classList.add("active");

    this.props.fetchAllProducts();
    this.props.onFecthCategoriesRequest();
    this.props.onFetchProductsPageRequest(1, 10);
  }

  checkValidateForm(name, img, price, details, categoryId) {
    var validate = true;
    var input_productName = document.getElementById("input_productName");
    if (name === "" || name === null || name === undefined) {
      toast.error("Tên sản phẩm không được để trống!!");
      input_productName.focus();
      return false;
    }

    if (img === "/images/logo_vyvy.png") {
      toast.error("Vui lòng chọn ảnh sản phẩm!!");
      return false;
    }

    var input_price = document.getElementById("input_price");
    if (price === "" || price === null || price === undefined) {
      toast.error("Vui lòng nhập vào giá sản phẩm");
      input_price.focus();
      return false;
    }

    var detailsProduct = document.getElementById("details");
    if (details === "" || details === null || details === undefined) {
      toast.error("Mời bạn nhập vào mô tả sản phẩm!!");
      detailsProduct.focus();
      return false;
    }

    if (categoryId === 0) {
      toast.error("Mời bạn chọn thể loại!!");
      return false;
    }

    return validate;
  }

  imageHandler = (e) => {
    const reader = new FileReader();
    let srcImg = "/images/avatar/" + e.target.files[0].name;
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ img: srcImg });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleCreateProduct = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleCreateProdutSubmit = (e) => {
    e.preventDefault();
    let { id, name, img, price, details, categoryId } = this.state;
    let validate = this.checkValidateForm(
      name,
      img,
      price,
      details,
      categoryId
    );
    if (validate) {
      let product = {
        name,
        img,
        price,
        details,
        categoryId: parseInt(this.state.categoryId)
      };
      if (id === "") {
        this.props.onAddProductsRequest(product);
        toast.success("Tạo sản phẩm thành công!!");
      } else {
        product.id = id;
        this.props.onUpdateProductsRequest(product);
        toast.success("Sửa sản phẩm thành công!!");
      }
    }
  };

  onNextPage = (index) => {
    this.props.onFetchProductsPageRequest(index, 10);
  };

  onCreateProduct = () => {
    this.setState({
      id: "",
      name: "",
      img: "/images/logo_vyvy.png",
      price: "",
      details: "",
      categoryId: 0,
    });
  };

  onChangeProduct = (produst) => {
    this.setState({
      id: produst.id,
      name: produst.name,
      img: produst.img,
      price: produst.price,
      details: produst.details,
      categoryId: produst.categoryId,
    });
  };

  onDelete = (id) => {
    if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
      this.props.onDeleteProductsRequest(id);
      toast.success("Xóa sản phẩm thành công!!");
    }
  };

  render() {
    let { products, productsPage, categories } = this.props;
    let product = productsPage.map((item, index) => {
      let category = categories.find((value) => value.id === item.categoryId);
      return (
        <tr>
          <td>{item.id}</td>
          <td>
            <img src={item.img} alt="trasuacafe" />
          </td>
          <td>{item.name}</td>
          <td>{category.name}</td>
          <td>{item.price} vnd</td>
          <th>
            <div className="btn_action">
              <button
                type="button"
                class="btn btn-default btn_delete"
                onClick={() => this.onDelete(item.id)}
              >
                <i class="fas fa-trash-alt"></i>
              </button>
              <button
                type="button"
                class="btn btn-default btn_edit"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => this.onChangeProduct(item)}
              >
                <i class="fas fa-edit"></i>
              </button>
              <Link
                to={`/products/${item.id}/${item.name}`}
                type="button"
                class="btn btn-default btn_view"
              >
                <i class="fas fa-eye"></i>
              </Link>
            </div>
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
              <h2>Quản lý Sản phẩm</h2>
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
                  onClick={() => this.onCreateProduct()}
                >
                  Sản phẩm mới
                </button>
              </div>
              <table class="table table-hover products_table">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Thể loại</th>
                    <th scope="col">Đơn giá</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{product}</tbody>
              </table>
            </div>
            {this.onPagination(products)}
          </div>
        </div>

        <div
          className="modal fade create__products"
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
                  onSubmit={this.handleCreateProdutSubmit}
                  autocomplete="off"
                >
                  <div class="row">
                    <h2>Thêm sản phẩm mới</h2>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="input-group">
                        <label>Tên sản phẩm: </label>
                        <input
                          id="input_productName"
                          type="text"
                          className="input-field"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleCreateProduct}
                        />
                        <span className="span_err" id="err_userName"></span>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="input-group">
                        <label>Giá: </label>
                        <input
                          id="input_price"
                          type="number"
                          className="input-field"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleCreateProduct}
                        />
                        <span className="span_err" id="err_price"></span>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="product__img">
                        <div className="product-img">
                          <p className="topic_title">Tải ảnh sản phẩm:</p>
                          <img src={this.state.img} alt="avatar" />
                        </div>
                        <div className="form-group img__form">
                          <label>Chọn file ảnh của bạn</label>
                          <input
                            type="file"
                            className="form-control-file image-upload"
                            id="exampleFormControlFile1"
                            onChange={this.imageHandler}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="input-group">
                        <label>Thể loại: </label>
                        <select
                          className="form-control"
                          name="categoryId"
                          value={this.state.categoryId}
                          onChange={this.handleCreateProduct}
                        >
                          <option value={0}>Thể loại</option>
                          <option value={1}>Trà Sữa</option>
                          <option value={2}>cafe</option>
                          <option value={3}>Trà thanh nhiệt</option>
                          <option value={4}>Điểm Tâm</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Mô tả<span>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      id="details"
                      name="details"
                      value={this.state.details}
                      onChange={this.handleCreateProduct}
                    ></textarea>
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

  onPagination = (products) => {
    let page = [...Array(Math.ceil(products.length / 10))].map(
      (item, index) => {
        return (
          <li class="page-item">
            <a
              class="page-link"
              href
              onClick={() => this.onNextPage(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        );
      }
    );
    return (
      <nav aria-label="Page navigation example" className="nav-page">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          {page}
          <li class="page-item">
            <a class="page-link" href aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    productsPage: state.productsPage,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: () => {
      dispatch(Actions.actFetchProductsRequest());
    },
    onFetchProductsPageRequest: (page, limit) => {
      dispatch(Actions.actFetchProductsPageRequest(page, limit));
    },
    onAddProductsRequest: (product) => {
      dispatch(Actions.actAddProductsRequest(product));
    },
    onDeleteProductsRequest: (id) => {
      dispatch(Actions.actDeleteProductsRequest(id));
    },
    onFecthCategoriesRequest: () => {
      dispatch(Actions.actFecthCategoriesRequest());
    },
    onUpdateProductsRequest: (product) => {
      dispatch(Actions.actUpdateProductsRequest(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerProducts);
