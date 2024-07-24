import { useDispatch } from "react-redux";
import { openModal } from "./model/EditRuleModalSlice.ts";
import EditIcon from '@mui/icons-material/Edit';

interface EditRuleButtonProps {
    ruleId: number;
}

export const EditRuleButton: React.FC<EditRuleButtonProps> = ({ ruleId }) => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal(ruleId));
    }

    return <EditIcon onClick={handleOpenModal} className='cursor-pointer' />
}
