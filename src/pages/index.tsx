import { Route, Routes } from "react-router-dom"

import { LandingPage } from "./LandingPage"
import { UserWorkspace } from "./UserWorkspace"


export const Pages = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path='workspace/*' element={<UserWorkspace />} />
        </Routes>
    )
}