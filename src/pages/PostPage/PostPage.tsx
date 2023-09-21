import cls from './PostPage.module.scss'
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "src/shared/lib/redux/redux";
import {useEffect} from "react";
import {PostSchema, PostsSchema} from "src/features/SearchPosts/model/types";
import {Loading} from "src/shared/ui/loading/Loading";
import backPng from 'src/shared/assets/back.png';
import cardImg from 'src/shared/assets/FirstPostPhoto.png';
import {ButtonReaction} from "src/shared/ui/ButtonReaction/ButtonReaction";
import {fetchPost, postsSlice} from "src/features/SearchPosts/model/postsSlice";
import likeActiveImg from 'src/shared/assets/likeActive.png';
import likeImg from 'src/shared/assets/like.png';
import disLikeActiveImg from 'src/shared/assets/disLikeActive.png';
import disLikeImg from 'src/shared/assets/disLikeInactive.png';
export const PostPage = () => {


    const {postId} = useParams();
    const postsInfo = useAppSelector(state => state.postsReducer);
    const {reactionReducer} = postsSlice.actions;
    const dispatch = useAppDispatch();

    const findPostInStore = (postsInfo: PostsSchema, postId: string): PostSchema | undefined => {
        if (postsInfo?.posts?.length > 0 ) {
            return postsInfo.posts.find(post => post.id === +postId);
        }
        return undefined
    }

    const postInStore = findPostInStore(postsInfo, postId);

    useEffect(() => {
        if (!postInStore) {
            dispatch(fetchPost(postId))
        }
    }, [])

    return (
        <div className={cls.postPage}>
            {!postInStore || postsInfo.statusFetchPost === 'loading'
                ? <Loading/>
                : (postsInfo?.posts)
                    ? postsInfo?.posts.map( post => {
                            if (post.id === +postId) {
                                return <>
                                    <div key={post.id} className={cls.headerContainer}>
                                        <Link className={cls.linkContainer} to={'/'}>
                                            <img src={backPng} className={cls.linkImg} alt={'назад'}/>
                                            <div className={cls.linkText}>Вернуться к статьям</div>
                                        </Link>
                                        <div className={cls.likeContainer}>
                                            <ButtonReaction onClick={() => dispatch(reactionReducer({postId: post.id, reaction: 'like'}))} likes={post.like} reactionActiveImg={likeActiveImg} reactionImg={likeImg} isActive={post.reaction === 'like'}/>
                                            <ButtonReaction onClick={() => dispatch(reactionReducer({postId: post.id, reaction: 'disLike'}))} likes={post.disLike} reactionActiveImg={disLikeActiveImg} reactionImg={disLikeImg} isActive={post.reaction ==='disLike'}/>
                                        </div>
                                    </div>
                                    <h1 className={cls.title}>{post.title}</h1>
                                    <div className={cls.bodyContainer}>
                                        <img className={cls.bodyImg} src={cardImg} alt={'фото'}/>
                                        <p className={cls.body}>{post.body}</p>
                                    </div>
                                </>
                            }
                            return null
                        })
                    : <div>Произошла ошибка при загрузке</div>}
        </div>
    );
};