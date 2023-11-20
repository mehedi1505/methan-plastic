import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const bill_add = createAsyncThunk(
    'bills/bill_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/bill-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const product_delete = createAsyncThunk(
    'bills/product_delete',
     async ({billNumber,productId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/product-delete/${billNumber}/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const get_all_gate_pass_type = createAsyncThunk(
//     'gatePass/get_all_gate_pass_type',
//      async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/get-all-gate-pass-type?searchValue=${searchValue}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_gate_pass_type_by_id = createAsyncThunk(
//     'gatePass/get_gate_pass_type_by_id',
//      async (gatePassId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/get-gate-pass-type-by-id/${gatePassId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const gate_pass_type_update = createAsyncThunk(
//     'gatePass/gate_pass_type_update',
//      async (info,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.post('/gate-pass-type-update',info,{withCredentials:true})
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const gate_pass_type_delete = createAsyncThunk(
//     'gatePass/gate_pass_type_delete',
//     async (gatePassId, {
//         rejectWithValue,
//         fulfillWithValue
//     }) => {
//         try {
//             const {data} = await api.delete(`/gate-pass-type-delete/${gatePassId}`,{withCredentials:true})
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_agents = createAsyncThunk(
//     'gatePass/get_agents',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-agents',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_customers = createAsyncThunk(
//     'gatePass/get_customers',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-customers',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_gp_types = createAsyncThunk(
//     'gatePass/get_gp_types',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-gp-types',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_terms = createAsyncThunk(
//     'gatePass/get_terms',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-terms',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_customers = createAsyncThunk(
    'bills/get_customers',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-customers',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_invoice = createAsyncThunk(
    'bills/get_invoice',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-invoice',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_bill = createAsyncThunk(
    'bills/get_all_bill',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/all-bill-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const gate_pass_add = createAsyncThunk(
//     'gatePass/gate_pass_add',
//      async (info,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.post('/gate-pass-add',info,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const last_bill_number_show = createAsyncThunk(
    'bills/last_bill_number_show',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-bill-number-show',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bill_add_info = createAsyncThunk(
    'bills/bill_add_info',
     async (billNumber,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/bill-add-info/${billNumber}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bill_view_by_id = createAsyncThunk(
    'bills/bill_view_by_id',
     async (billId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/bill-view-by-id/${billId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const customer_due = createAsyncThunk(
    'bills/customer_due',
     async (cusId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/customer-due/${cusId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const g_pass_product_details_item_delete = createAsyncThunk(
//     'gatePass/g_pass_product_details_item_delete',
//      async ({gpId,productId},{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.delete(`/g-pass-product-details-item-delete/${gpId}/${productId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_bill_by_id = createAsyncThunk(
    'bills/get_bill_by_id',
     async (billId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-bill-by-id/${billId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bill_info_update = createAsyncThunk(
    'bills/bill_info_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/bill-info-update`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const billReducer = createSlice({
    name :'bills',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        customers:[],
        invoices:[],
        bills:[],
        bill:'',
        totalBill:0,
        lastBillNumberShow:'',
        billAddInfo:[],
        billViewInfo:[],
        billDetailProduct:[],
        billTotalAmount:[],
        collectionAmount:[],
        billAmount:[],
        customerDue:0,
        editBillInfo:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [bill_add.pending] : (state,_)=>{
                state.loader = true
        },
        [bill_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [bill_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_all_bill.fulfilled] : (state,{payload})=>{
            state.totalBill = payload.totalBill
            state.bills = payload.getBills
        },
        [get_invoice.fulfilled] : (state,{payload})=>{
            state.invoices = payload.invoices
        },
        [last_bill_number_show.fulfilled] : (state,{payload})=>{
            state.lastBillNumberShow = payload.lastBillNumberShow
        },
        [bill_add_info.fulfilled] : (state,{payload})=>{
            state.billAddInfo = payload.billAddInfo
        },
        [product_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_customers.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [bill_view_by_id.fulfilled] : (state,{payload})=>{
            state.billViewInfo = payload.billViewInfo
            state.billDetailProduct = payload.billDetailProduct
            state.billTotalAmount = payload.billTotalAmount
        },
        [customer_due.fulfilled] : (state,{payload})=>{
            state.billAmount = payload.billAmount
            state.collectionAmount = payload.collectionAmount
            state.customerDue = payload.customerDue
        },
        [get_bill_by_id.fulfilled] : (state,{payload})=>{
            state.editBillInfo = payload.editBillInfo
        },
        [bill_info_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
    }
})
export const { messageClear } = billReducer.actions
export default billReducer.reducer