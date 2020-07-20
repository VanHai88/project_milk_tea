import React from "react";
import "./ManagerCategories.css";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";

class ManagerCategories extends React.Component {

  componentDidMount(){
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.remove("active");
    document.getElementsByClassName("users")[0].classList.remove("active");
    document.getElementsByClassName("products")[0].classList.remove("active");
    document.getElementsByClassName("categories")[0].classList.add("active");
  }

  render() {
    return (
      <div className="profile_block">
        <div className="container profile_container">
          <AddminDasboard />
          <div className="user_info manager_user">
            <div className="user_info-title">
              <h2>Quản lý thể loại</h2>
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

                <button type="button" class="btn btn-warning btn_create_user">
                  Thể loại mới
                </button>
              </div>
              <table class="table table-hover">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">#</th>
                    <th scope="col">Thể loại</th>
                    <th scope="col">Thông tin</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Trà sữa</td>
                    <td>8 sản phẩm đang sử dụng</td>
                    <th>
                      <button type="button" class="btn btn-warning mr-10">Sửa</button>
                      <button type="button" class="btn btn-danger">Xóa</button>
                    </th>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Cafe</td>
                    <td>7 sản phẩm đang sử dụng</td>
                    <th>
                      <button type="button" class="btn btn-warning mr-10">Sửa</button>
                      <button type="button" class="btn btn-danger">Xóa</button>
                    </th>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Trà chanh</td>
                    <td>8 sản phẩm đang sử dụng</td>
                    <th>
                      <button type="button" class="btn btn-warning mr-10">Sửa</button>
                      <button type="button" class="btn btn-danger">Xóa</button>
                    </th>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Điểm tâm</td>
                    <td>6 sản phẩm đang sử dụng</td>
                    <th>
                      <button type="button" class="btn btn-warning mr-10">Sửa</button>
                      <button type="button" class="btn btn-danger">Xóa</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerCategories;
