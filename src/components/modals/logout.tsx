
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Confirm from "./confirm";

import { useSignOut } from '@/hooks/authHooks';
import { removeCookie } from '@/helpers/cookie-helpers';
import { createToast } from "@/functions/toast";

interface LogoutProps { 
    isOpen: boolean; 
    onClose: () => void; 
}

const Logout: React.FC<LogoutProps> = ({isOpen, onClose}) => {
    const signOut = useSignOut(); 
    const {refresh, push} = useRouter(); 
    const [loading, setLoading] = React.useState(false)

    const handleLogout = () => {
        setLoading(true)
        signOut();
        removeCookie("_auth_state");
        createToast("success", "You have been logged out!"); 
        push("/login")
        refresh()
    }

    return (
        <Confirm
            title={`Log out`}
            description={`You will no longer have access to the admin panel!`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Button
                variant={`destructive`}
                className="w-full my-2"
                onClick={handleLogout}
            >
                Log{loading ? "ging out": "out"}
            </Button>
        </Confirm>
    )
}

export default Logout; 