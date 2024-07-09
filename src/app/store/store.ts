import { configureStore } from "@reduxjs/toolkit"

import SignUpModalReducer from "../../features/SignUpButton/model/SignUpModalSlice.ts"
import SignInModalReducer from "../../features/SignInButton/model/SignInModalSlice.ts"
import UserReducer from "../../entities/user/model/UserSlice.ts"

export const store = configureStore({
    reducer: {
        SignUpModal: SignUpModalReducer,
        SignInModal: SignInModalReducer,
        user: UserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch