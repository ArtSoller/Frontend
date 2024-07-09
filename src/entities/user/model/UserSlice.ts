import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, UserState } from "./types"

const initialState: UserState = {
    data: null,
    access_token: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.data = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload
        },
        logout: state => {
            state.data = null
            state.access_token = null
        }
    }
})

export const { setUser, setAccessToken, logout } = UserSlice.actions

export default UserSlice.reducer