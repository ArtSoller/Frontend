import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const EditRuleModalSlice = createSlice({
    name: "EditRuleModal",
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

export const { openModal, closeModal } = EditRuleModalSlice.actions

export default EditRuleModalSlice.reducer