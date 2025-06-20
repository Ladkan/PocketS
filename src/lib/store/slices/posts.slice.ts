import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, getPosts } from "../../pb";

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    const res = await getPosts()
    return res
})

export const createPosts = createAsyncThunk('posts/create', async (data:any) => {
    const res = await createPost(data)
    return res
})

export const deletePosts = createAsyncThunk("posts/delete", async (id:string) => {
    const res = await deletePost(id)
    return id
})

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {

    },
    extraReducers:(builder) => {
        //fetch
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled, (state, actions) => {
            state.status = "success",
            state.items = actions.payload
        }).addCase(fetchPosts.rejected, (state) => {
            state.status = "failed"
        })
        //create
        builder.addCase(createPosts.pending, (state) => {
            state.status = 'loading'
        }).addCase(createPosts.fulfilled, (state, actions) => {
            state.status = 'idle'
        }).addCase(createPosts.rejected, (state) => {
            state.status = 'failed'
        })
        //delete
        builder.addCase(deletePosts.pending, (state) => {
            state.status = 'loading'
        }).addCase(deletePosts.fulfilled, (state, action) => {
            state.items = state.items.filter(item=>item.id!==action.payload),
            state.status = 'success'
        }).addCase(deletePosts.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default postsSlice.reducer