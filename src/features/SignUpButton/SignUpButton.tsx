import { useDispatch } from "react-redux"

import { ButtonContained } from "../../shared/ui/Buttons/ButtonContained"
import { openModal } from "./model/SignUpModalSlice.ts"

export const SignUpButton = () => {
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return (
        <>
            <ButtonContained label='Sign Up' handleClick={handleOpenModal} />
        </>
    )
}