import React from 'react';
import "./Sidebar.css"
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import * as Actions from "../../actions/index"

class Sidebar extends React.Component {

    componentDidMount(){
        this.props.fetchAllCategories();
    }

    render() {
        let { categories } = this.props
        return (
            <div className="products_page-description">
                <div className="products_page-category-list">
                    <h4>DANH MỤC SẢN PHẨM</h4>
                    <div className="list-group">
                        {this.showCategory(categories)}
                    </div>
                </div>
                <div className="products_page-appreciate">
                    <h4>SẢN PHẨM ĐÁNH GIÁ CAO</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <img src="/images/products/milktea/trasuamatcha.png" alt="truasua" />
                            <div className="caption">
                                <p>Tra tua ngon VKL</p>
                                <p>15,000 đ</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <img src="/images/products/cafe/cafehoaanhdao.jpg" alt="truasua" />
                            <div className="caption">
                                <p>Tra tua ngon VKL</p>
                                <p>15,000 đ</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <img src="/images/products/diemtam/banhgau.jpg" alt="truasua" />
                            <div className="caption">
                                <p>Tra tua ngon VKL</p>
                                <p>15,000 đ</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <img src="/images//products/diemtam/banhgau.jpg" alt="truasua" />
                            <div className="caption">
                                <p>Tra tua ngon VKL</p>
                                <p>15,000 đ</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    showCategory = (categories) => {
        let result = null;
        if (categories.length > 0) {
            result = categories.map((category, index) => {
                return <Link key={index} to={`/products/category/${category.id}/${category.name}`} className="list-group-item list-group-item-action">
                    {category.name}
                </Link>
            })
        }
        return result
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategories: () =>{
            dispatch(Actions.actFecthCategoriesRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
