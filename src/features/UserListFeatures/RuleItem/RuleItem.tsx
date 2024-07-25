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
import Tippy from '@tippyjs/react'; // Импорт Tippy.js
import 'tippy.js/dist/tippy.css'; // Импорт стилей для Tippy
import './styles.css';  // Импорт стилей

interface RuleProps {
    rule: {
        id: number;
        user_id: number;
        currency: {
            currency_id: number;
            name: string;
        };
        alert_rate: number;
        rule_status: boolean;
    };
    onDelete: (id: number) => void;
    onActivate: (id: number) => void;
    onUpdate: () => void;
}

export const RuleItem = ({ rule, onDelete, onActivate, onUpdate }: RuleProps) => {
    const dispatch = useDispatch();
    const { isOpen, ruleId } = useSelector((state: RootState) => state.EditRuleModal);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleDelete = async () => {
        try {
            await httpService.delete(`/rules/${rule.id}`);
            onDelete(rule.id);
            onUpdate();
        } catch (error) {
            console.error('Error deleting rule:', error);
        }
    };

    const handleActivate = async () => {
        try {
            await httpService.put(`/change_activity_rules/${rule.id}`);
            onActivate(rule.id);
            onUpdate();
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
                        <CheckCircleIcon onClick={handleActivate} className='cursor-pointer icon-default icon-hover' />
                    ) : (
                        <RadioButtonUncheckedIcon onClick={handleActivate} className='cursor-pointer icon-default icon-hover' />
                    )}
                    <DeleteIcon onClick={handleDelete} className='cursor-pointer icon-default icon-hover' />
                    <Tippy content='This button toggles the rule activity status'>
                        <div>
                            <EditRuleButton ruleId={rule.id} />
                        </div>
                    </Tippy>
                    {isOpen && ruleId === rule.id && (
                        <WorkspacePageModalView isOpen={isOpen} onClose={handleCloseModal}>
                            <EditRuleModalFields
                                initialCurrency={rule.currency}
                                initialExchangeRate={rule.alert_rate.toString()}
                                ruleId={ruleId}
                            />
                        </WorkspacePageModalView>
                    )}
                </div>
            </div>
        </div>
    );
};
