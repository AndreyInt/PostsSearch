import cls from './ButtonDisLike.module.scss';
import disLikeActiveImg from 'src/shared/assets/disLikeActive.png';
import disLikeInActiveImg from 'src/shared/assets/disLikeInactive.png';

interface ButtonDisLikeProps {
    className?: string,
    isActive: boolean,
    disLikes: number,
    onClick: () => void,
}
export const ButtonDisLike = ({isActive, disLikes, onClick}:ButtonDisLikeProps) => {
    return (
        <>
            {isActive === true
                ? <div className={cls.container}>
                    <img onClick={onClick} src={disLikeActiveImg} alt={'дизлайк'} className={cls.buttonDisLike}/>
                    <div className={cls.count}>{disLikes}</div>
                </div>
                : <div className={cls.container}>
                    <img onClick={onClick} src={disLikeInActiveImg} alt={'лайк'} className={cls.buttonDisLike}/>
                    <div className={cls.count}>{disLikes}</div>
                </div>}
        </>
    );
};