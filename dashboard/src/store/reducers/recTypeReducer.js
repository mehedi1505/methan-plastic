import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const rec_type_add = createAsyncThunk(
    'recTypes/rec_type_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/rec-type-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const rec_type_get = createAsyncThunk(
    'recTypes/rec_type_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/rec-type-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const rec_type_get_by_id = createAsyncThunk(
    'recTypes/rec_type_get_by_id',
     async (recTypeId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/rec-type-get-by-id/${recTypeId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const rec_type_update = createAsyncThunk(
    'recTypes/rec_type_update',
     async (typeInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/rec-type-update',typeInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const recTypeReducer = createSlice({
    name :'recTypes',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        types:[],
        type:"",
        totalType:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [rec_type_add.pending] : (state,_)=>{
                state.loader = true
        },
        [rec_type_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [rec_type_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [rec_type_get.fulfilled] : (state,{payload})=>{
            state.totalType = payload.totalType
            state.types = payload.types
        },
        [rec_type_get_by_id.fulfilled] : (state,{payload})=>{
            state.type = payload.recType
        },
        [rec_type_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = recTypeReducer.actions
export default recTypeReducer.reducer