import React from "react";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const WorkspacePageModalView: React.FC<ModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 children
                                                             }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div
                className='fixed inset-0 bg-viat-bg bg-opacity-20 transition-opacity'
                onClick={onClose}
            />
            <div className='relative bg-white border-2 border-viat-primary rounded-md p-8 w-8/12 max-w-screen-md'>
                <div className='absolute top-0 right-0 p-4'>
                    <CloseIcon onClick={onClose} className='cursor-pointer' />
                </div>
                <div className='grid grid-cols-12 gap-8'>
                    {children}
                </div>
            </div>
        </div>
    );
};
