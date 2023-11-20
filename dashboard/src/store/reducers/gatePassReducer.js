import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const gate_pass_type_add = createAsyncThunk(
    'gatePass/gate_pass_type_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/gate-pass-type-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_gate_pass_type = createAsyncThunk(
    'gatePass/get_all_gate_pass_type',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-all-gate-pass-type?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_gate_pass_type_by_id = createAsyncThunk(
    'gatePass/get_gate_pass_type_by_id',
     async (gatePassId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-gate-pass-type-by-id/${gatePassId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gate_pass_type_update = createAsyncThunk(
    'gatePass/gate_pass_type_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/gate-pass-type-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const gate_pass_type_delete = createAsyncThunk(
    'gatePass/gate_pass_type_delete',
    async (gatePassId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/gate-pass-type-delete/${gatePassId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_agents = createAsyncThunk(
    'gatePass/get_agents',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-agents',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_customers = createAsyncThunk(
    'gatePass/get_customers',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-customers',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_gp_types = createAsyncThunk(
    'gatePass/get_gp_types',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-gp-types',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_terms = createAsyncThunk(
    'gatePass/get_terms',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-terms',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// export const get_product_info = createAsyncThunk(
//     'gatePass/get_product_info',
//      async (productId,{rejectWithValue,fulfillWithValue})=>{
//         try {
//             const { data } = await api.get(`/get-product-info/${productId}`,{withCredentials:true})
//            return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
export const get_products = createAsyncThunk(
    'gatePass/get_products',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-products',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gate_pass_products_get = createAsyncThunk(
    'gatePass/gate_pass_products_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/gate-pass-products-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gate_pass_add = createAsyncThunk(
    'gatePass/gate_pass_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/gate-pass-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const last_gate_pass_number_show = createAsyncThunk(
    'gatePass/last_gate_pass_number_show',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/last-gate-pass-number-show',{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_product_info = createAsyncThunk(
    'gatePass/get_product_info',
     async (productId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-product-info/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const show_gate_pass_product_details = createAsyncThunk(
    'gatePass/show_gate_pass_product_details',
     async (gpNumber,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/show-gate-pass-product-details/${gpNumber}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const g_pass_product_details_item_delete = createAsyncThunk(
    'gatePass/g_pass_product_details_item_delete',
     async ({gpId,productId},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.delete(`/g-pass-product-details-item-delete/${gpId}/${productId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gp_get_by_id = createAsyncThunk(
    'gatePass/gp_get_by_id',
     async (gatePassId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/gp-get-by-id/${gatePassId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gp_info_update = createAsyncThunk(
    'gatePass/gp_info_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post(`/gp-info-update`,info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const gatePassReducer = createSlice({
    name :'gatePass',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        agents:[],
        customers:[],
        terms:[],
        gpTypes:[],
        products:[],
        gatePassTypes:[],
        gatePassType:'',
        totalGatePassType:'',
        gatePasses:[],
        gatePass:'',
        totalGatePass:0,
        gatePassProducts:[],
        lastGatePassNumberShow:[],
        productInfo:'',
        gatePassProductDetails:[],
        productTotalPerGatePass:[],
        editGpInfo:''

    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [gate_pass_type_add.pending] : (state,_)=>{
                state.loader = true
        },
        [gate_pass_type_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [gate_pass_type_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_all_gate_pass_type.fulfilled] : (state,{payload})=>{
            state.totalGatePassType = payload.totalGatePassType
            state.gatePassTypes = payload.gatePassTypes
        },
        [get_gate_pass_type_by_id.fulfilled] : (state,{payload})=>{
            state.gatePassType = payload.gatePassType
        },
        [gate_pass_type_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [gate_pass_type_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_customers.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [get_agents.fulfilled] : (state,{payload})=>{
            state.agents = payload.agents
        },
        [get_terms.fulfilled] : (state,{payload})=>{
            state.terms = payload.terms
        },
        [get_products.fulfilled] : (state,{payload})=>{
            state.products = payload.products
        },
        [get_gp_types.fulfilled] : (state,{payload})=>{
            state.gpTypes = payload.gpTypes
        },
        [gate_pass_products_get.fulfilled] : (state,{payload})=>{
            state.gatePassProducts = payload.gatePassProducts
            state.totalGatePass = payload.totalGatePass
        },
        [last_gate_pass_number_show.fulfilled] : (state,{payload})=>{
            state.lastGatePassNumberShow = payload.lastGatePassNumberShow
        },
        [get_product_info.fulfilled] : (state,{payload})=>{
            state.productInfo = payload.productInfo
        },
        [show_gate_pass_product_details.fulfilled] : (state,{payload})=>{
            state.gatePassProductDetails = payload.gatePassProductDetails
            state.productTotalPerGatePass = payload.productTotalPerGatePass
        },
        [gate_pass_add.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [g_pass_product_details_item_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [gp_get_by_id.fulfilled] : (state,{payload})=>{
            state.editGpInfo = payload.editGpInfo
        },
        [gp_info_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
    }
})
export const { messageClear } = gatePassReducer.actions
export default gatePassReducer.reducer