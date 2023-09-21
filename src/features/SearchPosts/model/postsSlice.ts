import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PostSchema, PostsSchema, QueryData, ReactionReducerActions, Reactions} from "./types";
import axios from "axios";
import {__BASE_URL__} from "src/shared/constants";

const initialState: PostsSchema = {
    posts: [],
    statusFetchPosts: null,
    statusFetchPost: null,
};

export const fetchPosts = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchPosts',
    async (query: QueryData) => {
        let response = null;
        if (query.isPaginationFetch)
            response = await axios.get(`${__BASE_URL__}?q=${query.search}&_start=${query.startIndex}&_limit=21`);
        else {
            response = await axios.get(`${__BASE_URL__}?q=${query.search}&_start=0&_limit=21`);
        }
        return {response: response.data,
            isPaginationFetch: query.isPaginationFetch}
    }
)

export const fetchPost = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchPost',
    async (postId: string) => {
        const response = await axios.get<PostSchema>(`${__BASE_URL__}/${postId}`);
        return response.data
    }
)

export const setReaction = (post: PostSchema, reaction: Reactions) => {
    const prevReaction = post.reaction;
    if (prevReaction === null) {
        post[reaction]++;
        post.reaction = reaction;
    } else if (prevReaction === reaction) {
        post[reaction]--;
        post.reaction = null;
    } else {
        post[prevReaction]--;
        post[reaction]++;
        post.reaction = reaction;
    }
    return post
}

export const postsSlice = createSlice({
    name: 'getPosts',
    initialState,
    reducers: {
        reactionReducer(state, action: PayloadAction<ReactionReducerActions>) {
            state.posts = state.posts.map(post => {
                console.log('action.payload', action.payload, 'post.id', post.id)
                if (post.id === action.payload.postId) {
                    console.log('action.payload', action.payload, 'post.id', post.id)
                    post = setReaction(post, action.payload.reaction);
                }
                return post
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state,action) => {
            state.statusFetchPosts = 'loading';
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
        if (!action.payload.isPaginationFetch)
            state.posts = [];
        state.posts = [...state.posts, ...action.payload.response.map((post:PostSchema) => {
            post.like = Math.floor(Math.random() * 50);
            post.disLike = Math.floor(Math.random() * 50);
            return post})]
        state.statusFetchPosts = 'resolved';
        })

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.statusFetchPosts = 'rejected';
        })

        builder.addCase(fetchPost.pending, (state,action) => {
            state.statusFetchPost = 'loading';
        })

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            action.payload.like = Math.floor(Math.random() * 50);
            action.payload.disLike = Math.floor(Math.random() * 50);
            state.posts = [action.payload];
            state.statusFetchPost = 'resolved';
        })

        builder.addCase(fetchPost.rejected, (state, action) => {
            state.statusFetchPost = 'rejected';
        })
    }
})
export default postsSlice.reducer