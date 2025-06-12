import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications, updateNotifications } from "../../pb";

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (id:string) => {
    const res = await getNotifications(id);
    return res
})

export const updateNotification = createAsyncThunk('notifications/update', async (id:string) =>{
    const res = await updateNotifications(id)
    return res
} )

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: [],
        status: 'idle',
        loading: false
    },
    reducers: {

    },
    extraReducers:(builder)=>{
        //fetch
        builder.addCase(fetchNotifications.pending,(state) => {
            state.status = 'loading'
        }).addCase(fetchNotifications.fulfilled, (state, action) => {
            state.status = "seccess",
            //@ts-expect-error
            state.items = action.payload
        }).addCase(fetchNotifications.rejected, (state) => {
            state.status = "failed"
        })
        //update
        builder.addCase(updateNotification.pending, (state) => {
            state.loading = true
        }).addCase(updateNotification.fulfilled, (state, action) => {
            state.loading = false

            const index = state.items.findIndex(
                (item:any) => item.id === action.payload.id
            )
            //@ts-expect-error
            state.items[index] = action.payload
        }).addCase(updateNotification.rejected, (state) => {
            state.loading = false
        })
    }
})

export default notificationSlice.reducer