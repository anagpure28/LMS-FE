import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/features/api/authApi";
import rootReducer from "./rootReducer";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware),
})

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}
initializeApp();