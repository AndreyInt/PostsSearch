import cls from './FirstCardPost.module.scss'
import {ButtonReaction} from "src/shared/ui/ButtonReaction/ButtonReaction";
import {ButtonTransition} from "src/shared/ui/ButtonTransition/ButtonTransition";
import {postsSlice} from "src/features/SearchPosts/model/postsSlice"
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {Link} from "react-router-dom";
import {Reactions} from "src/features/SearchPosts/model/types";
import likeActiveImg from 'src/shared/assets/likeActive.png';
import likeImg from 'src/shared/assets/like.png';
import disLikeActiveImg from "src/shared/assets/disLikeActive.png";
import disLikeImg from "src/shared/assets/disLikeInactive.png";

interface FirstCardPostProps {
    className?: string,
    likes: number,
    disLikes: number,
    title: string,
    text: string,
    reaction: Reactions,
    img: string
    postId: number,
}

export const FirstCardPost = ({reaction, postId, likes, disLikes, text, title, img}:FirstCardPostProps) => {

    const {reactionReducer} = postsSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <div className={cls.firstCardPost}>
            <img src={img}
                 alt={'фото'} className={cls.img}/>
            <div className={cls.containerContent}>
                <div className={cls.titleLikeContainer}>
                    <h2 className={cls.title}>{title}</h2>
                    <div className={cls.containerLike}>
                        <ButtonReaction onClick={() => dispatch(reactionReducer({postId, reaction: 'like'}))} likes={likes} reactionActiveImg={likeActiveImg} reactionImg={likeImg} isActive={reaction === 'like'}/>
                        <ButtonReaction onClick={() => dispatch(reactionReducer({postId, reaction: 'disLike'}))} likes={disLikes} reactionActiveImg={disLikeActiveImg} reactionImg={disLikeImg} isActive={reaction ==='disLike'}/>
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