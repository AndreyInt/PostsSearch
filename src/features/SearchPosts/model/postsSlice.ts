import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {PostSchema, PostsSchema, QueryData} from "./types";
import axios from "axios";
import {__BASE_URL__} from "src/shared/constants";

const initialState: PostsSchema = {
    posts: [],
    status: null,
};

export const fetchPosts = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchPosts',
    async (query: QueryData) => {
        const response = await axios.get(`${__BASE_URL__}?q=${query.search}&_start=0&_limit=21`);
        return response.data
    }
)

export const fetchPaginationPosts = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchPaginationPosts',
    async (query: QueryData) => {
        const response = await axios.get(`${__BASE_URL__}?q=${query.search}&_start=${query.startIndex}&_limit=21`);
        return response.data
    }
)

 export const like = (post: PostSchema) => {
    if (post.isActiveLike === true) {
        post.like -= 1;
        post.isActiveLike = false;
    } else if (post.isActiveDisLike === true) {
        post.like += 1;
        post.disLike -= 1;
        post.isActiveLike = true;
        post.isActiveDisLike = false;
    } else {
        post.like += 1;
        post.isActiveLike = true;
    }
    return post
}

export const disLike = (post: PostSchema) => {
    if (post.isActiveDisLike === true) {
        post.disLike -= 1;
        post.isActiveDisLike = false;
    } else if (post.isActiveLike === true) {
        post.like -= 1;
        post.disLike += 1;
        post.isActiveLike = false;
        post.isActiveDisLike = true;
    } else {
        post.disLike += 1;
        post.isActiveDisLike = true;
    }
    return post
}

export const postsSlice = createSlice({
    name: 'getPosts',
    initialState,
    reducers: {
        like(state, action) {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload) {
                    post = like(post);
                }
                return post
            })
        },
        disLike(state, action) {
                state.posts = state.posts.map(post => {
                    if (post.id === action.payload) {
                        post = disLike(post);
                    }
                    return post
                })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state,action) => {
            state.status = 'loading';
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload.map((post:PostSchema) => {
                post.like = Math.floor(Math.random() * 50);
                post.disLike = Math.floor(Math.random() * 50);
                post.isActiveDisLike = false;
                post.isActiveLike = false;
                return post
            })
            state.status = 'resolved';
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'rejected';
        })

        builder.addCase(fetchPaginationPosts.fulfilled, (state, action) => {
            state.posts = [...state.posts, ...action.payload.map((post:PostSchema) => {
                post.like = Math.floor(Math.random() * 50);
                post.disLike = Math.floor(Math.random() * 50);
                post.isActiveDisLike = false;
                post.isActiveLike = false;
                return post
            })]
            state.status = 'resolved';
        })
    }
})
export default postsSlice.reducer