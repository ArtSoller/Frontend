import { PageHeader } from "../../features/UserListFeatures/PageHeader"
import { EmptyListPicture } from "../../features/UserListFeatures/EmptyListPicture"

export const UserListsPage = () => {
    return (<div className='col-span-9'>
            <PageHeader />
            <main className='h-screen bg-viat-back'>
                <EmptyListPicture />
            </main>
        </div>
    )
}