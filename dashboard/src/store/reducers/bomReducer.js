import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_product = createAsyncThunk(
    'boms/get_product',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-product',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_product_name_by_id = createAsyncThunk(
    'boms/get_product_name_by_id',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-product-name-by-id/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_items = createAsyncThunk(
    'boms/get_items',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-items',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_unit_item_name = createAsyncThunk(
    'boms/get_unit_item_name',
     async (itemId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-unit-item-name/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bom_add = createAsyncThunk(
    'boms/bom_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/bom-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const boms_get = createAsyncThunk(
    'boms/boms_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/boms-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bom_details_get = createAsyncThunk(
    'boms/bom_details_get',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/bom-details-get/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const bom_delete = createAsyncThunk(
    'boms/bom_delete',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/bom-delete/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bom_details_item_delete = createAsyncThunk(
    'boms/bom_details_item_delete',
     async ({productId,itemId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/bom-details-item-delete/${productId}/${itemId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const spl_product_add = createAsyncThunk(
    'boms/spl_product_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/spl-product-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const bomReducer = createSlice({
    name :'boms',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        products:[],
        items:[],
        itemName:'',
        boms:[],
        bom:"",
        itemUnit:[],
        bomDetails:[],
        totalBom:0,
        productName:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [bom_add.pending] : (state,_)=>{
                state.loader = true
        },
        [bom_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.message
        },
        [bom_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message           
            state.errorMessage = payload.error           
        },
        [get_product.fulfilled] : (state,{payload})=>{
            state.products = payload.products
        },
        [get_product_name_by_id.fulfilled] : (state,{payload})=>{
            state.productName = payload.productName
        },
        [get_items.fulfilled] : (state,{payload})=>{
            state.items = payload.items
        },
        [bom_details_get.fulfilled] : (state,{payload})=>{
            state.bomDetails = payload.bomDetails
        },
        [get_unit_item_name.fulfilled] : (state,{payload})=>{
            state.itemUnit = payload.itemUnit
            state.itemName = payload.itemName
        },
        [bom_details_item_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [boms_get.fulfilled] : (state,{payload})=>{
            state.totalBom = payload.totalBom
            state.boms = payload.boms
        },
        [bom_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [spl_product_add.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
            state.errorMessage = payload.error
        }
    }
})
export const { messageClear } = bomReducer.actions
export default bomReducer.reducer