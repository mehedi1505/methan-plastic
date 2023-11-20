import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const vendor_add = createAsyncThunk(
    'vendors/vendor_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/vendor-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const vendor_get = createAsyncThunk(
    'vendors/vendor_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/vendor-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const vendor_get_by_id = createAsyncThunk(
    'vendors/vendor_get_by_id',
     async (vendorId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/vendor-get-by-id/${vendorId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const vendor_update = createAsyncThunk(
    'vendors/vendor_update',
     async (vendorInfo,{rejectWithValue,fulfillWithValue})=>{
        console.log(vendorInfo)
        try {
            const { data } = await api.post('/vendor-update',vendorInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const delete_vendor = createAsyncThunk(
    'vendors/delete_vendor',
    async (vendor_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/vendor-delete/${vendor_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const vendorReducer = createSlice({
    name :'vendors',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        vendors:[],
        vendor:"",
        totalVendor:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [vendor_add.pending] : (state,_)=>{
            state.loader = true
        },
        [vendor_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [vendor_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [vendor_get.fulfilled] : (state,{payload})=>{
            state.totalVendor = payload.totalVendor
            state.vendors = payload.vendors
        },
        [vendor_get_by_id.fulfilled] : (state,{payload})=>{
            state.vendor = payload.vendor
        },
        [vendor_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_vendor.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = vendorReducer.actions
export default vendorReducer.reducer