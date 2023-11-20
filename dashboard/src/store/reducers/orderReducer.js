import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const last_order_number_show = createAsyncThunk(
    'orders/last_order_number_show',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-order-number-show',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_order_customers = createAsyncThunk(
    'orders/get_order_customers',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-order-customers',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_order_products = createAsyncThunk(
    'orders/get_order_products',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-order-products',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const get_terms = createAsyncThunk(
//     'invoices/get_terms',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-terms',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_order_product_info = createAsyncThunk(
    'orders/get_order_product_info',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-order-product-info/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const order_create = createAsyncThunk(
    'orders/order_create',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/order-create',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const show_order_details = createAsyncThunk(
    'orders/show_order_details',
     async (orderNumber,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-order-details/${orderNumber}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const order_products_get = createAsyncThunk(
    'orders/order_products_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/order-products-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const order_get_by_id = createAsyncThunk(
    'orders/order_get_by_id',
     async (orderId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/order-get-by-id/${orderId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const invoice_view_by_id = createAsyncThunk(
//     'invoices/invoice_view_by_id',
//      async (invoiceId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/invoice-view-by-id/${invoiceId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const get_invoice_for_update = createAsyncThunk(
//     'invoices/get_invoice_for_update',
//      async (invoiceNumber,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/get-invoice-for-update/${invoiceNumber}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const order_details_item_delete = createAsyncThunk(
    'orders/order_details_item_delete',
     async ({orderId,productId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/order-details-item-delete/${orderId}/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const order_info_update = createAsyncThunk(
    'orders/order_info_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/order-info-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const order_delete = createAsyncThunk(
    'orders/order_delete',
     async (orderId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/order-delete/${orderId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const total_sales = createAsyncThunk(
    'orders/total_sales',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/total-sales',{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const today_sales = createAsyncThunk(
    'orders/today_sales',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/today-sales',{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const orderReducer = createSlice({
    name :'orders',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        customers:[],
        products:[],
        productInfo:'',
        orderProductDetails:[],
        orderViewInfo:[],
        orderTotalAmount:[],
        orderProducts:[],
        editOrderInfo:'',
        totalOrder:0,
        lastOrderNumberShow:"",
        productTotalPerOrder:[],
        OrderProduct:[],
        totalSales:[],
        todaySales:[],
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [order_create.pending] : (state,_)=>{
            state.loader = true
        },
        [order_create.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [order_create.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message   
            state.errorMessage = payload.error        
        },
        [get_order_customers.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [get_order_products.fulfilled] : (state,{payload})=>{
            state.products = payload.products
        },
        [get_order_product_info.fulfilled] : (state,{payload})=>{
            state.productInfo = payload.productInfo
        },
        [show_order_details.fulfilled] : (state,{payload})=>{
            state.orderProductDetails = payload.orderProductDetails
            state.productTotalPerOrder = payload.orderProductTotal
        },
        [order_details_item_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [order_products_get.fulfilled] : (state,{payload})=>{
            state.orderProducts = payload.orderProducts
            state.totalOrder = payload.totalOrder
        },
        [order_get_by_id.fulfilled] : (state,{payload})=>{
            state.editOrderInfo = payload.editOrderInfo
        },
        [order_info_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [last_order_number_show.fulfilled] : (state,{payload})=>{
            state.lastOrderNumberShow = payload.lastOrderNumberShow
        },
        [order_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [total_sales.fulfilled] : (state,{payload})=>{
            state.totalSales = payload.totalSales
        },
        [today_sales.fulfilled] : (state,{payload})=>{
            state.todaySales = payload.todaySales
        }
    }
    
})
export const { messageClear } = orderReducer.actions
export default orderReducer.reducer