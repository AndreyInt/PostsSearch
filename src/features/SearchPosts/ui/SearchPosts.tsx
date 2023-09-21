import cls from './SearchPosts.module.scss'
import {ButtonSearch} from "src/shared/ui/ButtonSearch/ButtonSearch";
import {InputSearch} from "src/shared/ui/InputSearch/InputSearch";
import React, {useEffect, useReducer, useState} from "react";
import {useAppDispatch} from "src/shared/lib/redux/redux";
import {QueryData} from "src/features/SearchPosts/model/types";
import {fetchPosts} from "src/features/SearchPosts/model/postsSlice";

const initialState: QueryData = {
    search: '',
    startIndex: 0,
    isPaginationFetch: false,
}

type Action =
    | {type: 'changeSearch', search: string}
    | {type: 'changeStartIndex', startIndex: number}
    | {type: 'changeIsPaginationFetch', isPaginationFetch: boolean}


function reducerSearchPosts(state: QueryData, action: Action): QueryData  {
    switch (action.type) {
        case 'changeSearch' :
            return {...state ,search: action.search}
        case 'changeStartIndex':
            return {...state ,startIndex: action.startIndex}
        case 'changeIsPaginationFetch':
            return {...state ,isPaginationFetch: action.isPaginationFetch}
        default:
            throw new Error();
    }
}

export const SearchPosts = () => {

    const [searchIsFocus, setSearchIsFocus] = useState(false);
    const appDispatch = useAppDispatch();
    const [queryData, dispatch] = useReducer(reducerSearchPosts, initialState);
    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'changeSearch', search: e.target.value});
    const changeStartIndex = (startIndex: number) => dispatch({type: 'changeStartIndex', startIndex: startIndex + 21});
    const changeIsPaginationFetch = (isPaginationFetch: boolean) => dispatch({type: 'changeIsPaginationFetch', isPaginationFetch: isPaginationFetch});
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
        if (queryData.isPaginationFetch) {
            appDispatch(fetchPosts(queryData)).finally( () => {
                changeIsPaginationFetch(false);
                changeStartIndex(queryData.startIndex);
            });
        }
    }, [queryData.isPaginationFetch])

    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            changeIsPaginationFetch(true)
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