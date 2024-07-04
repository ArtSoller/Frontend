import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const SignUpModalSlice = createSlice({
    name: "SignUpModal",
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

export const { openModal, closeModal } = SignUpModalSlice.actions

export default SignUpModalSlice.reducer