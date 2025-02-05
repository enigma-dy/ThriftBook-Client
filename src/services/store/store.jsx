import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../userService";
import { categoriesApi } from "../BookCatService";
import toggleNavReducer from "../../features/toggleNav";
import { bookApi } from "../BookService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    toggleNav: toggleNavReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(bookApi.middleware),
});

setupListeners(store.dispatch);
