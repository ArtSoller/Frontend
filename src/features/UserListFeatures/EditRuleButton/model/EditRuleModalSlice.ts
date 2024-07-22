import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean;
    ruleId: number | null;
}

const initialState: ModalState = {
    isOpen: false,
    ruleId: null
}

const EditRuleModalSlice = createSlice({
    name: "EditRuleModal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<number>) => {
            state.isOpen = true;
            state.ruleId = action.payload; // Store the rule ID
        },
        closeModal: state => {
            state.isOpen = false;
            state.ruleId = null; // Clear the rule ID
        }
    }
})

export const { openModal, closeModal } = EditRuleModalSlice.actions

export default EditRuleModalSlice.reducer
