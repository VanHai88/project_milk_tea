import React from 'react';
import "./ProductsPage.css"
import { connect } from "react-redux"
import * as Actions from "../../actions/index"
import Sidebar from "../../components/Sidebar/Sidebar"
import { Link } from 'react-router-dom';
import ProductItem from "../../components/ProductItem/ProductItem"

class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idCategory: 0,
            sort: {
                by: 'id',
                value: 1
            }
        }
    }

    componentDidMount() {
        this.props.fetchAllProductsCategories();
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.match.params.id!==prevState.idCategory){
          return { idCategory: parseInt(nextProps.match.params.id)};
       }
        return null;
      }

    render() {
        let { productsCategories } = this.props
        let { sort, idCategory } = this.state
        let productsCategory = productsCategories.find(productsCategory => productsCategory.id === idCategory)
        let name = productsCategory !== undefined ? productsCategory.name : ""
        let products = productsCategory !== undefined ? productsCategory.products.reverse() : []

        products = this.sortPriceProducts(products, sort)
        return (
            <div className="container">
                <div className="products_page">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 products_page-category">
                                <p><Link to={"/"}>Trang chủ</Link> / {name}</p>
                            </div>

                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <p>Xem tất cả {products.length} kết quả</p>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><span>Sắp Xếp</span><i className="far fa-caret-square-down ml-5"></i></button>
                                    <ul className="dropdown-menu">
                                        <li onClick={() => this.onClick('id', 1)}>
                                            <span role="button"
                                                className={(sort.by === "id" && sort.value === 1) ? "sort_selected" : ""}
                                            >Thứ tự theo sản phẩm mới <i className="fal fa-sort-alpha-up-alt"></i></span>
                                        </li>
                                        <li role="separator" className="divider"></li>
                                        <li onClick={() => this.onClick('price', 1)}>
                                            <span
                                                role="button"
                                                className={(sort.by === "price" && sort.value === 1) ? "sort_selected" : ""}
                                            >Thứ tự theo giá: thấp đến cao</span>
                                        </li>
                                        <li onClick={() => this.onClick('price', -1)}>
                                            <span
                                                role="button"
                                                className={(sort.by === "price" && sort.value === -1) ? "sort_selected" : ""}
                                            >Thứ tự theo giá: cao đến thấp</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 products_page-list">
                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                <div className="products_item">
                                    {this.showProduct(products)}
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

    showProduct = (products) => {
        let result = null;
        if ( products !== undefined && products.length > 0) {
            result = products.map((product, index) => {
                return <ProductItem key={index} product={product}/>
            })
        }
        return result;
    }

    sortPriceProducts = (products, sort) => {
        let result = [];
        let productsSort = products
        if (products.length > 0) {
            if (sort.by === "id") {
                result = productsSort.sort((a, b) => {
                    if (a.id > b.id) return -sort.value;
                    else if (a.id < b.id) return sort.value;
                    else return 0;
                })
            } else {
                result = productsSort.sort((a, b) => {
                    if (a.price > b.price) return sort.value;
                    else if (a.price < b.price) return -sort.value;
                    else return 0;
                })
            }
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        productsCategories: state.productsCategories
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchAllProductsCategories: () => {
            dispatch(Actions.actFetchProductsCategoriesRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ProductPage);
