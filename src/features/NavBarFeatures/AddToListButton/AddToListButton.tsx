import { ButtonContained } from "../../../shared/ui/Buttons/ButtonContained"
import { useDispatch } from "react-redux"
import { openModal } from "./model/AddToListModalSlice.ts"

export const AddToListButton = () => {
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return <ButtonContained className='bg-viat-primary text-viat-bg font-viat-body hover:text-viat-wh font-bold py-2 px-4 rounded-md' label='Add' handleClick={handleOpenModal} />
}