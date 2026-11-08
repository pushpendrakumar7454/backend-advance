import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/state/authUser'
import postReducer from '../features/posts/state/postSlice'
import storyReducer from '../features/story/state/stoySlic'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        story: storyReducer
    }

})