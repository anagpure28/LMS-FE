import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/features/api/authApi";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/CourseApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
})

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}
initializeApp();