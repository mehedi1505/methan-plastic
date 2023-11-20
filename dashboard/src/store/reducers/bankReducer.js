import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const bank_add = createAsyncThunk(
    'banks/bank_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/bank-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_bank = createAsyncThunk(
    'banks/get_bank',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-bank?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_bank_by_id = createAsyncThunk(
    'banks/get_bank_by_id',
     async (bankId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-bank-by-id/${bankId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bank_update = createAsyncThunk(
    'banks/bank_update',
     async (bankInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/bank-update',bankInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const bank_delete = createAsyncThunk(
    'banks/bank_delete',
    async (bank_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/bank-delete/${bank_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const bankReducer = createSlice({
    name :'banks',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        banks:[],
        bank:'',
        totalBank:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [bank_add.pending] : (state,_)=>{
                state.loader = true
        },
        [bank_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [bank_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_bank.fulfilled] : (state,{payload})=>{
            state.totalBank = payload.totalBank
            state.banks = payload.banks
        },
        [get_bank_by_id.fulfilled] : (state,{payload})=>{
            state.bank = payload.bank
        },
        [bank_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [bank_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = bankReducer.actions
export default bankReducer.reducer