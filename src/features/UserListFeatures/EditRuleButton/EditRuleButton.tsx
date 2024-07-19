import { useDispatch } from "react-redux"
import { openModal } from "./model/EditRuleModalSlice.ts"
import EditIcon from '@mui/icons-material/Edit'; // Новая иконка редактирования

export const EditRuleButton = () => {
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return <EditIcon onClick={handleOpenModal} className='cursor-pointer' />
}