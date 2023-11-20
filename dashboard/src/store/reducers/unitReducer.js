import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const unit_add = createAsyncThunk(
    'itemUnits/unit_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-unit-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_unit = createAsyncThunk(
    'itemUnits/get_item_unit',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/item-unit-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_unit_by_id = createAsyncThunk(
    'itemUnits/get_item_unit_by_id',
     async (unitId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-unit-get-by-id/${unitId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_unit_update = createAsyncThunk(
    'itemUnits/item_unit_update',
     async (unitInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-unit-update',unitInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const delete_item_unit = createAsyncThunk(
    'itemUnits/delete_item_unit',
    async (unit_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/item-unit-delete/${unit_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const unitReducer = createSlice({
    name :'itemUnits',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        itemUnits:[],
        itemUnit:"",
        totalItemUnit:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [unit_add.pending] : (state,_)=>{
                state.loader = true
        },
        [unit_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [unit_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_item_unit.fulfilled] : (state,{payload})=>{
            state.totalItemUnit = payload.totalItemUnit
            state.itemUnits = payload.itemUnits
        },
        [get_item_unit_by_id.fulfilled] : (state,{payload})=>{
            state.itemUnit = payload.itemUnit
        },
        [item_unit_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_item_unit.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = unitReducer.actions
export default unitReducer.reducer