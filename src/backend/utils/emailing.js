import {Resend} from "resend"; 

import {WelcomeEmail} from "@/components/mail-templates/welcome"; 
import { PasswordReset } from "@/components/mail-templates/password-reset";
import { RegisterUser } from "@/components/mail-templates/register-user";

class Mail {
    constructor(to) {
        this.client = new Resend(process.env.RESEND_API_KEY); 
        this.to = to; 
        this.from = 'Accounts <accounts@blog.sokoetu.com>', 
        this.template  = null; 
        this.subject = null; 
    }

    // welcome
    async welcome(data) {
        let {name, token} = data; 
        this.subject = "Account activation."
        this.template = WelcomeEmail({name, token})
        await this.send(); 
    }

    // reset password 
    async resetPassword(data) {
        let {name, token} = data; 
        this.subject = "Password reset token"; 
        this.template = PasswordReset({name, token}); 
        await this.send(); 
    }

    async registerUser(data) {
        let {name, password, role} = data; 
        this.subject = "Welcome on board!"; 
        this.template = RegisterUser({name, password, role}); 
        await this.send(); 
    }


    // sending 
    async send() {
        try {
            let res = await this.client.emails.send(
                {
                    from: this.from,
                    to: [this.to],
                    subject: this.subject, 
                    react: this.template 
                } 
            ); 
            console.log(res); 
            return true; 
        } catch (err) {
            console.log(err);
            return false; 
        }
    }
}

export default Mail; 