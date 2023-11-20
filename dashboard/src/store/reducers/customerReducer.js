import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const customer_add = createAsyncThunk(
    'customers/customer_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/customer-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const customer_get = createAsyncThunk(
    'customers/customer_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/customer-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const customer_get_by_id = createAsyncThunk(
    'customers/customer_get_by_id',
     async (customerId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/customer-get-by-id/${customerId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const customer_update = createAsyncThunk(
    'customers/customer_update',
     async (customerInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/customer-update',customerInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const delete_customer = createAsyncThunk(
    'customers/delete_customer',
    async (customer_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/customer-delete/${customer_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customerReducer = createSlice({
    name :'customers',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        customers:[],
        customer:"",
        totalCustomer:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [customer_add.pending] : (state,_)=>{
            state.loader = true
        },
        [customer_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [customer_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [customer_get.fulfilled] : (state,{payload})=>{
            state.totalCustomer = payload.totalCustomer
            state.customers = payload.customers
        },
        [customer_get_by_id.fulfilled] : (state,{payload})=>{
            state.customer = payload.customer
        },
        [customer_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_customer.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = customerReducer.actions
export default customerReducer.reducer