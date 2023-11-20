import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const item_add = createAsyncThunk(
    'items/item_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const items_get = createAsyncThunk(
    'items/items_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/items-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_get_by_id = createAsyncThunk(
    'items/item_get_by_id',
     async (itemId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-get-by-id/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_update = createAsyncThunk(
    'items/item_update',
     async (itemInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-update',itemInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const itemReducer = createSlice({
    name :'items',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        items:[],
        item:"",
        totalItem:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [item_add.pending] : (state,_)=>{
                state.loader = true
        },
        [item_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [item_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [items_get.fulfilled] : (state,{payload})=>{
            state.totalItem = payload.totalItems
            state.items = payload.items
        },
        [item_get_by_id.fulfilled] : (state,{payload})=>{
            state.item = payload.item
        },
        [item_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = itemReducer.actions
export default itemReducer.reducer