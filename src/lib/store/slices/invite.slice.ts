import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCode, getInviteCodeByUser } from "../../pb";

export const fetchInviteCode = createAsyncThunk('invite/fetch', async (id:string) => {
    const res = await getInviteCodeByUser(id)
    return res
})

export const createInviteCode = createAsyncThunk("invite/create", async (id:string) => {
    const res = await createCode(id)
    return res
})

const inviteSlice = createSlice({
    name:"invite",
    initialState: {
        id: '',
        createdBy: '',
        active: true,
        expiration: '',
        created: '',
        status: 'idle'
    },
    reducers: {

    },
    extraReducers:(builder) => {
        //fetch
        builder.addCase(fetchInviteCode.pending, (state) => {
            state.status = 'loading'
            state.id = 'NaN'
        }).addCase(fetchInviteCode.fulfilled, (state, action) => {
            state.status = 'success',
            state.id = action.payload.items[0].id,
            state.createdBy = action.payload.items[0].created_by,
            state.active = action.payload.items[0].active,
            state.expiration = action.payload.items[0].expiration,
            state.created = action.payload.items[0].created
        }).addCase(fetchInviteCode.rejected, (state) => {
            state.status = "failed"
        })
        //create
        builder.addCase(createInviteCode.pending, (state) => {
            state.status = 'loading'
        }).addCase(createInviteCode.fulfilled, (state, action) => {
            state.status = 'success'
        }).addCase(createInviteCode.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default inviteSlice.reducer