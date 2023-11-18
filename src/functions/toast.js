import { toast } from 'sonner';

export const createToast = (type, message) => {

    try {
        toast[type](message); 
    } catch (err) {}
}
