import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./slices/notification.slice"
import postsReducer from './slices/posts.slice'
import inviteReducer from './slices/invite.slice'

export const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
        posts: postsReducer,
        invite: inviteReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;