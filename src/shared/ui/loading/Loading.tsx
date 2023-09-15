import cls from './loading.module.scss'
interface LoadingProps {
    className?: string
}

export const Loading = ({className}:LoadingProps) => {
    return (
        <div className={cls.loading}>
            <div></div>
        </div>
    );
};