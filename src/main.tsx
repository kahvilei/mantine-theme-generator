import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "@/data/ThemeState/themeSlice";
import {Provider} from "react-redux";


export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.createRoot(document.getElementById('root')!).render(<Provider store={store}><App /></Provider>);
