import cls from './Header.module.scss'

export const Header = () => {
    return (
        <header className={cls.header}>
            <h1 className={cls.title}>Блог</h1>
            <p className={cls.text}>Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</p>
        </header>
    );
};