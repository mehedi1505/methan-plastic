import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_all_vendors = createAsyncThunk(
    'payments/get_all_vendors',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-all-vendors',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const payment_add = createAsyncThunk(
    'payments/payment_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/payment-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_all_payment = createAsyncThunk(
    'payments/get_all_payment',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-all-payment?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const payment_get_by_id = createAsyncThunk(
    'payments/payment_get_by_id',
     async (paymentId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/payment-get-by-id/${paymentId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const payment_update = createAsyncThunk(
    'payments/payment_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/payment-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const paymentReducer = createSlice({
    name :'payments',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        payModes:[],
        vendors:[],
        banks:[],
        payments:[],
        payment:[],
        totalPayment:0,
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [payment_add.pending] : (state,_)=>{
            state.loader = true
        },
        [payment_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [payment_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message           
            state.errorMessage = payload.error         
        },
     
        [get_all_vendors.fulfilled] : (state,{payload})=>{
            state.vendors = payload.vendors
        },
        [get_all_payment.fulfilled] : (state,{payload})=>{
            state.payments = payload.payments
            state.totalPayment = payload.totalPayment
        },

        [payment_get_by_id.fulfilled] : (state,{payload})=>{
            state.payment = payload.payment
        },
        [payment_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
    }
    
})
export const { messageClear } = paymentReducer.actions
export default paymentReducer.reducer