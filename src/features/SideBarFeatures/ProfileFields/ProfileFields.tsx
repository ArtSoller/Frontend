import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from "../../../shared/media/Profile.svg";
import { logout } from '../../../shared/services/auth'; // Импорт функции logout

export const ProfileFields: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Перенаправляем пользователя на главную страницу после выхода
    };

    return (
        <div className='bg-viat-secondary shadow-lg rounded-lg p-6 mt-8 border border-viat-primary'>
            <div className='d-flex align-items-center space-x-4'>
                <img src={UserIcon.toString()} alt='User Icon' className='h-12 w-12 rounded-circle border-2 border-viat-primary' />
                <div className='d-flex flex-column space-y-1'>
                    <div className='font-viat-medium text-viat-size-body text-viat-text'>
                        {/*TODO: Make link and show username*/}
                        {"Username's Workspace"}
                    </div>
                    <button
                        onClick={handleLogout}
                        className='btn btn-primary mt-0'
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};
