import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
import jwt from 'jwt-decode'

export const admin_login = createAsyncThunk(
    'auth/admin_login',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/admin-login',info,{withCredentials:true})
            localStorage.setItem('accessToken',data.token)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const admin_logout = createAsyncThunk(
    'auth/admin_logout',
     async ({role,navigate},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/admin-logout',{withCredentials:true})
            localStorage.removeItem('accessToken')
            if(role === "admin"){
                navigate("/admin/login")
            }

           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const sub_admin_login = createAsyncThunk(
    'auth/sub_admin_login',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/sub-admin-login',info,{withCredentials:true})
            localStorage.setItem('accessToken',data.token)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const sub_admin_register = createAsyncThunk(
    'auth/sub_admin_register',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/sub-admin-register',info,{withCredentials:true})
            localStorage.setItem('accessToken',data.token)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
     async ( _,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get('/get-user-info',{withCredentials:true})
            // console.log(data)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
     async ( image,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/profile-image-upload',image,{withCredentials:true})
            // console.log(data)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
     async ( info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/profile-info-add',info,{withCredentials:true})
            // console.log(data)
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const returnRole = (token)=>{
    if(token){
        const decodeToken = jwt(token)
        const expireTime = new Date(decodeToken.exp * 1000)
        if(new Date() > expireTime){
            localStorage.removeItem('accessToken')
            return ''
        }else{
            return decodeToken.role
        }
    }else{
        return ''
    }
}

export const authReducer = createSlice({
    name :'auth',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        userInfo:'',
        role:returnRole(localStorage.getItem('accessToken')),
        token:localStorage.getItem('accessToken')
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        },
        userInfoClear:(state,_)=>{
            state.userInfo=''
        }
    },
    extraReducers:{
        [admin_login.pending] : (state,_)=>{
            state.loader = true
        },
        [admin_login.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [admin_login.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.success
            state.Token = payload.token
            state.role = returnRole(payload.token)
        },
        [sub_admin_login.pending] : (state,_)=>{
            state.loader = true
        },
        [sub_admin_login.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [sub_admin_login.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.success
            state.Token = payload.token
            state.role = returnRole(payload.token)
        },
        [sub_admin_register.pending] : (state,_)=>{
            state.loader = true
        },
        [sub_admin_register.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [sub_admin_register.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.success
            state.Token = payload.token
            state.role = returnRole(payload.token)
        },
        [get_user_info.fulfilled]: (state,{payload})=>{
            state.loader = false
            state.userInfo = payload.userInfo
        },
        [profile_image_upload.pending] : (state,_)=>{
            state.loader = true
        },
        [profile_image_upload.fulfilled]: (state,{payload})=>{
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.success
            state.errorMessage = payload.error
        },
        [profile_info_add.pending] : (state,_)=>{
            state.loader = true
        },
        [profile_info_add.fulfilled]: (state,{payload})=>{
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.success
            state.errorMessage = payload.error
        },
        [admin_logout.fulfilled]: (state,{payload})=>{
            state.successMessage = payload.success
        }
    }
})
export const { messageClear,userInfoClear } = authReducer.actions
export default authReducer.reducer