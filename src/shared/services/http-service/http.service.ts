import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import config from "../../../app/config.json"

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.response.use(
    res => res,
    function (error: AxiosError) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            toast("Unexpected Error")
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