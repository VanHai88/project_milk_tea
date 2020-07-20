import React from 'react';
import ProductSlider from "../../components/ProductSlider/ProductSlider"
import { Link } from 'react-router-dom';

class ProductCategory extends React.Component {
    
    render() {
        let {id, name, products } = this.props
        return (
            <div className="product_milk_tea">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h2>{name}</h2>
                            <Link to={`/products/category/${id}/${name}`}>Xem thêm <i className="fas fa-chevron-right"></i></Link>
                        </div>
                        <ProductSlider products={products} />
                    </div>
                </div>
            </div>

        );
    }
}

export default ProductCategory;
