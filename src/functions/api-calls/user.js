import {getDoc, patchDoc} from '@/utils/api-calls';

// get user
export const getUser = async (log = true) => {
    let res = await getDoc(`/user`, log) ;
    return res?.data || false
}

export const updateUser = async (data) => {
    let res = await patchDoc(`/user?type=details`, data, true);
    return res?.status === 'success' || false; 
}

export const updatePassword = async (data) => {
    let res = await patchDoc(`/user?type=password`, data, true);
    return res?.status === 'success' || false; 
}