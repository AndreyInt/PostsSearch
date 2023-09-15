import cls from './ButtonSearch.module.scss'
import classNames from "classnames";
import searchImage from 'src/shared/assets/searchIcon.png';
interface ButtonSearchProps {
    className?: string,
    onClick: () => void,
}

export const ButtonSearch = ({className, onClick}:ButtonSearchProps) => {
    return (
        <img src={searchImage} alt={'поиск фото'}
             className={classNames(cls.buttonSearch, className)}
             onClick={onClick}/>
    );
};