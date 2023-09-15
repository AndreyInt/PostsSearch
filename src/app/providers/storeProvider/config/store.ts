import {combineReducers, configureStore} from '@reduxjs/toolkit'
import  postsReducer from 'src/features/SearchPosts/model/postsSlice'

const rootReducer = combineReducers({
    postsReducer,
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
