import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const SignInModalSlice = createSlice({
    name: "SignInModal",
    initialState,
    reducers: {
        openModal: state => {
            state.isOpen = true
        },
        closeModal: state => {
            state.isOpen = false
        }
    }
})

export const { openModal, closeModal } = SignInModalSlice.actions

export default SignInModalSlice.reducer