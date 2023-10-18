import { configureStore } from "@reduxjs/toolkit";
import swapInfoReducer from "./SwapInfoStore";
import walletConnReducer from "./WalletConnStore";
import errorMeesageReducer from "./ErrorMessageStore";
import AccountReducer from "./AccountStore";

export const store = configureStore({
  reducer: {
    swapInfo: swapInfoReducer,
    walletConn: walletConnReducer,
    errorMessage: errorMeesageReducer,
    account: AccountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
