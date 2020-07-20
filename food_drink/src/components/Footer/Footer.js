import React from "react"
import "./Footer.css"

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="more_information">
                                <img src="/images/logo-footer.png" alt="logo" />
                                <p>Với châm ngôn tuyệt đối không sử dụng nguyên liệu không rõ nguồn gốc, xuất xứ, trà sữa Bumba tự hào mang lại cho khách hàng những sản phẩm, chất lượng tốt nhất</p>
                                <ul>
                                    <li><i className="fab fa-facebook-f"></i></li>
                                    <li><i className="fab fa-instagram"></i></li>
                                    <li><i className="fab fa-youtube"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="contact">
                                <h4>Liên hệ</h4>
                                <ul>
                                    <li>Công ty CP TM DV Chào Ngày Mới</li>
                                    <li>458 Tôn Đức Thắng - Phường Hòa Khánh Nam - Quận Liên Chiểu - Thành phố Đà Nẵng</li>
                                    <li>Email: zzvanhai81@gmail.com</li>
                                    <li>Hotline: 0973 741 903</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 coppy">
                            <p>Copyright &copy; 2020 Bumba. Developed by IONS</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;