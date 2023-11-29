import {activateUser, login, registerUser, resetPassword, requestPasswordToken, requestActivationToken} from "@/functions/api-calls/auth"; 
import {createToast} from "@/functions/toast";
import { validatePhone } from "@/functions/validation";
import { signInFunctionParams } from "@/types/authTypes";

// handle activation
const handleActivation = async (
    token: string, setActivated: React.Dispatch<boolean>, 
    setMessage: React.Dispatch<string>, setLoading: React.Dispatch<boolean>,
    push: (str: string) => void
    ) => {
    const res = await activateUser(token); 
    if (res?.status === 'success') {
        createToast("success", "Activation successful.");
        setActivated(true); 

        setTimeout(() => {
            push("/login"); 

        }, 1000)
    } else {
        setMessage(res.message); 
    }

    setLoading(false); 
}

const handleSubmit = async (
    data: any, screen: string, setLoading: React.Dispatch<boolean>,
    push: (path: string) => void, refresh: () => void, token: string | null, 
    setMessage: React.Dispatch<string>, signIn: (signInConfig: signInFunctionParams) => void
) => {
            // validations
            if (screen === 'register' && !validatePhone(data.phone)) {
                createToast("error", "Phone number must start with 254 ...."); 
                return;
            }
            let res; 
    
            setLoading(true); 
    
            if (screen === 'login') {
                res = await login(data); 
                if (res) {
                    signIn({
                        token: res.token, 
                        expiresIn: 60 * 60 * 1000, 
                        tokenType: 'Bearer',
                        authState: res.user, 
                        // refreshToken: res.session, 
                        // refreshTokenExpireIn: 60 * 60 * 1000,
                    }); 
                    createToast("success", "Login successful");
                    push("/")
                    refresh();
                }
            } else if (screen === 'register') {
                res = await registerUser(data);
                if (res) {
                    createToast("success", "Registration was successful"); 
                    setTimeout(() => {
                        push(`/login?registered=true`); 
                    }, 1000)
                }
            } else if (screen === 'reset') {
                if (data.password !== data.passwordConfirm) {
                    createToast("error", "Passwords do not match.");
                    setLoading(false); 
                    return; 
                }
                res = await resetPassword(data, token); 
                if (res) {
                    createToast("success", res); 
                    push("/login"); 
                }; 
            } else if (screen === 'welcome') {
                res = await requestActivationToken(data.email); 
                if (res) {
                    setMessage("Activation token has been sent to your email. Valid for only 10 minutes!"); 
                }
            } else if (screen === 'forgot') {
                res = await requestPasswordToken(data)
                if (res) createToast('success', res);
            }
    
            setLoading(false); 

}

export {
    handleActivation,
    handleSubmit
}