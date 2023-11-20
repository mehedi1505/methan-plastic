import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const itemCategoryAdd = createAsyncThunk(
    'itemCategories/itemCategoryAdd',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-category-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_category = createAsyncThunk(
    'itemCategories/get_item_category',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-category-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_item_category_by_id = createAsyncThunk(
    'itemCategories/get_item_category_by_id',
     async (itemCatId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/item-category-get-by-id/${itemCatId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const item_category_update = createAsyncThunk(
    'itemCategories/item_category_update',
     async (categoryInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/item-category-update',categoryInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const item_category_delete = createAsyncThunk(
    'itemCategories/item_category_delete',
    async (category_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/item-category-delete/${category_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const itemCategoryReducer = createSlice({
    name :'itemCategories',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        itemCategories:[],
        itemCategory:'',
        totalItemCategory:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [itemCategoryAdd.pending] : (state,_)=>{
                state.loader = true
        },
        [itemCategoryAdd.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [itemCategoryAdd.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_item_category.fulfilled] : (state,{payload})=>{
            state.totalItemCategory = payload.totalItemCategory
            state.itemCategories = payload.itemCategories
        },
        [get_item_category_by_id.fulfilled] : (state,{payload})=>{
            state.itemCategory = payload.itemCategory
        },
        [item_category_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [item_category_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = itemCategoryReducer.actions
export default itemCategoryReducer.reducer