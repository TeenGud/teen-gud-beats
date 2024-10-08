'use client'
import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";


interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const [type, setType] = useState<'login' | 'register'>('login')
    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login')
    }
    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[450px] bg-black p-10">
                {
                    type === 'login' ? <LoginForm onClose={handleClose}/> : <RegisterForm onClose={handleClose}/>
                }
                <hr />
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => signIn('github', {callbackUrl: '/', redirect: true})} type="button" className="gap-2 h-12 p-2 flex-1">
                        <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub"/>
                        GitHub
                    </Button>

                    <Button variant="secondary" onClick={() => signIn('google', {callbackUrl: '/', redirect: true})} type="button" className="gap-2 h-12 p-2 flex-1">
                        <img className="w-6 h-6" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google"/>
                        Google
                    </Button>
                </div>
                <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
                    {type === 'login' ? 'Sign in' : 'Log in'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}