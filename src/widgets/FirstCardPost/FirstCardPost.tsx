import cls from './FirstCardPost.module.scss'
import {ButtonLike} from "src/shared/ui/ButtonLike/ButtonLike";
import {ButtonDisLike} from "src/shared/ui/ButtonDisLike/ButtonDisLike";
import {ButtonTransition} from "src/shared/ui/ButtonTransition/ButtonTransition";
import {postsSlice} from "src/features/SearchPosts/model/postsSlice"
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {Link} from "react-router-dom";

interface FirstCardPostProps {
    className?: string,
    title: string,
    text: string,
    likes: number,
    disLikes: number,
    img: string
    isActiveLike: boolean,
    isActiveDisLike: boolean,
    postId: number,
}

export const FirstCardPost = ({isActiveDisLike, postId, isActiveLike, likes, disLikes, text, title, img}:FirstCardPostProps) => {

    const {like, disLike} = postsSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <div className={cls.firstCardPost}>
            <img src={img}
                 alt={'фото'} className={cls.img}/>
            <div className={cls.containerContent}>
                <div className={cls.titleLikeContainer}>
                    <h2 className={cls.title}>{title}</h2>
                    <div className={cls.containerLike}>
                        <ButtonLike onClick={() => dispatch(like(postId))} likes={likes} isActive={isActiveLike}/>
                        <ButtonDisLike onClick={() => dispatch(disLike(postId))} disLikes={disLikes} isActive={isActiveDisLike}/>
                    </div>
                </div>
                <p className={cls.text}>{text}</p>
                <div className={cls.containerButton}>
                    <Link className={cls.link} to={`/post/${postId}`}>
                        <ButtonTransition>Читать далее</ButtonTransition>
                    </Link>
                </div>
            </div>
        </div>
    );
};