import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const employee_type_add = createAsyncThunk(
    'payrolls/employee_type_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/emp-type-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const leave_create = createAsyncThunk(
    'payrolls/leave_create',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/leave-create',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const leave_update = createAsyncThunk(
    'payrolls/leave_update',
     async (leaveInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/leave-update',leaveInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const employee_type_get = createAsyncThunk(
    'payrolls/employee_type_get',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/employee-type-get?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_emp_type_by_id = createAsyncThunk(
    'payrolls/get_emp_type_by_id',
     async (empTypeId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-emp-type-by-id/${empTypeId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const employee_type_update = createAsyncThunk(
    'payrolls/employee_type_update',
     async (empInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/emp-type-update',empInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const employee_update = createAsyncThunk(
    'payrolls/employee_update',
     async (empInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/emp-update',empInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const employee_add = createAsyncThunk(
    'payrolls/employee_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/employee-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const pay_slip_create = createAsyncThunk(
    'payrolls/pay_slip_create',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/pay-slip-create',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
            // return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_employee = createAsyncThunk(
    'payrolls/get_all_employee',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-all-employee?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_pay_slip = createAsyncThunk(
    'payrolls/get-all-pay-slip',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-all-pay-slip?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_leave_employees = createAsyncThunk(
    'payrolls/get_leave_employees',
     async (_,{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-leave-employees`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_pay_employees = createAsyncThunk(
    'payrolls/get_pay_employees',
     async (_,{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-pay-employees`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_employee_name_by_id = createAsyncThunk(
    'payrolls/get_employee_name_by_id',
     async (empId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-employee-name-by-id/${empId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_emp_info_by_id = createAsyncThunk(
    'payrolls/get_emp_info_by_id',
     async (empId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-emp-info-by-id/${empId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_leave = createAsyncThunk(
    'payrolls/get_all_leave',
     async ({searchValue},{rejectWithValue,fulfillWithValue}) => {
        try {
            const { data } = await api.get(`/get-all-leave?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const pay_slip_delete = createAsyncThunk(
    'payrolls/pay_slip_delete',
    async (paySlipId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/pay-slip-delete/${paySlipId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const leave_delete = createAsyncThunk(
    'payrolls/leave_delete',
    async (leaveId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/leave-delete/${leaveId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_employee_by_id = createAsyncThunk(
    'payrolls/get_employee_by_id',
    async (empId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/get-employee-by-id/${empId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_leave_edit_by_id = createAsyncThunk(
    'payrolls/get_leave_edit_by_id',
    async (empLeaveId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/get-leave-edit-by-id/${empLeaveId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const pay_slip_view_by_id = createAsyncThunk(
    'payrolls/pay_slip_view_by_id',
    async (paySlipId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/pay-slip-view-by-id/${paySlipId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_pay_slip_edit_info_by_id = createAsyncThunk(
    'payrolls/get_pay_slip_edit_info_by_id',
    async (paySlipId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/get-pay-slip-edit-info-by-id/${paySlipId}`,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const pay_slip_update = createAsyncThunk(
    'payrolls/pay_slip_update',
     async (paySlipEditInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/pay-slip-update',paySlipEditInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const payrollReducer = createSlice({
    name :'payrolls',
    initialState:{
        successMessage:'',
        errorMessage:'',
        errorValidation:{},
        loader:false,
        empTypes:[],
        empType:'',
        employees:[],
        employee:"",
        leaveEmployees:[],
        payEmployees:[],
        empName:'',
        leaves:[],
        empInfo:'',
        totalEmployee:0,
        paySlips:[],
        totalPaySlip:0,
        empEditInfo:'',
        empLeaveEditInfo:'',
        paySlipInfo:'',
        paySlipEditInfo:''
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
            state.errorValidation=''
        }
    },
    extraReducers:{
        [employee_type_add.pending] : (state,_)=>{
            state.loader = true
        },
        [employee_type_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [employee_type_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [employee_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorValidation = payload.error
        },
        [employee_update.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorValidation = payload.error
        },
        [employee_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
        },
        [employee_type_get.fulfilled] : (state,{payload})=>{
            state.totalType = payload.totalType
            state.empTypes = payload.empTypes
        },
        [get_emp_type_by_id.fulfilled] : (state,{payload})=>{
            state.empType = payload.empType
        },
        [employee_type_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [employee_add.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_all_employee.fulfilled] : (state,{payload})=>{
            state.employees = payload.employees
            state.totalEmployee = payload.totalEmployee
        },
        [get_leave_employees.fulfilled] : (state,{payload})=>{
            state.leaveEmployees = payload.leaveEmployees
        },
        [get_pay_employees.fulfilled] : (state,{payload})=>{
            state.payEmployees = payload.payEmployees
        },
        [get_employee_name_by_id.fulfilled] : (state,{payload})=>{
            state.empName = payload.empName
        },
        [get_all_leave.fulfilled] : (state,{payload})=>{
            state.leaves = payload.leaves
        },
        [leave_create.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_emp_info_by_id.fulfilled] : (state,{payload})=>{
            state.empInfo = payload.empInfo
        },
        [pay_slip_create.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_all_pay_slip.fulfilled] : (state,{payload})=>{
            state.paySlips = payload.paySlips
            state.totalPaySlip = payload.totalPaySlip
        },
        [pay_slip_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_employee_by_id.fulfilled] : (state,{payload})=>{
            state.empEditInfo = payload.empEditInfo
        },
        [employee_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [get_leave_edit_by_id.fulfilled] : (state,{payload})=>{
            state.empLeaveEditInfo = payload.empLeaveEditInfo
        },
        [leave_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [leave_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [pay_slip_view_by_id.fulfilled] : (state,{payload})=>{
            state.paySlipInfo = payload.paySlipInfo
        },
        [get_pay_slip_edit_info_by_id.fulfilled] : (state,{payload})=>{
            state.paySlipEditInfo = payload.paySlipEditInfo
        },
        [pay_slip_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
    }
})
export const { messageClear } = payrollReducer.actions
export default payrollReducer.reducer