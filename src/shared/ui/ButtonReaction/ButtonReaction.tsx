import cls from './ButtonLike.module.scss'
interface ButtonLikeProps {
    className?: string,
    isActive: boolean,
    likes: number,
    onClick: () => void,
    reactionImg: string,
    reactionActiveImg: string,
}

export const ButtonReaction = ({isActive, reactionImg, reactionActiveImg, onClick, likes}:ButtonLikeProps) => {
    return (
        <>
            {isActive
                ? <div className={cls.container}>
                    <img onClick={onClick} src={reactionActiveImg} alt={'лайк'} className={cls.buttonLike}/>
                    <div className={cls.count}>{likes}</div>
                </div>
                : <div className={cls.container}>
                    <img onClick={onClick} src={reactionImg} alt={'лайк'} className={cls.buttonLike}/>
                    <div className={cls.count}>{likes}</div>
                </div>}
        </>
    );
};