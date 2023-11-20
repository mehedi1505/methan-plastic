import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_all_payment_mode = createAsyncThunk(
    'collections/get_all_payment_mode',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-payment-mode',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_all_customers = createAsyncThunk(
    'collections/get_all_customers',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-customers',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_banks = createAsyncThunk(
    'collections/get_banks',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-banks',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_agents = createAsyncThunk(
    'collections/get_agents',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-agents',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// export const get_items = createAsyncThunk(
//     'receives/get_items',
//      async (_,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get('/get-items',{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// export const get_item_info = createAsyncThunk(
//     'receives/get_item_info',
//      async (itemId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/get-item-info/${itemId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const collection_add = createAsyncThunk(
    'collections/collection_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/collection-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const get_all_collection = createAsyncThunk(
//     'collections/get_all_collection',
//      async (receiveId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/show-item-details/${receiveId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_all_collection = createAsyncThunk(
    'collections/get_all_collection',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-all-collection?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const collection_get_by_id = createAsyncThunk(
    'collections/collection_get_by_id',
     async (collectionId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/collection-get-by-id/${collectionId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const receive_details_item_delete = createAsyncThunk(
//     'receives/receive_details_item_delete',
//      async ({invoiceId,itemId},{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.delete(`/receive-details-item-delete/${invoiceId}/${itemId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const collection_update = createAsyncThunk(
    'collections/collection_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/collection-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// export const receive_invoice_delete = createAsyncThunk(
//     'receives/receive_invoice_delete',
//      async (receiveId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.delete(`/receive-invoice-delete/${receiveId}`,{withCredentials:true})
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export const collectionReducer = createSlice({
    name :'collections',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        payModes:[],
        customers:[],
        banks:[],
        agents:[],
        collections:[],
        collection:[],
        totalCollection:0,
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [collection_add.pending] : (state,_)=>{
            state.loader = true
        },
        [collection_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [collection_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message           
            state.errorMessage = payload.error         
        },
        [get_all_payment_mode.fulfilled] : (state,{payload})=>{
            state.payModes = payload.payModes
        },
        [get_all_customers.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [get_banks.fulfilled] : (state,{payload})=>{
            state.banks = payload.banks
        },
        [get_agents.fulfilled] : (state,{payload})=>{
            state.agents = payload.agents
        },
        [get_all_collection.fulfilled] : (state,{payload})=>{
            state.collections = payload.collections
            state.totalCollection = payload.totalCollection
        },
        // [get_item_info.fulfilled] : (state,{payload})=>{
        //     state.itemInfo = payload.itemInfo
        // },
        // [show_item_details.fulfilled] : (state,{payload})=>{
        //     state.receiveDetails = payload.receiveDetails
        //     state.receiveTotalPerInvoice = payload.receiveTotal
        // },
        // [receive_details_item_delete.fulfilled] : (state,{payload})=>{
        //     state.successMessage = payload.message
        // },
        // [receive_items_get.fulfilled] : (state,{payload})=>{
        //     state.receiveItems = payload.receiveItems
        //     state.totalReceiveItem = payload.totalReceiveItem
        // },
        [collection_get_by_id.fulfilled] : (state,{payload})=>{
            state.collection = payload.collection
        },
        [collection_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        // [last_invoice_number.fulfilled] : (state,{payload})=>{
        //     state.lastInvoiceNumber = payload.lastInvoiceNumber
        // },
        // [receive_invoice_delete.fulfilled] : (state,{payload})=>{
        //     state.successMessage = payload.message
        //     state.errorMessage = payload.error
        // }
    }
    
})
export const { messageClear } = collectionReducer.actions
export default collectionReducer.reducer