import { combineReducers} from "redux";
import products from "./products"
import product from "./product"
import categories from "./categories"
import productsCategories from "./productsCategories"
import categoryDetail from "./categoryDetail"
import user from "./user"
import users from "./users"
import message from "./message"
import carts from "./carts"
import orders from "./oders"
import shipperAddress from "./shipperAddress"
import orderDetails from "./orderDetails"
import shipperAddressUser from "./shipperAddressUser"
import comments from "./comments"
import productsPage from "./productsPage"

const appReducers = combineReducers({
    products,
    product,
    categories,
    productsCategories,
    categoryDetail,
    user,
    users,
    message,
    carts,
    orders,
    shipperAddress,
    orderDetails,
    shipperAddressUser,
    comments,
    productsPage
});

export default appReducers;