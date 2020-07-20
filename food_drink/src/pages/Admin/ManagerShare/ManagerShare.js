import React from "react";
import "./ManagerShare.css";
import AddminDasboard from "../../../components/AddminDasboard/AddminDasboard";

class ManagerShare extends React.Component {

  componentDidMount(){
    document.getElementsByClassName("profile")[0].classList.remove("active");
    document.getElementsByClassName("order")[0].classList.remove("active");
    document.getElementsByClassName("users")[0].classList.remove("active");
    document.getElementsByClassName("products")[0].classList.remove("active");
    document.getElementsByClassName("categories")[0].classList.remove("active");
    document.getElementsByClassName("share")[0].classList.add("active");
  }

  render() {
    return (
      <div className="profile_block">
        <div className="container profile_container">
          <AddminDasboard />
          <div className="user_info manager_user">
            <div className="user_info-title">
              <h2>Quản lý bài viết</h2>
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
                  Sản phẩm mới
                </button>
              </div>
              <table class="table table-hover products_table">
                <thead>
                  <tr className="bg-warning">
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Ngày viết</th>
                    <th scope="col">Tác giả</th>
                    <th scope="col">Đã xem</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img
                        src="/images/trasuamatong.jpg"
                        alt="trasuacafe"
                      />
                    </td>
                    <td>Trà sữa mật ong</td>
                    <td>25/6/2020</td>
                    <td>Văn Hải</td>
                    <th>
                        <div className="a">
                          <button type="button" class="btn btn-warning">xem</button>
                        </div>
                    </th>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <img
                        src="/images/banhngot.jpg"
                        alt="trasuacafe"
                      />
                    </td>
                    <td>Bánh ngọt</td>
                    <td>25/6/2020</td>
                    <td>Minh Dương</td>
                    <th>
                      <div className="btn_action">
                      <div className="a">
                          <button type="button" class="btn btn-warning">xem</button>
                        </div>
                      </div>
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

export default ManagerShare;
