import {getDoc, patchDoc} from '@/utils/api-calls';

// get user
export const getUser = async (log = true) => {
    let res = await getDoc(`/users/admin`, log) ;
    return res?.data || false
}

export const updateUser = async (data) => {
    let res = await patchDoc(`/users/admin`, data, true);
    return res?.status === 'success' || false; 
}

export const updatePassword = async (data) => {
    let res = await patchDoc(`/users/password/admin`, data, true);
    return res?.status === 'success' || false; 
}