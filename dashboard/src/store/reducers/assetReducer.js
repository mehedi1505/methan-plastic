import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const asset_type_add = createAsyncThunk(
    'assets/asset_type_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-type-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_type_get = createAsyncThunk(
    'assets/asset_type_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-type-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_type_get_by_id = createAsyncThunk(
    'assets/asset_type_get_by_id',
     async (typeId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-type-get-by-id/${typeId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_type_update = createAsyncThunk(
    'assets/asset_type_update',
     async (typeInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-type-update',typeInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

//asset register

export const asset_register_add = createAsyncThunk(
    'assets/asset_register_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-register-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_register_get = createAsyncThunk(
    'assets/asset_register_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-register-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const register_get_by_id = createAsyncThunk(
    'assets/register_get_by_id',
     async (regId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/register-get-by-id/${regId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register_update = createAsyncThunk(
    'assets/register_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/register-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// asset revalue 
export const get_type_origin = createAsyncThunk(
    'assets/get_type_origin',
     async (assetId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-type-origin/${assetId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const asset_register_item_get = createAsyncThunk(
    'assets/asset_register_item_get',
     async (_,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-register-item-get`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_revalue_add = createAsyncThunk(
    'assets/asset_revalue_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-revalue-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_revalue_get = createAsyncThunk(
    'assets/asset_revalue_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-revalue-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const revalue_get_by_id = createAsyncThunk(
    'assets/revalue_get_by_id',
     async (revalueId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/revalue-get-by-id/${revalueId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const revalue_update = createAsyncThunk(
    'assets/revalue_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/revalue-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// asset depreciation 
export const asset_depreciation_add = createAsyncThunk(
    'assets/asset_depreciation_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-depreciation-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_depreciation_get = createAsyncThunk(
    'assets/asset_depreciation_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-depreciation-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const depreciation_get_by_id = createAsyncThunk(
    'assets/depreciation_get_by_id',
     async (depreciationId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/depreciation-get-by-id/${depreciationId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const depreciation_update = createAsyncThunk(
    'assets/depreciation_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/depreciation-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// asset closure 
export const asset_closure_add = createAsyncThunk(
    'assets/asset_closure_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/asset-closure-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const asset_closure_get = createAsyncThunk(
    'assets/asset_closure_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/asset-closure-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const closure_get_by_id = createAsyncThunk(
    'assets/closure_get_by_id',
     async (closureId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/closure-get-by-id/${closureId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const closure_update = createAsyncThunk(
    'assets/closure_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/closure-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const assetReducer = createSlice({
    name :'assets',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        assetTypes:[],
        assetType:"",
        totalType:0,
        assetRegisters:[],
        assetRegister:[],
        totalRegister:'',
        assetRegisterItems:[],
        assetRevalues:[],
        assetRevalue:[],
        totalRevalue:'',
        assetDepreciations:[],
        assetDepreciation:[],
        totalDepreciation:'',
        assetClosures:[],
        assetClosure:[],
        totalClosure:'',
        typeInfo:'',
        registerInfo:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [asset_type_add.pending] : (state,_)=>{
                state.loader = true
        },
        [asset_type_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [asset_type_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [asset_register_add.pending] : (state,_)=>{
            state.loader = true
        },
        [asset_register_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [asset_register_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [asset_register_item_get.fulfilled] : (state,{payload})=>{
            state.assetRegisterItems = payload.registerItem
        },
        [asset_revalue_add.pending] : (state,_)=>{
            state.loader = true
        },
        [asset_revalue_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [asset_revalue_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [asset_depreciation_add.pending] : (state,_)=>{
            state.loader = true
        },
        [asset_depreciation_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [asset_depreciation_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [asset_closure_add.pending] : (state,_)=>{
            state.loader = true
        },
        [asset_closure_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [asset_closure_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [asset_type_get.fulfilled] : (state,{payload})=>{
            state.totalType = payload.totalType
            state.assetTypes = payload.assetTypes
        },
        [asset_type_get_by_id.fulfilled] : (state,{payload})=>{
            state.assetType = payload.assetType
        },
        [asset_type_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [asset_register_get.fulfilled] : (state,{payload})=>{
            state.totalRegister = payload.totalRegister
            state.assetRegisters = payload.assetRegisters
        },
        [register_get_by_id.fulfilled] : (state,{payload})=>{
            state.assetRegister = payload.assetRegister
        },
        [register_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_type_origin.fulfilled] : (state,{payload})=>{
            state.typeInfo = payload.type
            state.registerInfo = payload.register
        },
        [asset_revalue_get.fulfilled] : (state,{payload})=>{
            state.totalRevalue = payload.totalRevalue
            state.assetRevalues = payload.assetRevalues
        },
        [revalue_get_by_id.fulfilled] : (state,{payload})=>{
            state.assetRevalue = payload.assetRevalue
            state.typeInfo = payload.type
        },
        [revalue_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [asset_depreciation_get.fulfilled] : (state,{payload})=>{
            state.totalDepreciation = payload.totalDepreciation
            state.assetDepreciations = payload.assetDepreciations
        },
        [depreciation_get_by_id.fulfilled] : (state,{payload})=>{
            state.assetDepreciation = payload.assetDepreciation
            state.typeInfo = payload.type
        },
        [depreciation_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [asset_closure_get.fulfilled] : (state,{payload})=>{
            state.totalClosure = payload.totalClosure
            state.assetClosures = payload.assetClosures
        },
        [closure_get_by_id.fulfilled] : (state,{payload})=>{
            state.assetClosure = payload.assetClosure
        },
        [closure_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
    }
})
export const { messageClear } = assetReducer.actions
export default assetReducer.reducer