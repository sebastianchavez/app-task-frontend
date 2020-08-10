import axios from 'axios'
import {environments} from '../env'

const apiUrl = environments.apiUrl

export const get = (url) => {
    return axios.get(`${apiUrl}${url}`)
}

export const post = (url, request) => {
    return axios.post(`${apiUrl}${url}`, request)
}

export const put = (url, request) => {
    return axios.put(`${apiUrl}${url}`,request)
}

export const remove = (url) => {
    return axios.delete(`${apiUrl}${url}`)
}