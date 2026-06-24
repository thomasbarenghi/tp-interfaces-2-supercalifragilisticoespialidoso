import useSWR from 'swr'
import { API } from '../config/api'
import {fetcher} from '../lib/fetcher'
import type {User} from "../types/user.ts";

export const useUser = () => {
    const endpoint = `${API.USER_BY_ID("6a3b4487d5f7bc094426d202")}`

    const { data, error, isLoading } = useSWR<User>(endpoint, fetcher)
    console.log(data)

    return {
        user: data,
        isLoading,
        error,
    }
}
