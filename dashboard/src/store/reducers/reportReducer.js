import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

// export const receive_material_get = createAsyncThunk(
//     'reports/receive_material_get',
//      async (info,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/receive-material-get',info,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_all_vendor = createAsyncThunk(
    'reports/get_all_vendor',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-vendor',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const customers_get = createAsyncThunk(
    'reports/customers_get',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/customers-get',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_received_material_data = createAsyncThunk(
    'reports/get_received_material_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-received-material-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_production_report_data = createAsyncThunk(
    'reports/get_production_report_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-production-report-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_payment_report_data = createAsyncThunk(
    'reports/get_payment_report_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-payment-report-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_collection_report_data = createAsyncThunk(
    'reports/get_collection_report_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-collection-report-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_expenses_report_data = createAsyncThunk(
    'reports/get_expenses_report_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-expenses-report-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_gp_report_data = createAsyncThunk(
    'reports/get_gp_report_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-gp-report-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_challan_data = createAsyncThunk(
    'reports/get_challan_data',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/get-challan-data`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const material_stock = createAsyncThunk(
    'reports/material_stock',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/material-stock-data',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const product_stock = createAsyncThunk(
    'reports/product_stock',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/product-stock-data',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_material_for_stock = createAsyncThunk(
    'reports/get_all_material_for_stock',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-material-for-stock',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_product_for_stock = createAsyncThunk(
    'reports/get_all_product_for_stock',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-product-for-stock',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_single_item_stock = createAsyncThunk(
    'reports/get_single_item_stock',
     async (itemId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-single-item-stock/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_single_product_stock = createAsyncThunk(
    'reports/get_single_product_stock',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-single-product-stock/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)





export const reportReducer = createSlice({
    name :'reports',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        allVendors:[],
        customers:[],
        receiveData:[],
        challanData:[],
        materialStockData:[],
        allItems:[],
        itemInfo:'',
        recTotal:[],
        rmUsedTotal:[],
        allProducts:[],
        productInfo:'',
        totalProduction:[],
        totalSale:[],
        productStockData:[],
        productionData:[],
        paymentData:[],
        collectionData:[],
        expensesData:[],
        gpData:[],

    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [get_all_vendor.fulfilled] : (state,{payload})=>{
                state.allVendors = payload.allVendors
        },
        [customers_get.fulfilled] : (state,{payload})=>{
                state.customers = payload.allCustomers
        },
        [get_received_material_data.fulfilled] : (state,{payload})=>{
                state.receiveData = payload.receiveData
                state.errorMessage = payload.error
        },
        [get_challan_data.fulfilled] : (state,{payload})=>{
                state.challanData = payload.challanData
        },
        [material_stock.fulfilled] : (state,{payload})=>{
                state.materialStockData = payload.materialStockData
        },
        [get_all_material_for_stock.fulfilled] : (state,{payload})=>{
                state.allItems = payload.allItems
        },
        [get_all_product_for_stock.fulfilled] : (state,{payload})=>{
                state.allProducts = payload.allProducts
        },
        [get_single_item_stock.fulfilled] : (state,{payload})=>{
                state.itemInfo = payload.itemInfo
                state.recTotal = payload.recTotal
                state.rmUsedTotal = payload.rmUsedTotal
        },
        [get_single_product_stock.fulfilled] : (state,{payload})=>{
                state.productInfo = payload.productInfo
                state.totalProduction = payload.totalProduction
                state.totalSale = payload.totalSale
        },
        [product_stock.fulfilled] : (state,{payload})=>{
            state.productStockData = payload.productStockData
        },
        [get_production_report_data.fulfilled] : (state,{payload})=>{
            state.productionData = payload.productionData
        },
        [get_payment_report_data.fulfilled] : (state,{payload})=>{
            state.paymentData = payload.paymentData
        },
        [get_collection_report_data.fulfilled] : (state,{payload})=>{
            state.collectionData = payload.collectionData
        },
        [get_expenses_report_data.fulfilled] : (state,{payload})=>{
            state.expensesData = payload.expensesData
        },
        [get_gp_report_data.fulfilled] : (state,{payload})=>{
            state.gpData = payload.gpData
        },
        
    }
})
export const { messageClear } = reportReducer.actions
export default reportReducer.reducer