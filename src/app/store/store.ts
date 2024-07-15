import { configureStore } from "@reduxjs/toolkit"

import SignUpModalReducer from "../../features/SignUpButton/model/SignUpModalSlice.ts"
import SignInModalReducer from "../../features/SignInButton/model/SignInModalSlice.ts"
import AddToListModalReducer from "../../features/NavBarFeatures/AddToListButton/model/AddToListModalSlice.ts"
import UserReducer from "../../entities/user/model/UserSlice.ts"

export const store = configureStore({
    reducer: {
        SignUpModal: SignUpModalReducer,
        SignInModal: SignInModalReducer,
        AddToListModal: AddToListModalReducer,
        user: UserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch