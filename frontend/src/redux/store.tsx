import {configureStore} from '@reduxjs/toolkit'

// Importing Slices
import counterSlice from '@/redux/slices/counterSlice'

export const store = configureStore({
	reducer: {
		counter: counterSlice
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
