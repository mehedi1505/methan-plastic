import authReducer from "./reducers/authReducer"
import itemReducer from "./reducers/itemReducer"
import itemCategoryReducer from "./reducers/itemCategoryReducer"
import unitReducer from "./reducers/unitReducer"
import itemGroupReducer from "./reducers/itemGroupReducer"
import termReducer from "./reducers/termReducer"
import vendorReducer from "./reducers/vendorReducer"
import customerReducer from "./reducers/customerReducer"
import recTypeReducer from "./reducers/recTypeReducer"
import productReducer from "./reducers/productReducer"
import bomReducer from "./reducers/bomReducer"
import receiveReducer from "./reducers/receiveReducer"
import productionReducer from "./reducers/productionReducer"
import bankReducer from "./reducers/bankReducer"
import agentReducer from "./reducers/agentReducer"
import paymentModeReducer from "./reducers/paymentModeReducer"
import expenseReducer from "./reducers/expenseReducer"
import assetReducer from "./reducers/assetReducer"
import invoiceReducer from "./reducers/invoiceReducer"
import collectionReducer from "./reducers/collectionReducer"
import paymentReducer from "./reducers/paymentReducer"
import billReducer from "./reducers/billReducer"
import gatePassReducer from "./reducers/gatePassReducer"
import reportReducer from "./reducers/reportReducer"
import orderReducer from "./reducers/orderReducer"
import payrollReducer from "./reducers/payrollReducer"


const rootReducer = {
    auth:authReducer,
    item:itemReducer,
    item_category:itemCategoryReducer,
    unit:unitReducer,
    itemGroup:itemGroupReducer,
    term:termReducer,
    vendor:vendorReducer,
    customer:customerReducer,
    rec_type:recTypeReducer,
    product:productReducer,
    bom:bomReducer,
    item_receive:receiveReducer,
    production:productionReducer,
    bank:bankReducer,
    agent:agentReducer,
    pay_mode:paymentModeReducer,
    expense:expenseReducer,
    asset:assetReducer,
    invoice:invoiceReducer,
    collection:collectionReducer,
    payment:paymentReducer,
    bill:billReducer,
    gatePass:gatePassReducer,
    report:reportReducer,
    order:orderReducer,
    payroll:payrollReducer,
}

export default rootReducer