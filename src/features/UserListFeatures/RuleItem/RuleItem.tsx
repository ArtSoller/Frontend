import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store.ts";
import { closeModal } from "../EditRuleButton/model/EditRuleModalSlice.ts";
import { WorkspacePageModalView } from "../../../shared/ui/Modals/WorkspacePageModalView";
import { EditRuleModalFields } from "../EditRuleModalFields";
import AlertIcon from "../../../shared/media/Alert.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { httpService } from "../../../shared/services/http-service";
import { EditRuleButton } from "../EditRuleButton";

interface RuleProps {
    rule: {
        id: number;
        user_id: number;
        currency: {
            id: number;
            name: string;
        };
        alert_rate: number;
        rule_status: boolean;
    };
    onDelete: (id: number) => void;
    onActivate: (id: number) => void;
    onUpdate: () => void; // New prop for updating parent component
}

export const RuleItem = ({ rule, onDelete, onActivate, onUpdate }: RuleProps) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.EditRuleModal.isOpen);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleDelete = async () => {
        try {
            await httpService.delete(`/rules/${rule.id}`);
            onDelete(rule.id);
            onUpdate(); // Update parent component after deletion
        } catch (error) {
            console.error('Error deleting rule:', error);
        }
    };

    const handleActivate = async () => {
        try {
            await httpService.put(`/change_activity_rules/${rule.id}`);
            onActivate(rule.id);
            onUpdate(); // Update parent component after activation
        } catch (error) {
            console.error('Error activating rule:', error);
        }
    };

    return (
        <div>
            <div className='bg-viat-secondary shadow-md rounded-md p-4 mt-4'>
                <div className='flex items-center space-x-2'>
                    <img src={AlertIcon.toString()} alt='User Icon' className='h-10 w-10'/>
                    <div className='flex flex-col space-y-1'>
                        <div className='font-viat-small text-viat-size-body text-viat-text'>
                            <div>Currency: {rule.currency.name}</div>
                            <div>Rule Rate: {rule.alert_rate}</div>
                        </div>
                    </div>
                    {rule.rule_status ? (
                        <CheckCircleIcon onClick={handleActivate} className='cursor-pointer' />
                    ) : (
                        <RadioButtonUncheckedIcon onClick={handleActivate} className='cursor-pointer' />
                    )}
                    <DeleteIcon onClick={handleDelete} className='cursor-pointer' />
                    <EditRuleButton />
                    <WorkspacePageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
                        <EditRuleModalFields
                            initialCurrency={{
                                id: rule.currency.id, // Ensure `rule.currency` has an `id` field
                                name: rule.currency.name
                            }}
                            initialExchangeRate={rule.alert_rate.toString()}
                        />
                    </WorkspacePageModalView>
                </div>
            </div>
        </div>
    );
};
