import cls from './PostPage.module.scss'
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "src/shared/lib/redux/redux";
import {useEffect, useState} from "react";
import {PostSchema, PostsSchema} from "src/features/SearchPosts/model/types";
import axios from "axios";
import {__BASE_URL__} from "src/shared/constants";
import {disLike as disLikeLocal, like as likeLocal, postsSlice} from "src/features/SearchPosts/model/postsSlice"
import {Loading} from "src/shared/ui/loading/Loading";
import backPng from 'src/shared/assets/back.png';
import cardImg from 'src/shared/assets/FirstPostPhoto.png';
import {ButtonLike} from "src/shared/ui/ButtonLike/ButtonLike";
import {ButtonDisLike} from "src/shared/ui/ButtonDisLike/ButtonDisLike";

export const PostPage = () => {

    const {postId} = useParams();
    const postsInfo = useAppSelector(state => state.postsReducer) // для проверки состояния лайка/дизлайка (на случай если на странице поиска пользователь его поставил).
    // Можно было и полностью посты подгружать из store, однако учтем, что пользователь может перейти по ссылке ведущей на страницу конкретного поста из вне (просто введя ссылку) и тогда при подгрузке в store ничего не будет.
    // В полноценном проекте, когда реакции пользователя хранятся в бд их можно запросить с фронтенда такой костыль использовать не пришлось бы.
    const [isLoading, setIsLoading] = useState(false);
    const {disLike, like} = postsSlice.actions;
    const [isPostInStore, setIsPostInStore] = useState(false);
    const [post, setPost] = useState<PostSchema>(null);
    const dispatch = useAppDispatch();


    const findPost = (posts: PostsSchema, postId: string): PostSchema | undefined => {
        if (postsInfo?.posts?.length > 0 ) {
            return postsInfo.posts.find(post => post.id === +postId);
        }
        return undefined
    }

    const postStore = findPost(postsInfo, postId);

    useEffect(() => {
        if (postStore) {// в таком случае пост был найден в store и значения реакций будут браться там и работать будем с ними тоже глобально,
            // а остальные данные с сервера при запросе, однако можно было и все взять из store, не понял тз в этом моменте
            setIsPostInStore(true);
            axios.get<PostSchema>(`${__BASE_URL__}/${postId}`)
                .then(res => {
                    setPost(res.data);
                }).finally(() => setIsLoading(true));
        } else // иначе также выполняем запрос к серверу, создаем случайные значения для лайков/дизлайков и работаем с локальным состоянием
            axios.get<PostSchema>(`${__BASE_URL__}/${postId}`)
                .then(res => {
                    res.data.like = Math.floor(Math.random() * 50);
                    res.data.disLike = Math.floor(Math.random() * 50);
                    res.data.isActiveDisLike = false;
                    res.data.isActiveLike = false;
                    setPost(res.data)
                })
            .finally(() => setIsLoading(true));
    }, [])

    return (
        <div className={cls.postPage}>
            {isLoading === false
                ? <Loading/>
                : (post !== null || isPostInStore)
                    ? <>
                        <div className={cls.headerContainer}>
                            <Link className={cls.linkContainer} to={'/'}>
                                <img src={backPng} className={cls.linkImg} alt={'назад'}/>
                                <div className={cls.linkText}>Вернуться к статьям</div>
                            </Link>
                                {isPostInStore
                                 ?<div className={cls.likeContainer}>
                                    <ButtonLike isActive={postStore.isActiveLike} likes={postStore.like} onClick={() => {
                                            dispatch(like(+postId))
                                    }}/>
                                    <ButtonDisLike isActive={postStore.isActiveDisLike} disLikes={postStore.disLike} onClick={() => {
                                            dispatch(disLike(+postId))
                                    }}/>
                                </div>
                                :<div className={cls.likeContainer}>
                                    <ButtonLike isActive={post.isActiveLike} likes={post.like} onClick={() => {
                                            setPost({...likeLocal(post)});
                                    }}/>
                                    <ButtonDisLike isActive={post.isActiveDisLike} disLikes={post.disLike} onClick={() => {
                                            setPost({...disLikeLocal(post)});
                                    }}/>
                                </div>}
                        </div>
                        <h1 className={cls.title}>{post.title}</h1>
                        <div className={cls.bodyContainer}>
                            <img className={cls.bodyImg} src={cardImg} alt={'фото'}/>
                            <p className={cls.body}>{post.body}</p>
                        </div>
                    </>
                    : <div>Произошла ошибка при загрузке</div>}
        </div>
    );
};