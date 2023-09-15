export interface PostsSchema {
    posts: PostSchema[],
    status: 'loading' | 'resolved' | 'rejected',
}

export interface PostSchema {
    userId: number,
    id: number,
    title: string,
    body: string,
    like?: number,
    disLike?: number,
    isActiveDisLike?: boolean,
    isActiveLike?: boolean,

}

export interface QueryData {
    search: string,
    startIndex?: number,
}