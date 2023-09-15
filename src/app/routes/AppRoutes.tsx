import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Loading} from "src/shared/ui/loading/Loading";
import {SearchPage} from "src/pages/SearchPage/SearchPage";
import {PostPage} from "src/pages/PostPage/PostPage";

export const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path={''} element={<SearchPage/>}/>
                <Route path={'post/:postId'} element={<PostPage/>}/>
            </Routes>
        </Suspense>
    );
};