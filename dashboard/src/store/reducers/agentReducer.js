import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

export const agent_add = createAsyncThunk(
    'agents/agent_add',
     async (info,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/agent-add',info,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_agent = createAsyncThunk(
    'agents/get_agent',
     async ({searchValue},{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-agent?searchValue=${searchValue}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_agent_by_id = createAsyncThunk(
    'agents/get_agent_by_id',
     async (agentId,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.get(`/get-agent-by-id/${agentId}`,{withCredentials:true})
           return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const agent_update = createAsyncThunk(
    'agents/agent_update',
     async (agentInfo,{rejectWithValue,fulfillWithValue})=>{
        try {
            const { data } = await api.post('/agent-update',agentInfo,{withCredentials:true})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const agent_delete = createAsyncThunk(
    'agents/agent_delete',
    async (agent_id, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {data} = await api.delete(`/agent-delete/${agent_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const agentReducer = createSlice({
    name :'agents',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        agents:[],
        agent:'',
        totalAgent:0
    },
    reducers:{
        messageClear: (state,_)=>{
            state.errorMessage=''
            state.successMessage=''
        }
    },
    extraReducers:{
        [agent_add.pending] : (state,_)=>{
                state.loader = true
        },
        [agent_add.rejected] : (state,{payload})=>{
            state.loader = false
            state.errorMessage = payload.error
        },
        [agent_add.fulfilled] : (state,{payload})=>{
            state.loader = false
            state.successMessage = payload.message
            state.errorMessage = payload.error
        },
        [get_agent.fulfilled] : (state,{payload})=>{
            state.totalAgent = payload.totalAgent
            state.agents = payload.agents
        },
        [get_agent_by_id.fulfilled] : (state,{payload})=>{
            state.agent = payload.agent
        },
        [agent_update.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        },
        [agent_delete.fulfilled] : (state,{payload})=>{
            state.successMessage = payload.message
        }
    }
})
export const { messageClear } = agentReducer.actions
export default agentReducer.reducer