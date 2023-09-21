export interface PostsSchema {
    posts: PostSchema[],
    statusFetchPosts: 'loading' | 'resolved' | 'rejected',
    statusFetchPost: 'loading' | 'resolved' | 'rejected'
}

export type Reactions = 'like' | 'disLike' | null
export interface PostSchema {
    userId: number,
    id: number,
    title: string,
    body: string,
    like?: number,
    disLike?: number,
    reaction: Reactions,

}

export interface QueryData {
    search: string,
    startIndex?: number,
    isPaginationFetch: boolean,
}

export interface ReactionReducerActions {
    postId: number,
    reaction: Reactions
}