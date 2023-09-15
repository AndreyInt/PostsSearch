import cls from './ButtonTransition.module.scss'
interface ButtonTransitionProps {
    className?: string,
    children: string,
}

export const ButtonTransition = ({children}:ButtonTransitionProps) => {
    return (
        <button className={cls.buttonTransition}>
            {children}
        </button>
    );
};