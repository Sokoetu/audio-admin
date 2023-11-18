// create a toast notification using the sonner toast function
import { toast } from 'sonner';

export const createToast = (type: string, message: string) => {

    try {
        toast[type](message); 
    } catch (err) {}
}
