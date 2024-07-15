import { ButtonContained } from "../../../shared/ui/Buttons/ButtonContained"
import { useDispatch } from "react-redux"
import { openModal } from "./model/AddToListModalSlice.ts"

export const AddToListButton = () => {
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return <ButtonContained label='Add' handleClick={handleOpenModal} />
}