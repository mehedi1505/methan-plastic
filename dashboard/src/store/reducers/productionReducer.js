import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_products = createAsyncThunk(
    'productions/get_products',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-products',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const last_batch_number = createAsyncThunk(
    'productions/last_batch_number',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-batch-number',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const show_product_name_by_id = createAsyncThunk(
    'productions/show_product_name_by_id',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-product-name-by-id/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_bom_items = createAsyncThunk(
    'productions/get_bom_items',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-bom-items/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const show_product_price_by_id = createAsyncThunk(
    'productions/show_product_price_by_id',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-product-price-by-id/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_bom_by_id = createAsyncThunk(
    'productions/get_bom_by_id',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-bom-by-id/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const production_add = createAsyncThunk(
    'productions/production_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/production-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const show_item_details = createAsyncThunk(
//     'receives/show_item_details',
//      async (receiveId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/show-item-details/${receiveId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_all_production = createAsyncThunk(
    'productions/get_all_production',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-all-production?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_production_by_id = createAsyncThunk(
    'productions/get_production_by_id',
     async (productionId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-production-by-id/${productionId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const receive_details_item_delete = createAsyncThunk(
//     'receives/receive_details_item_delete',
//      async ({invoiceId,itemId},{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.delete(`/receive-details-item-delete/${invoiceId}/${itemId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const production_update = createAsyncThunk(
    'productions/production_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/production-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const production_delete = createAsyncThunk(
    'productions/production_delete',
     async (productionId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/production-delete/${productionId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const productionReducer = createSlice({
    name :'productions',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        bomItems:[],
        itemInfo:[],
        itemName:'',
        products:[],
        production:'',
        allProductions:[],
        totalProduction:0,
        unit:[],
        totalReceiveItem:0,
        lastBatchNumber:'',
        showPrice:'',
        productName:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [production_add.pending] : (state,_)=>{
            state.loader = true
        },
        [production_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [production_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message           
            state.errorMessage = payload.error           
        },
        [get_products.fulfilled] : (state,{payload})=>{
            state.products = payload.products
        },
        [show_product_price_by_id.fulfilled] : (state,{payload})=>{
            state.showPrice = payload.showPrice
        },
        [get_bom_items.fulfilled] : (state,{payload})=>{
            state.bomItems = payload.bomItems
        },
        [get_bom_by_id.fulfilled] : (state,{payload})=>{
            state.bomItems = payload.bomItems
        },

        [last_batch_number.fulfilled] : (state,{payload})=>{
            state.lastBatchNumber = payload.lastBatchNumber
        },
        [show_product_name_by_id.fulfilled] : (state,{payload})=>{
            state.productName = payload.productName
        },
        [get_all_production.fulfilled] : (state,{payload})=>{
            state.allProductions = payload.allProductions
            state.totalProduction = payload.totalProduction
        },
        [production_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_production_by_id.fulfilled] : (state,{payload})=>{
            state.production = payload.production
        },
        [production_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
    
})
export const { messageClear } = productionReducer.actions
export default productionReducer.reducer