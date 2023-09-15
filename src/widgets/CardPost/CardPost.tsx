import cls from './CardPost.module.scss'
import {ButtonLike} from "src/shared/ui/ButtonLike/ButtonLike";
import {ButtonDisLike} from "src/shared/ui/ButtonDisLike/ButtonDisLike";
import {ButtonTransition} from "src/shared/ui/ButtonTransition/ButtonTransition";
import {postsSlice} from "src/features/SearchPosts/model/postsSlice"
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {Link} from 'react-router-dom';
interface CardPostProps {
    className?: string,
    title: string,
    img: string,
    likes: number,
    disLikes: number,
    isActiveLike: boolean,
    isActiveDisLike: boolean,
    postId: number,
}

export const CardPost = ({isActiveLike, disLikes, postId, likes, img, title, isActiveDisLike}:CardPostProps) => {
    const {like, disLike} = postsSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <div className={cls.cardPost}>
            <img src={img}
            alt={'фото'} className={cls.img}/>
            <div className={cls.containerInfo}>
                <h2 className={cls.title}>{title}</h2>
                <div className={cls.containerButton}>
                    <div className={cls.containerLike}>
                        <ButtonLike onClick={() => dispatch(like(postId))} likes={likes} isActive={isActiveLike}/>
                        <ButtonDisLike onClick={() => dispatch(disLike(postId))} disLikes={disLikes} isActive={isActiveDisLike}/>
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