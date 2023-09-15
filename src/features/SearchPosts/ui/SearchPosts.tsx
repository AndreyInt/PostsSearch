import cls from './SearchPosts.module.scss'
import {ButtonSearch} from "src/shared/ui/ButtonSearch/ButtonSearch";
import {InputSearch} from "src/shared/ui/InputSearch/InputSearch";
import React, {useEffect, useReducer, useState} from "react";
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {QueryData} from "src/features/SearchPosts/model/types";
import {fetchPaginationPosts, fetchPosts} from "src/features/SearchPosts/model/postsSlice";

const initialState: QueryData = {
    search: '',
    startIndex: 0,
}

type Action =
    | {type: 'changeSearch', search: string}
    | {type: 'changeStartIndex', startIndex: number};


function reducerSearchBooks(state: QueryData, action: Action): QueryData  {
    switch (action.type) {
        case 'changeSearch' :
            return {...state ,search: action.search}
        case 'changeStartIndex':
            return {...state ,startIndex: action.startIndex}
        default:
            throw new Error();
    }
}

export const SearchPosts = () => {
    const [searchIsFocus, setSearchIsFocus] = useState(false); //чтобы поиск по нажатию enter работал только при фокусе на Input
    const appDispatch = useAppDispatch();
    const [fetch, setFetch] = useState(false);
    const [queryData, dispatch] = useReducer(reducerSearchBooks, initialState);
    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'changeSearch', search: e.target.value});
    const changeStartIndex = (startIndex: number) => dispatch({type: 'changeStartIndex', startIndex: startIndex + 21});
    const fetchBooks = (e: KeyboardEvent) =>
    {
        if (e.key === 'Enter' && searchIsFocus) {
            appDispatch(fetchPosts(queryData)).finally(() => changeStartIndex(0));
        }
    }

    useEffect( () => {
        document.addEventListener('keypress', fetchBooks)
        return function () {
            document.removeEventListener('keypress', fetchBooks);
        }
    }, [queryData, searchIsFocus])

    useEffect(() => {
        if (fetch) {
            appDispatch(fetchPaginationPosts(queryData)).finally( () => setFetch(false));
            changeStartIndex(queryData.startIndex);
        }
    }, [fetch])

    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetch(true)
        }
    }

    return (
        <div className={cls.search}>
                <InputSearch onChange={changeSearch}
                             onBlur={() => setSearchIsFocus(false)}
                             onFocus={ () => setSearchIsFocus(true)}
                             inputType={'text'}
                             inputPlaceholder={'Поиск по названию статьи'}
                             classname={cls.inp}/>
                <ButtonSearch onClick={() => {
                    appDispatch(fetchPosts(queryData));
                    changeStartIndex(0);
                }} className={cls.btn}/>
        </div>
    );
};