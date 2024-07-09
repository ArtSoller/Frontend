import { RootState } from "../../../app/store/store.ts"

export const selectUser = (state: RootState) => state.user.data
export const selectAccessToken = (state: RootState) => state.user.access_token