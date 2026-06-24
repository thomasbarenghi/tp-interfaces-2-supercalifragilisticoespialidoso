import useSWR from 'swr'
import { API } from '../config/api'
import {fetcher} from '../lib/fetcher'
import type {User} from "../types/user.ts";

export const useUser = () => {
    const endpoint = `${API.USER_BY_ID("6a3c2ca0c708d8c1710c264a")}`

    const { data, error, isLoading } = useSWR<User>(endpoint, fetcher)
    console.log(data)

    return {
        user: data,
        isLoading,
        error,
    }
}
