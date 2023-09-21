import cls from './CardPost.module.scss'
import {ButtonReaction} from "src/shared/ui/ButtonReaction/ButtonReaction";
import {ButtonTransition} from "src/shared/ui/ButtonTransition/ButtonTransition";
import {postsSlice} from "src/features/SearchPosts/model/postsSlice"
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {Link} from 'react-router-dom';
import likeActiveImg from 'src/shared/assets/likeActive.png';
import likeImg from 'src/shared/assets/like.png';
import disLikeActiveImg from 'src/shared/assets/disLikeActive.png';
import disLikeImg from 'src/shared/assets/disLikeInactive.png';
import {Reactions} from "src/features/SearchPosts/model/types";

interface CardPostProps {
    className?: string,
    title: string,
    img: string,
    likes: number,
    disLikes: number,
    reaction: Reactions,
    postId: number,
}

export const CardPost = ({reaction, disLikes, postId, likes, img, title}:CardPostProps) => {
    const {reactionReducer} = postsSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <div className={cls.cardPost}>
            <img src={img}
            alt={'фото'} className={cls.img}/>
            <div className={cls.containerInfo}>
                <h2 className={cls.title}>{title}</h2>
                <div className={cls.containerButton}>
                    <div className={cls.containerLike}>
                        <ButtonReaction onClick={() => dispatch(reactionReducer({postId, reaction: 'like'}))} likes={likes} reactionActiveImg={likeActiveImg} reactionImg={likeImg} isActive={reaction === 'like'}/>
                        <ButtonReaction onClick={() => dispatch(reactionReducer({postId, reaction: 'disLike'}))} likes={disLikes} reactionActiveImg={disLikeActiveImg} reactionImg={disLikeImg} isActive={reaction ==='disLike'}/>
                    </div>
                    <div className={cls.wrapperBtn}>
                        <Link className={cls.link} to={`/post/${postId}`}>
                            <ButtonTransition>Читать далее</ButtonTransition>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};