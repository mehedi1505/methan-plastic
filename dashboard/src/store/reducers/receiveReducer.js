import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_receive_types = createAsyncThunk(
    'receives/get_receive_types',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-receive-types',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const last_invoice_number = createAsyncThunk(
    'receives/last_invoice_number',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-invoice-number',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_vendors = createAsyncThunk(
    'receives/get_vendors',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-vendors',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_items = createAsyncThunk(
    'receives/get_items',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-items',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_info = createAsyncThunk(
    'receives/get_item_info',
     async (itemId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-item-info/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_receive = createAsyncThunk(
    'receives/item_receive',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-receive',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const show_item_details = createAsyncThunk(
    'receives/show_item_details',
     async (receiveId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-item-details/${receiveId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const receive_items_get = createAsyncThunk(
    'receives/receive_items_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/receive-items-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const receive_get_by_id = createAsyncThunk(
    'receives/receive_get_by_id',
     async (receiveId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/receive-get-by-id/${receiveId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const receive_details_item_delete = createAsyncThunk(
    'receives/receive_details_item_delete',
     async ({invoiceId,itemId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/receive-details-item-delete/${invoiceId}/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const receive_info_update = createAsyncThunk(
    'receives/receive_info_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/receive-info-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const receive_invoice_delete = createAsyncThunk(
    'receives/receive_invoice_delete',
     async (receiveId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/receive-invoice-delete/${receiveId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const receiveReducer = createSlice({
    name :'receives',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        types:[],
        vendors:[],
        items:[],
        itemInfo:[],
        receiveDetails:[],
        itemName:'',
        receiveItems:[],
        receiveItem:"",
        unit:[],
        totalReceiveItem:0,
        lastInvoiceNumber:'',
        receiveTotalPerInvoice:[]
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [item_receive.pending] : (state,_)=>{
            state.loader = true
        },
        [item_receive.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [item_receive.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message  
            state.errorMessage = payload.error         
        },
        [get_receive_types.fulfilled] : (state,{payload})=>{
            state.types = payload.types
        },
        [get_vendors.fulfilled] : (state,{payload})=>{
            state.vendors = payload.vendors
        },
        [get_items.fulfilled] : (state,{payload})=>{
            state.items = payload.items
        },
        [get_item_info.fulfilled] : (state,{payload})=>{
            state.itemInfo = payload.itemInfo
        },
        [show_item_details.fulfilled] : (state,{payload})=>{
            state.receiveDetails = payload.receiveDetails
            state.receiveTotalPerInvoice = payload.receiveTotal
        },
        [receive_details_item_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [receive_items_get.fulfilled] : (state,{payload})=>{
            state.receiveItems = payload.receiveItems
            state.totalReceiveItem = payload.totalReceiveItem
        },
        [receive_get_by_id.fulfilled] : (state,{payload})=>{
            state.receiveItem = payload.receiveItem
        },
        [receive_info_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [last_invoice_number.fulfilled] : (state,{payload})=>{
            state.lastInvoiceNumber = payload.lastInvoiceNumber
        },
        [receive_invoice_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
            state.errorMessage = payload.error
        }
    }
    
})
export const { messageClear } = receiveReducer.actions
export default receiveReducer.reducer