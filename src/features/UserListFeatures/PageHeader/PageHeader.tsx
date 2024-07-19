import { AddToListButton } from "../../NavBarFeatures/AddToListButton"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../NavBarFeatures/AddToListButton/model/AddToListModalSlice.ts"
import { WorkspacePageModalView } from "../../../shared/ui/Modals/WorkspacePageModalView"
import { RootState } from "../../../app/store/store.ts"
import { AddToListModalFields } from "../AddToListModalFields"


export const PageHeader = () => {
    const dispatch = useDispatch()
    const isModalOpen = useSelector(
        (state: RootState) => state.AddToListModal.isOpen
    )
    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    return (
        <div className='p-6 bg-gray-100'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-3xl font-semibold text-gray-800'>My Alerts</h1>
                <div className='flex space-x-4'>
                    {location.pathname === "/workspace" && <AddToListButton />}
                    <WorkspacePageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
                        <AddToListModalFields/>
                    </WorkspacePageModalView>
                </div>
            </div>
        </div>
    )
}