import React from "react"
import HomePage from "./pages/HomePage/HomePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import ProductPage from "./pages/ProductsPage/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import OrderPage from "./pages/OrderPage/OrderPage"
import CartPage from "./pages/CartPage/CartPage"
import PayOrderPage from "./pages/PayOrderPage/PayOrderPage"
import OrderCompletePage from "./pages/OrderCompletePage/OrderCompletePage"
import AdminManagerUser from "./pages/Admin/ManagerUser/ManagerUser"
import ManagerOrder from "./pages/Admin/ManagerOrder/ManagerOrder"
import ManagerProducts from "./pages/Admin/ManagerProducts/ManagerProducts"
import ManagerCategories from "./pages/Admin/ManagerCategories/ManagerCategories"
import ManagerShare from "./pages/Admin/ManagerShare/ManagerShare"
import ProfileAdmin from "./pages/Admin/ProfileAdmin/ProfileAdmin"
import UserAddress from "./pages/user/UserAddress/UserAddress"

const routes = [
    {
        path: "/",
        exact: true,
        main: ({match,history}) => <HomePage match={match} history={history}/>
    },
    {
        path: "/admin/profile",
        exact: false,
        main: ({history}) => <ProfileAdmin history={history}/>
    },
    {
        path: "/admin/users",
        exact: false,
        main: ({history}) => <AdminManagerUser history={history}/>
    },
    {
        path: "/admin/orders",
        exact: false,
        main: ({history}) => <ManagerOrder history={history}/>
    },
    {
        path: "/admin/products",
        exact: false,
        main: ({history}) => <ManagerProducts history={history}/>
    },
    {
        path: "/admin/categories",
        exact: false,
        main: ({history}) => <ManagerCategories history={history}/>
    },
    {
        path: "/admin/share",
        exact: false,
        main: ({history}) => <ManagerShare history={history}/>
    },
    {
        path: "/account/address",
        exact: false,
        main: ({history}) => <UserAddress history={history}/>
    },
    {
        path: "/products/category/:id/:name",
        exact: false,
        main: ({match}) => <ProductPage match={match}/>
    },
    {
        path: "/products/:id/:tensanpham",
        exact: false,
        main: ({match}) => <ProductDetailPage match={match}/>
    },
    {
        path: "/login",
        exact: false,
        main: ({history}) => <Login history={history}/>
    },
    {
        path: "/register",
        exact: false,
        main: ({history}) => <Register history={history}/>
    },
    {
        path: "/profile",
        exact: false,
        main: ({history}) => <ProfilePage history={history}/>
    },
    {
        path: "/order",
        exact: false,
        main: ({history}) => <OrderPage history={history}/>
    }
    ,
    {
        path: "/cart",
        exact: false,
        main: () => <CartPage/>
    },
    {
        path: "/pay",
        exact: false,
        main: ({history}) => <PayOrderPage history={history}/>
    },
    {
        path: "/ordercomplete",
        exact: false,
        main: () => <OrderCompletePage/>
    },
    {
        path: "",
        exact: true,
        main: () => <NotFoundPage/>
    }
]

export default routes;