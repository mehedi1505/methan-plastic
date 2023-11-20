import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_customer = createAsyncThunk(
    'expenses/get_customer',
     async (_,{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-customer`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_expense_category = createAsyncThunk(
    'expenses/get_expense_category',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-expense-category?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_payment_mode = createAsyncThunk(
    'expenses/get_payment_mode',
     async (_,{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-payment-mode`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_category_add = createAsyncThunk(
    'expenses/expense_category_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/expense-category-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_add = createAsyncThunk(
    'expenses/expense_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        console.log(info)
        try {
            const { data } = await api.post('/expense-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_expense = createAsyncThunk(
    'expenses/get_expense',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-expense?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_category_by_id = createAsyncThunk(
    'expenses/get_category_by_id',
     async (catId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/category-get-by-id/${catId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_category_update = createAsyncThunk(
    'expenses/expense_category_update',
     async (Info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/expense-category-update',Info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const delete_expense_category = createAsyncThunk(
    'expenses/delete_expense_category',
    async (cat_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/expense-category-delete/${cat_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_delete = createAsyncThunk(
    'expenses/expense_delete',
    async (exp_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/expense-delete/${exp_id}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_get_by_id = createAsyncThunk(
    'expenses/expense_get_by_id',
     async (expId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/expense-get-by-id/${expId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expense_update = createAsyncThunk(
    'expenses/expense_update',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/expense-update',info,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const expenseReducer = createSlice({
    name :'expenses',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        expenseCategories:[],
        customers:[],
        paymentModes:[],
        expenses:[],
        expense:'',
        totalExpenses:0,
        totalCategory:0       
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [expense_category_add.pending] : (state,_)=>{
                state.loader = true
        },
        [expense_category_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [expense_category_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [expense_add.pending] : (state,_)=>{
            state.loader = true
        },
        [expense_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [expense_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [get_expense.fulfilled] : (state,{payload})=>{
            state.totalExpenses = payload.totalExpenses
            state.expenses = payload.expenses
        },
        [get_customer.fulfilled] : (state,{payload})=>{
            state.customers = payload.customers
        },
        [get_expense_category.fulfilled] : (state,{payload})=>{
            state.expenseCategories = payload.expenseCategories
            state.totalCategory = payload.totalCategory
        },
        [get_payment_mode.fulfilled] : (state,{payload})=>{
            state.paymentModes = payload.paymentModes
        },
        [get_category_by_id.fulfilled] : (state,{payload})=>{
            state.expenseCategory = payload.expenseCategory
        },
        [expense_get_by_id.fulfilled] : (state,{payload})=>{
            state.expense = payload.expense
        },
        [expense_category_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [expense_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [delete_expense_category.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [expense_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = expenseReducer.actions
export default expenseReducer.reducer