import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import { RootState } from "../../../app/store/store.ts";
import { closeModal } from "../EditRuleButton/model/EditRuleModalSlice.ts";
import { WorkspacePageModalView } from "../../../shared/ui/Modals/WorkspacePageModalView";
import { EditRuleModalFields } from "../EditRuleModalFields";
import AlertIcon from "../../../shared/media/Alert.svg";
import { httpService } from "../../../shared/services/http-service";
import { EditRuleButton } from "../EditRuleButton";
import './styles.css';

interface RuleProps {
    rule: {
        id: number;
        user_id: number;
        currency: {
            currency_id: number;
            name: string;
        };
        upper_alert_rate: number;
        lower_alert_rate: number;
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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleInfoClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'info-popover' : undefined;

    return (
        <div>
            <div className='bg-viat-secondary shadow-md rounded-md p-4 mt-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                        <img src={AlertIcon.toString()} alt='User Icon' className='h-10 w-10'/>
                        <div className='flex flex-col space-y-1'>
                            <div className='font-viat-small text-viat-size-body text-viat-text'>
                                <div>Currency: {rule.currency.name}</div>
                                <div>Upper Rule Rate: {rule.upper_alert_rate}</div>
                                <div>Lower Rule Rate: {rule.lower_alert_rate}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-x-2'>
                        <Tooltip title={
                            <span>
                                {rule.rule_status ? "Deactivate Rule" : "Activate Rule"}
                                <IconButton size="small" onClick={handleInfoClick}>
                                    <InfoIcon fontSize="inherit" />
                                </IconButton>
                            </span>
                        } placement="top">
                            <span>
                                <IconButton size="small" className='cursor-pointer interactable'>
                                    {rule.rule_status ? (
                                        <CheckCircleIcon onClick={handleActivate}
                                                         className='cursor-pointer icon-default icon-hover interactable'/>
                                    ) : (
                                        <RadioButtonUncheckedIcon onClick={handleActivate}
                                                                  className='cursor-pointer icon-default icon-hover interactable'/>
                                    )}
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleInfoClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div style={{ padding: '10px' }}>
                                Active rules track the currency and deactivate upon triggering, sending an email notification.
                            </div>
                        </Popover>
                        <Tooltip title="Delete Rule" placement="top">
                            <span>
                                <IconButton size="small" onClick={handleDelete} className='cursor-pointer interactable'>
                                    <DeleteIcon className='icon-default icon-hover' />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Edit Rule" placement="top">
                            <span>
                                <IconButton size="small" className='cursor-pointer interactable'>
                                    <EditRuleButton ruleId={rule.id}/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>
                </div>
                {isOpen && ruleId === rule.id && (
                    <WorkspacePageModalView isOpen={isOpen} onClose={handleCloseModal}>
                        <EditRuleModalFields
                            initialCurrency={rule.currency}
                            initialUpperExchangeRate={rule.upper_alert_rate.toString()}
                            initialLowerExchangeRate={rule.lower_alert_rate.toString()}
                            ruleId={ruleId}
                        />
                    </WorkspacePageModalView>
                )}
            </div>
        </div>
    );
};
