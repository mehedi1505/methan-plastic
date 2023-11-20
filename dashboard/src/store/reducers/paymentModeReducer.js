import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const pay_mode_add = createAsyncThunk(
    'pmodes/pay_mode_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/pay-mode-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_pay_mode = createAsyncThunk(
    'pmodes/get_pay_mode',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-pay-mode?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_pay_mode_by_id = createAsyncThunk(
    'pmodes/get_pay_mode_by_id',
     async (pmodeId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-pay-mode-by-id/${pmodeId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const pay_mode_update = createAsyncThunk(
    'pmodes/pay_mode_update',
     async (pmodeInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/pay-mode-update',pmodeInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const pay_mode_delete = createAsyncThunk(
    'pmodes/pay_mode_delete',
    async (pmode_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/pay-mode-delete/${pmode_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const paymentModeReducer = createSlice({
    name :'pmodes',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        paymodes:[],
        paymode:'',
        totalPmode:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [pay_mode_add.pending] : (state,_)=>{
                state.loader = true
        },
        [pay_mode_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [pay_mode_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_pay_mode.fulfilled] : (state,{payload})=>{
            state.totalPmode = payload.totalPmode
            state.paymodes = payload.paymodes
        },
        [get_pay_mode_by_id.fulfilled] : (state,{payload})=>{
            state.paymode = payload.paymode
        },
        [pay_mode_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [pay_mode_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = paymentModeReducer.actions
export default paymentModeReducer.reducer