import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const last_invoice_number_show = createAsyncThunk(
    'invoices/last_invoice_number_show',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-invoice-number-show',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_customers = createAsyncThunk(
    'invoices/get_customers',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-customers',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_products = createAsyncThunk(
    'invoices/get_products',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-products`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_terms = createAsyncThunk(
    'invoices/get_terms',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-terms',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_product_info = createAsyncThunk(
    'invoices/get_product_info',
     async ({productId,orderNumber},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-product-info/${orderNumber}/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const order_status = createAsyncThunk(
    'invoices/order_status',
     async ({orderNumber},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/order-status/${orderNumber}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const invoice_create = createAsyncThunk(
    'invoices/invoice_create',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/invoice-create',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const show_product_details = createAsyncThunk(
    'invoices/show_product_details',
     async (invoiceNumber,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-product-details/${invoiceNumber}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const invoice_products_get = createAsyncThunk(
    'invoices/invoice_products_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/invoice-products-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const invoice_get_by_id = createAsyncThunk(
    'invoices/invoice_get_by_id',
     async (invoiceId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/invoice-get-by-id/${invoiceId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const invoice_view_by_id = createAsyncThunk(
    'invoices/invoice_view_by_id',
     async (invoiceId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/invoice-view-by-id/${invoiceId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

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
export const product_details_item_delete = createAsyncThunk(
    'invoices/product_details_item_delete',
     async ({invoiceId,productId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/product-details-item-delete/${invoiceId}/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const invoice_info_update = createAsyncThunk(
    'invoices/invoice_info_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/invoice-info-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const invoice_delete = createAsyncThunk(
    'invoices/invoice_delete',
     async (invoiceId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/invoice-delete/${invoiceId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const invoiceReducer = createSlice({
    name :'invoices',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        terms:[],
        customers:[],
        products:[],
        productInfo:'',
        invoiceProductDetails:[],
        invoiceViewInfo:[],
        invoiceTotalAmount:[],
        invoiceProducts:[],
        editProductInfo:'',
        totalInvoice:0,
        lastInvoiceNumberShow:'',
        productTotalPerInvoice:[],
        invoiceProduct:[],
        orderStatus:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [invoice_create.pending] : (state,_)=>{
            state.loader = true
        },
        [invoice_create.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [invoice_create.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message   
            state.errorMessage = payload.error        
        },
        [get_customers.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [get_products.fulfilled] : (state,{payload})=>{
            state.products = payload.products
        },
        [get_terms.fulfilled] : (state,{payload})=>{
            state.terms = payload.terms
        },
        [get_product_info.fulfilled] : (state,{payload})=>{
            state.productInfo = payload.productInfo
        },
        [show_product_details.fulfilled] : (state,{payload})=>{
            state.invoiceProductDetails = payload.invoiceProductDetails
            state.productTotalPerInvoice = payload.invoiceProductTotal
        },
        [product_details_item_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [invoice_products_get.fulfilled] : (state,{payload})=>{
            state.invoiceProducts = payload.invoiceProducts
            state.totalInvoice = payload.totalInvoice
        },
        [invoice_get_by_id.fulfilled] : (state,{payload})=>{
            state.editProductInfo = payload.editProductInfo
        },
        [invoice_view_by_id.fulfilled] : (state,{payload})=>{
            state.invoiceViewInfo = payload.invoiceViewInfo
            state.invoiceTotalAmount = payload.invoiceTotalAmount
            state.invoiceProduct = payload.invoiceProduct
        },
        [invoice_info_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [last_invoice_number_show.fulfilled] : (state,{payload})=>{
            state.lastInvoiceNumberShow = payload.lastInvoiceNumberShow
        },
        [invoice_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [order_status.fulfilled] : (state,{payload})=>{
            state.orderStatus = payload.orderStatus
        },
    }
    
})
export const { messageClear } = invoiceReducer.actions
export default invoiceReducer.reducer