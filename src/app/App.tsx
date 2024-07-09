import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Pages } from "../pages"
import "./styles/index.css"


function App() {
    return (
        <>
            <Pages />
            <ToastContainer />
        </>
    )
}

export default App