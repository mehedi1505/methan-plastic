import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const item_group_add = createAsyncThunk(
    'itemGroups/item_group_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-group-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_group = createAsyncThunk(
    'itemGroups/get_item_group',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-group-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_group_by_id = createAsyncThunk(
    'itemGroups/get_item_group_by_id',
     async (groupId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-group-get-by-id/${groupId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_group_update = createAsyncThunk(
    'itemGroups/item_group_update',
     async (groupInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-group-update',groupInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const delete_item_group = createAsyncThunk(
    'itemGroups/delete_item_group',
    async (group_id, { rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.delete(`/item-group-delete/${group_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const itemGroupReducer = createSlice({
    name :'itemGroups',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        itemGroups:[],
        itemGroup:'',
        totalItemGroup:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [item_group_add.pending] : (state,_)=>{
                state.loader = true
        },
        [item_group_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [item_group_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_item_group.fulfilled] : (state,{payload})=>{
            state.totalItemGroup = payload.totalItemGroup
            state.itemGroups = payload.itemGroups
        },
        [get_item_group_by_id.fulfilled] : (state,{payload})=>{
            state.itemGroup = payload.itemGroup
        },
        [item_group_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_item_group.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = itemGroupReducer.actions
export default itemGroupReducer.reducer