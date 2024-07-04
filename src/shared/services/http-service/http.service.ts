import axios, { AxiosError } from "axios"
// import { logger } from "../logging-service"
import { toast } from "react-toastify"
axios.interceptors.response.use(
    res => res,
    function (error: AxiosError) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            toast("Unexpected Error")
            // logger.log(error)
        }
        return Promise.reject(error)
    }
)

export const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}