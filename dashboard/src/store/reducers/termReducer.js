import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const term_add = createAsyncThunk(
    'terms/term_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/term-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_term = createAsyncThunk(
    'terms/get_term',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/term-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const term_get_by_id = createAsyncThunk(
    'terms/term_get_by_id',
     async (termId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/term-get-by-id/${termId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const term_update = createAsyncThunk(
    'terms/term_update',
     async (termInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/term-update',termInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const delete_term = createAsyncThunk(
    'terms/delete_term',
    async (term_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/term-delete/${term_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const termReducer = createSlice({
    name :'terms',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        terms:[],
        term:"",
        totalTerm:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [term_add.pending] : (state,_)=>{
                state.loader = true
        },
        [term_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [term_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_term.fulfilled] : (state,{payload})=>{
            state.totalTerm = payload.totalTerm
            state.terms = payload.terms
        },
        [term_get_by_id.fulfilled] : (state,{payload})=>{
            state.term = payload.term
        },
        [term_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_term.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = termReducer.actions
export default termReducer.reducer