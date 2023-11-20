import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const product_add = createAsyncThunk(
    'products/product_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/product-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const products_get = createAsyncThunk(
    'products/products_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/products-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_product_by_id = createAsyncThunk(
    'products/get_product_by_id',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-product-by-id/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const product_update = createAsyncThunk(
    'products/product_update',
     async (productInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/product-update',productInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const productReducer = createSlice({
    name :'products',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        products:[],
        product:'',
        totalProduct:0,
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [product_add.pending] : (state,_)=>{
                state.loader = true
        },
        [product_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [product_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [products_get.fulfilled] : (state,{payload})=>{
            state.totalProduct = payload.totalProduct
            state.products = payload.products
        },
        [get_product_by_id.fulfilled] : (state,{payload})=>{
            state.product = payload.product
        },
        [product_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        
    }
})
export const { messageClear } = productReducer.actions
export default productReducer.reducer