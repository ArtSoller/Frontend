import { Route, Routes } from "react-router-dom"

import { SideBar } from "../../widgets/SideBar"
// import { UserListsPage } from "../UserListsPage"
// import { UserFeedPage } from "../UserFeedPage"

export const UserWorkspace = () => {
    return (
        <div className='grid grid-cols-12 gap-8'>
            <SideBar />
            {/*<Routes>*/}
            {/*    <Route index element={<UserListsPage />} />*/}
            {/*    <Route path='feed' element={<UserFeedPage />} />*/}
            {/*</Routes>*/}
        </div>
    )
}