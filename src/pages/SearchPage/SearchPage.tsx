import cls from './SearchPage.module.scss'
import {useAppSelector} from "src/shared/lib/redux/redux";
import {Loading} from "src/shared/ui/loading/Loading";
import {FirstCardPost} from "src/widgets/FirstCardPost/FirstCardPost";
import firstPostPhoto from 'src/shared/assets/FirstPostPhoto.png';
import {CardPost} from "src/widgets/CardPost/CardPost";
import {SearchPosts} from "src/features/SearchPosts/ui/SearchPosts";
import React from "react";
import {Header} from "src/shared/ui/Header/Header";
interface SearchPageProps {
    className?: string
}

export const SearchPage = ({className}:SearchPageProps) => {

    const postsInfo = useAppSelector(state => state.postsReducer);
    return (
        <>
            <Header/>
            <SearchPosts/>
            <div className={cls.searchPage}>
                {postsInfo.status === 'loading'
                    ? <Loading/>
                    : (postsInfo.status === 'resolved' && postsInfo.posts.length > 0)
                        ? <div className={cls.cardPostContainer}>
                            <FirstCardPost
                                postId={postsInfo.posts[0]?.id}
                                isActiveDisLike={postsInfo.posts[0]?.isActiveDisLike}
                                title={postsInfo.posts[0]?.title}
                                img={firstPostPhoto}
                                text={postsInfo.posts[0]?.body}
                                likes={postsInfo.posts[0]?.like}
                                disLikes={postsInfo.posts[0]?.disLike}
                                isActiveLike={postsInfo.posts[0]?.isActiveLike}
                                    />
                            <div className={cls.cardsColumn}>
                                {postsInfo.posts.map((post, index) => {
                                    if (index === 0)
                                        return null
                                    return <CardPost
                                        key={post.id}
                                        postId={post.id}
                                        isActiveDisLike={post.isActiveDisLike}
                                        title={post.title}
                                        img={firstPostPhoto}
                                        likes={post.like}
                                        disLikes={post.disLike}
                                        isActiveLike={post.isActiveLike}/>
                            })}
                            </div>
                        </div>
                        : postsInfo.status === null
                            ? null
                            : <div>Посты не найдены</div>}
            </div>
        </>
    );
};