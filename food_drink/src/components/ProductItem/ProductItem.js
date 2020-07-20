import React from 'react';
import "./ProductItem.css"
import { Link } from 'react-router-dom';

class ProductItem extends React.Component {

    render() {
        let {product} = this.props
        return (
            <div className="thumbnail">
                <span className="like_product"><i className="fas fa-heart"></i></span>
                <img src={product.img} alt="Slide11" />
                <Link to={`/products/${product.id}/${product.name}`} className="detailt_product">Xem chi tiết</Link>
                <div className="caption">
                <h4>{product.name}</h4>
                    <p>{product.price} đ</p>
                </div>
            </div>
        );
    }
}

export default ProductItem;
