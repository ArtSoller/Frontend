import { LandingPageNavBar } from "../../widgets/LandingPageNavBar"
import { SignInModal } from "../../widgets/SignInModal"
import { SignUpModal } from "../../widgets/SignUpModal"

export const LandingPage = () => {
    return (
        <>
            <LandingPageNavBar />
            <SignUpModal />
            <SignInModal />
        </>
    )
}