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
        dispatch(closeModal())
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold mb-4'>My alerts</h1>
                <AddToListButton/>
                <WorkspacePageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
                    <AddToListModalFields/>
                </WorkspacePageModalView>
            </div>
        </div>
    )
}