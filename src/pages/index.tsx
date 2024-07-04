import { Route, Routes } from "react-router-dom"

import { LandingPage } from "./LandingPage"

export const Pages = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
        </Routes>
    )
}