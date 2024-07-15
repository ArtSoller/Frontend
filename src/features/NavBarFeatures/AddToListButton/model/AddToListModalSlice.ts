import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const AddToListModalSlice = createSlice({
    name: "AddToListModal",
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

export const { openModal, closeModal } = AddToListModalSlice.actions

export default AddToListModalSlice.reducer