import React from "react"
import "./ProductSlider.css"
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem"

class ProductSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true,
      width: 600
    };
  }

  render() {
    let {products} =this.props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
          {this.showProduct(products)}
      </Slider>
    )
  }

  showProduct = (products)=>{
    let result = null;
    if(products && products.length >0){
      result = products.map((product, index)=>{
          return <ProductItem key={index} product = {product}/>
      })
    }
    return result;
  }

}

export default ProductSlider;