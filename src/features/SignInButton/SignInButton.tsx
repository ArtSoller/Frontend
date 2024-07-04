import { useDispatch } from "react-redux"
import { ButtonOutlined } from "../../shared/ui/Buttons/ButtonOutlined"

import { openModal } from "./model/SignInModalSlice.ts"

export const SignInButton = () => {
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return (
        <>
            <ButtonOutlined label='Sign In' handleClick={handleOpenModal} />
        </>
    )
}