import cls from './ButtonLike.module.scss'
import likeActiveImg from 'src/shared/assets/likeActive.png';
import likeInActiveImg from 'src/shared/assets/likeInactive.png';
interface ButtonLikeProps {
    className?: string,
    isActive: boolean,
    likes: number,
    onClick: () => void,
}

export const ButtonLike = ({isActive, onClick, likes}:ButtonLikeProps) => {
    return (
        <>
            {isActive === true
                ? <div className={cls.container}>
                    <img onClick={onClick} src={likeActiveImg} alt={'лайк'} className={cls.buttonLike}/>
                    <div className={cls.count}>{likes}</div>
                </div>
                : <div className={cls.container}>
                    <img onClick={onClick} src={likeInActiveImg} alt={'лайк'} className={cls.buttonLike}/>
                    <div className={cls.count}>{likes}</div>
                </div>}
        </>
    );
};