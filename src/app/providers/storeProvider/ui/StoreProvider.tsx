import {ReactNode} from "react";
import {Provider} from "react-redux";
// import {StateSchema} from "../config/StateSchema";
import {setupStore} from "../config/store";
interface StoreProviderProps {
    children?: ReactNode;
}

const store = setupStore();

export const StoreProvider = (props:StoreProviderProps) => {

    const {children} = props;

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};